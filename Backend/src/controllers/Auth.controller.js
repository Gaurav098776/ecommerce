import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from '../utils/ApiResponse.js'
import { connection } from "../db/index.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

//login

const login =  asyncHandler(async (req,res)=>{
  const {email, password} =  req.body;

  if ([email, password].some(field => !field || field.trim() === "")) {
   throw new ApiError(400, "All fields are required");
 }

 const query = 'SELECT userid, username, password, role_id, role_name, status from tbl_admin_users_registration  NATURAL JOIN tbl_admin_user_role_assign NATURAL JOIN tbl_admin_roles WHERE email = $1  '

 const values = [email];

 const result =  await connection.query(query,values)

 if (result.rowCount === 0) {
  throw new ApiError(404, "User not found");
}

const user = result.rows[0]
const isPasswordValid = await bcrypt.compare(password, user.password);

if (!isPasswordValid) {
  throw new ApiError(401, 'Invalid email or password');
}

  //token
  const payload = {
    name: user.username,
    id: user.userid,
    role: user.role_name,
    status : user.status
    
  };

   //generate a JWT token
   const accessToken = jwt.sign( payload ,process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
   // res.json({ token });  note:  --> client side se jo request aa rhi hai server use ek hi response krega 

        user.accessToken =  accessToken;   //: This line adds the generated JWT token to the user object.
        user.password =  undefined;
     //  cookies --> cookie name, data, 
     const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Prevent access via JavaScript
      sameSite: 'Lax',
      secure: false
    }

  // Return response
  return res.cookie('accessToken', accessToken, options).status(200).json(
    new ApiResponse(200, { accessToken, user }, 'User logged in successfully')
  );
}) 


export {login}