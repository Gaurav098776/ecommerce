import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from "../../utils/ApiError.js"
import {ApiResponse} from '../../utils/ApiResponse.js'
import { connection } from "../../db/index.js";
;


//create
const createRole =  asyncHandler(async(req, res)=>{
  const {role_id,role_name} = req.body;
  if([role_id,role_name].some(field => !field || field.trim() === "")){
    new ApiError(400, "All fields are required")
  }
  const query = "INSERT INTO tbl_admin_roles (role_id,role_name) VALUES ($1, $2) RETURNING *;"
  const values = [role_id,role_name];
  const result =  await connection.query(query,values)
  
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to create roles");
  }
  
  return res.status(200).json(
    new ApiResponse(201, result.rows[0],"Roles is created")
  )

})

//get
const get_roles =  asyncHandler( async (req, res)=>{

  const query =  'SELECT  * From tbl_admin_roles'
  const result  = await connection.query(query);
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to retriev sub category");
  }
  return res.status(200).json(
    new ApiResponse(201,result.rows,"Sub category retrieved sucessfully")
  )

})

// delete

const deleteRole =  asyncHandler(async (req,res)=>{
  const {role_id} = req.params;
  const query = 'DELETE FROM tbl_admin_roles WHERE role_id = $1;'
  const values =  [role_id];
  const result =  await connection.query(query,values)
  console.log(result);
  
  return  res.status(200).json(
    new ApiResponse(200, null , "Role deleted successfully")
  )

})


export {createRole,
  deleteRole,
  get_roles
}