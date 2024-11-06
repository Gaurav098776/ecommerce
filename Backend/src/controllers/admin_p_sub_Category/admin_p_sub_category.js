import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from "../../utils/ApiError.js"
import {ApiResponse} from '../../utils/ApiResponse.js'
import { connection } from "../../db/index.js";


const create_p_Sub_category =  asyncHandler( async (req, res)=>{
  const {sub_catid, catid,sub_catname,addedon} =  req.body;
  if([sub_catid,catid,sub_catname].some( field => !field || field.trim() === "")){
    throw new ApiError(400, "All fields are required");
  }
  const query =  'INSERT INTO tbl_admin_p_sub_category (sub_catid, catid, sub_catname) VALUES ($1, $2, $3 )'
  const values  = [sub_catid, catid, sub_catname ];
  const result  = await connection.query(query,values);
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to create sub category");
  }
  return res.status(200).json(
    new ApiResponse(201,result.rows[0],"Sub category created sucessfully")
  )

})

const delete_p_Sub_category =  asyncHandler( async (req, res)=>{
  const {sub_catid} =  req.params;
  if(!sub_catid){
    throw new ApiError(400, "All sub_catid are required");
  }
  const query =  'DELETE FROM tbl_admin_p_sub_category WHERE sub_catid = $1;'
  const values  = [sub_catid];
  const result  = await connection.query(query,values);
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to delete sub category");
  }
  return res.status(200).json(
    new ApiResponse(200,result.rows[0],"Sub category deleted sucessfully")
  )

})

const getall_p_Sub_category =  asyncHandler( async (req, res)=>{

  const query =  'SELECT  catid , catname , sub_catid, sub_catname FROM tbl_admin_p_sub_category NATURAL JOIN tbl_admin_p_category'
  const result  = await connection.query(query);
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to retriev sub category");
  }
  return res.status(200).json(
    new ApiResponse(201,result.rows,"Sub category retrieved sucessfully")
  )

})




export {create_p_Sub_category,delete_p_Sub_category,getall_p_Sub_category};