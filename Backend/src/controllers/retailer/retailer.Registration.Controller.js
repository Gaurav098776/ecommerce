import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { connection } from "../../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerRetailer = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    retid,
    retregno,
    retname,
    contactno,
    alternatecontact,
    address,
    state,
    city,
    pincode,
    email,
    url,
    pan,
    password,
    status,
    registeron,
  } = req.body;

  // Hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the user already exists
  const existedUser = await connection.query(
    "SELECT * FROM tbl_retailer_reg WHERE email = $1",
    [email]
  );

  if (existedUser.rows.length > 0) {
    throw new ApiError(409, "Retailer with this email already exists");
  }

  const query =
    "INSERT INTO tbl_retailer_reg (retid, retregno, retname, contactno, alternatecontact, address, state, city, pincode, email, url, pan, password, status, registeron) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *"; // Add RETURNING * to get the inserted row

  const values = [
    retid,
    retregno,
    retname,
    contactno,
    alternatecontact,
    address,
    state,
    city,
    pincode,
    email,
    url,
    pan,
    hashedPassword,
    status,
    registeron,
  ];

  const result = await connection.query(query, values);

  if (result.rows.length === 0) {
    throw new ApiError(500, "Retailer registration failed");
  }

  // const createdRetailer = result.rows[0];

  // Send the response
  return res
    .status(201)
    .json(new ApiResponse(201, "Retailer registered successfully"));
});

//Login

const login = asyncHandler(async (req, res) => {
  // req.body -->data
  //username or email
  // find the user
  // password check
  // access and refresh token
  // send cookie
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const query =
    "SELECT retid, retregno, retname, password, email, status from tbl_retailer_reg  WHERE email = $1  ";

  const values = [email];

  const result = await connection.query(query, values);

  if (result.rowCount === 0) {
    throw new ApiError(404, "User is not found");
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  //token
  const payload = {
    name: user.retname,
    id: user.retid,
    email: user.email,
    status: user.status,
  };

  //generate a JWT accessToken
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  // res.json({ token });  note:  --> client side se jo request  aa rhi hai server use ek hi response krega
  user.token = accessToken;
  user.password = undefined;

  // refresh token
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  // Store the refresh token in your database for the user
  const refreshTokenStore = await connection.query(
    "UPDATE tbl_retailer_reg SET refreshtoken = $1 WHERE email = $2",
    [refreshToken, user.email]
  );

  if (refreshTokenStore.rowCount === 0) {
    throw new ApiError(404, "Refresh token is not stored");
  }

  // Set cookies for both tokens
  res.cookie("accessToken", accessToken, {
    httpOnly: true, //server se modify kr skte hai
    secure: true,
    sameSite: "Lax",
    expires: new Date(Date.now() + 2 * 60 * 1000), // 1 hour
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
  });
  //send response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken, user },
        "User logged in successfully"
      )
    );
});

// logout retailer

const logoutRetailer = asyncHandler(async (req, res) => {
  const retid = req.user.id;
  console.log(req.user.id);
  

  const user = await connection.query(
    "UPDATE tbl_retailer_reg SET refreshtoken = NULL WHERE retid = $1",
    [retid]
  );

  if (user.rowCount === 0) {
    throw new ApiError(404, "User not found or already logged out");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

//  refresh controller

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;  // jo refresh token client side se aa rha hai

  if (!refreshToken){
    throw new ApiError(401,"unauthorized request")
  }
  // Verify refresh token
  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(decodedToken);
    

    // Query to find user by refresh token in the database
    const query =
      "SELECT retid, retname, email, status FROM tbl_retailer_reg WHERE refreshtoken = $1";
    const values = [refreshToken];
    const result = await connection.query(query, values);

    if (result.rowCount === 0) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Invalid refresh token"));
    }

    const user = result.rows[0];

    // Create a new access token (valid for 1 hour)
    const newAccessToken = jwt.sign(
      {
        name: user.retname,
        id: user.retid,
        email: user.email,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Optional: Create a new refresh token and update it in the database
    const newRefreshToken = jwt.sign(
      {
        name: user.retname,
        id: user.retid,
        email: user.email,
        status: user.status,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    

    // Set cookies for the new tokens
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Return the new tokens in response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          "Token refreshed successfully"
        )
      );
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, "Refresh token expired, please log in again");
    }
    throw new ApiError(401, err.message || "Invalid refresh token");
  }
});


//Get Specific retailer details

const getReatilerDetails =  asyncHandler( async(req,res) => {
  console.log("req.user",req.user);
  
   const {email} = req.user;
   const query =  'SELECT retid, retregno, retname, contactno, alternatecontact, address, state, city, pincode, email, pan, status FROM tbl_retailer_reg  WHERE email = $1'
   const value = [email]
   const result =  await connection.query(query,value)

   if(result.rowCount === 0) {
    throw new ApiError(404,'Not Found')
   }

   const user = result.rows[0];

   return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "Retreive retailer data successfully"
      )
    );

} )


export { registerRetailer, login, logoutRetailer,refreshAccessToken, getReatilerDetails };
