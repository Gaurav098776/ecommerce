import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { connection } from "../../db/index.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";


const addProduct = asyncHandler(async (req,res) => {
  console.log(req.body);
  const {pid,sub_catid,retid,productname,price,qty,company} = req.body;

  const existedProduct = await connection.query(
    "SELECT * FROM tbl_retailer_products WHERE pid = $1",
    [pid]
  );
  
  if (existedProduct.rows.length > 0) {
    throw new ApiError(409, "Product with this id is already exists");
  }

  const productLocalpath = req.files?.productphoto[0]?.path;

  if (!productLocalpath) {
    throw new ApiError(400, "product photo file is required")
}

const product = await uploadOnCloudinary(productLocalpath)

  const query = 'INSERT INTO tbl_retailer_products ( pid,sub_catid,retid,productname,price,qty,company,productphoto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'

  const values =  [pid,sub_catid,retid,productname,price,qty,company,product.url]

  const result = await connection.query(query, values);

  if (result.rows.length === 0) {
    throw new ApiError(500, "Product failed");
  }
  return res
  .status(201)
  .json(new ApiResponse(201, "Product add successfully"));
})


// get product 

const getProductById = asyncHandler(async (req, res) => {
  const { retid } = req.params;

  // Query the database for the product with the given ID
  const query = "SELECT * FROM tbl_retailer_products JOIN tbl_admin_p_sub_category USING (sub_catid) WHERE retid = $1";
  const values = [retid];

  const result = await connection.query(query, values);

  // Check if a product with the given ID exists
  if (result.rows.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  // Return the product details
  return res
    .status(200)
    .json(new ApiResponse(200, result.rows, "Product retrieved successfully" ));
});


// 
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  // Check if the product exists in the database
  const checkQuery = "SELECT * FROM tbl_retailer_products WHERE pid = $1";
  const checkResult = await connection.query(checkQuery, [pid]);

  if (checkResult.rows.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  // Delete the product from the database
  const deleteQuery = "DELETE FROM tbl_retailer_products WHERE pid = $1";
  const deleteResult = await connection.query(deleteQuery, [pid]);

  if (deleteResult.rowCount === 0) {
    throw new ApiError(500, "Failed to delete the product");
  }

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted successfully"));
});


 const updateProduct = asyncHandler(async (req, res) => {
  const { sub_catid,  productname, price, qty, company } = req.body;
  const { pid } = req.params;
  
  // Check if the product exists
  const checkQuery = "SELECT * FROM tbl_retailer_products WHERE pid = $1";
  const checkResult = await connection.query(checkQuery, [pid]);

  if (checkResult.rows.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  // If a new product photo is uploaded, handle the photo update
  let productPhotoUrl = checkResult.rows[0].productphoto; // Keep the existing photo URL
  if (req.files?.productphoto?.length > 0) {
    const productLocalPath = req.files.productphoto[0].path;

    if (!productLocalPath) {
      throw new ApiError(400, "Product photo file is required");
    }

    const uploadedPhoto = await uploadOnCloudinary(productLocalPath);
    productPhotoUrl = uploadedPhoto.url; // Update with the new photo URL
  
  }
   
  // Update the product in the database
  const updateQuery = `
    UPDATE tbl_retailer_products 
    SET sub_catid = $1,  productname = $2, price = $3, qty = $4, company = $5, productphoto = $6 
    WHERE pid = $7
    RETURNING *`;
  const updateValues = [
    sub_catid,
    productname,
    price,
    qty,
    company,
    productPhotoUrl,
    pid
  ];

  const updateResult = await connection.query(updateQuery, updateValues);

  if (updateResult.rows.length === 0) {
    throw new ApiError(500, "Failed to update the product");
  }

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated successfully", updateResult.rows[0]));
});


const viewSubCategory = asyncHandler(async(req,res)=>{
     // Query the database for the product with the given ID
  const query = "SELECT sub_catid,sub_catname FROM tbl_admin_p_sub_category";
  

  const result = await connection.query(query);

  // Check if a product with the given ID exists
  if (result.rows.length === 0) {
    throw new ApiError(404, "SubCatgeory is not found");
  }

  // Return the product details
  return res
    .status(200)
    .json(new ApiResponse(200, result.rows, "SubCategory is retrieved successfully" ));
})





export {addProduct,getProductById,deleteProduct,updateProduct,viewSubCategory}