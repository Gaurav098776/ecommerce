import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { connection } from "../../db/index.js";

import bcrypt from "bcrypt";

// admin usern registeration (user signup)
const admin_userRegistration = asyncHandler(async (req, res) => {
  const { userid, username, email, password } = req.body;

  // Validation: Check if fields are empty
  if (
    [userid, username, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user already exists
  const existedUser = await connection.query(
    "SELECT * FROM tbl_admin_users_registration WHERE email = $1",
    [email]
  );

  if (existedUser.rows.length > 0) {
    throw new ApiError(409, "User with this userid already exists");
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into the database
  const query = `
    INSERT INTO tbl_admin_users_registration (userid, username, email, password)
    VALUES ($1, $2, $3, $4) 
    RETURNING *;
  `;
  const values = [userid, username, email, hashedPassword];

  const result = await connection.query(query, values);
  const createdUser = result.rows[0];

  // Send the response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

//delete

const admin_userDelete = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  if (!userid) {
    throw new ApiError(400, "User ID is required");
  }
  const query =
    "DELETE FROM tbl_admin_users_registration WHERE userid = $1 RETURNING *";
  const values = [userid];
  const result = await connection.query(query, values);

  // If the delete operation failed for some reason
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to delete user");
  }

  // Get the deleted user's data
  const deletedUser = result.rows[0];

  // Send the response
  return res
    .status(200)
    .json(new ApiResponse(200, deletedUser, "User deleted successfully"));
});

//update toggle 

const admin_userUpdate = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  const { status } = req.params;
  const query =
    "UPDATE tbl_admin_users_registration SET status = $2 WHERE userid = $1";
  const values = [userid, status];
  const result = await connection.query(query, values);
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to update the userStatus");
  }
  const updatedUserStatus = result.rows[0];
  // Send the response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedUserStatus,
        "User status updated successfully"
      )
    );
});

// get all user

const admin_userGet = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM tbl_admin_users_registration";
  const result = await connection.query(query);

  if (result.rowCount === 0) {
    throw new ApiError(404, "Failed to update the userStatus");
  }

  // const getAllUser =  result.rows;

  // Send the response
  return res
    .status(200)
    .json(new ApiResponse(200, result.rows, "User retrieved successfully"));
});

//update
const updateUser = asyncHandler(async (req, res) => {
  const { userid } = req.params; // Extract user ID from URL parameters
  const { username, password, email } = req.body; // Extract data from request body

  // Update query
  const query =
    "UPDATE tbl_admin_users_registration SET username = $2, password = $3, email = $4 WHERE userid = $1 RETURNING *;"; // Fixed spelling mistake in 'password' and added RETURNING to fetch updated record
  const values = [userid, username, password, email];

  // Execute query
  const result = await connection.query(query, values);

  // Check if the user was updated
  if (result.rowCount === 0) {
    throw new ApiError(404, "User not found"); // Change to 404 if user is not found
  }

  // Respond with updated user details
  return res.status(200).json(
    new ApiResponse(200, result.rows[0], "User details updated successfully") // Fixed spelling in response message
  );
});

export {
  admin_userRegistration,
  admin_userDelete,
  admin_userUpdate,
  updateUser,
  admin_userGet,
};
