import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from "../../utils/ApiError.js"
import {ApiResponse} from '../../utils/ApiResponse.js'
import { connection } from "../../db/index.js";

//post
const createCategory =  asyncHandler(async(req, res)=>{
  const {catid,catname,startdate} =  req.body;

  if([catid,catname,startdate].some(field => !field || field.trim() === "")){
    throw new ApiError(400, "All fields are required");
  }

  const query = "INSERT INTO tbl_admin_p_category (catid, catname, startdate ) VALUES ($1,$2,$3) RETURNING *;"
  
  const values = [catid,catname, startdate] ;

  const  result = await connection.query(query,values)

  const createdCategory = result.rows[0];

  //send response
  return res.status(201).json(
    new ApiResponse(201, createdCategory, "Category created sucessfully")
  );
})

//delete 

const deleteCategory =  asyncHandler(async(req,res)=>{
  const {catid} =  req.params;
  if (!catid) {
    throw new ApiError(400, "Catid ID is required");
  }
  const query = "DELETE FROM tbl_admin_p_category WHERE catid = $1 "
  const values = [catid]
  const result  =  await connection.query(query,values)

  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to delete user");
  }
  
  return res.status(200).json(
    new ApiResponse(200, null,"Category deleted sucessfully")
  )

})

//get 
const getAllCategory =  asyncHandler(async(req,res)=>{
  const query =  "SELECT * FROM tbl_admin_p_category ;"
  const result =  await connection.query(query);
  // if (result.rowCount === 0) {
  //   throw new ApiError(500, "Failed to get category");
  // }
  return res.status(200).json(
    new ApiResponse(200, result.rows, "Category retrieve successfully")
  )
})

//update
const updateCategory =  asyncHandler(async(req,res)=>{
  const {catid} = req.params;
  const {catname} =  req.body;
  const query = "UPDATE tbl_admin_p_category SET catname = $2 WHERE catid = $1;"
  const values = [catid, catname];
  const result =  await connection.query(query,values);
  if (result.rowCount === 0) {
    throw new ApiError(500, "Failed to update category");
  }
  return res.status(200).json(
    new ApiResponse(200, result.rows[0],"category updated sucessfully")
  )
})

export {
   createCategory,
   deleteCategory, 
   getAllCategory,
   updateCategory
   }