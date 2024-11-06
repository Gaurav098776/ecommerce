import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from "../../utils/ApiError.js"
import {ApiResponse} from '../../utils/ApiResponse.js'
import { connection } from "../../db/index.js";

const roleAssign =  asyncHandler(async (req, res) =>{
  const {role_id, userid} =  req.body;
  const query = 'INSERT INTO tbl_admin_user_role_assign (role_id, userid) VALUES ($1, $2);'
  const values =  [role_id, userid];
  const result =  await connection.query(query, values)
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to asign role to user");
  }
  return res.status(200).json(
    new ApiResponse(201, result.rows[0],"Role assign sucessfully")
    )

})

// get specific user and role

const usersRole =  asyncHandler(async (req, res) =>{
  const { userid} =  req.params;
  
  const query = 'SELECT userid , username , role_id, role_name  FROM tbl_admin_users_registration NATURAL JOIN tbl_admin_roles NATURAL JOIN tbl_admin_user_role_assign WHERE userid = $1 ;'
 const values = [userid]
  const result =  await connection.query(query,values)
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to retrieve role to user");
  }
  return res.status(200).json(
    new ApiResponse(200, result.rows,"Retrieve sucessfully")
    )

})

// get all user and role 

const allUsersRole =  asyncHandler(async (req, res) =>{
  
  
  const query = 'SELECT userid , username , role_id, role_name  FROM tbl_admin_users_registration NATURAL JOIN tbl_admin_roles NATURAL JOIN tbl_admin_user_role_assign;'
 
  const result =  await connection.query(query)
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to retrieve role to user");
  }
  return res.status(200).json(
    new ApiResponse(200, result.rows,"Retrieve sucessfully")
    )

})

const roleAssignDelete = asyncHandler(async (req, res) => {
 const {role_id, userid} =  req.params;
 const query = 'DELETE FROM tbl_admin_user_role_assign WHERE role_id = $1  AND userid = $2;'
 const values =  [role_id, userid];
 const result =  await connection.query(query, values);
 if (result.rowCount === 0) {
  throw new ApiError(500, "Failed to delete asign role to user");
}
 return res.status(200).json(
  new ApiResponse(200, result.rows[0],'Successfull deleted  role assign to user ')
 )
})

export {roleAssign,roleAssignDelete,usersRole,allUsersRole}