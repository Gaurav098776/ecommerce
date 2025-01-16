import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { connection } from "../../db/index.js";

const registerBankDetails = asyncHandler(async (req, res) => {
  const {
    retid,
    accountno,
    bankname,
    branchname,
    ifsc,
    branchcode,
    accountholdername,
  } = req.body;
  console.log("retid", req.body);

  if (
    [
      retid,
      accountno,
      bankname,
      branchname,
      ifsc,
      branchcode,
      accountholdername,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const query =
    "INSERT INTO  tbl_retailer_banking ( retid , accountno, bankname, branchname, ifsc, branchcode, accountholdername) VALUES ($1 , $2 , $3, $4, $5, $6, $7) RETURNING *";
  const values = [
    retid,
    accountno,
    bankname,
    branchname,
    ifsc,
    branchcode,
    accountholdername,
  ];
  const result = await connection.query(query, values);

  if (result.rows.length === 0) {
    throw new ApiError(500, "failed to insert the bank details");
  }

  //send response
  return res
    .status(201)
    .json(
      new ApiResponse(201, result.rows[0], "Bank details created successfully")
    );
});

const getBankDetailsByRetid = asyncHandler(async (req, res) => {
  const { retid } = req.params;

  if (!retid || retid.trim() === "") {
    throw new ApiError(400, "retid is required");
  }

  const query = "SELECT * FROM tbl_retailer_banking WHERE retid = $1";
  const values = [retid];

  const result = await connection.query(query, values);

  if (result.rows.length === 0) {
    throw new ApiError(404, `No bank details found for retid: ${retid}`);
  }

  // Send response
  return res
    .status(200)
    .json(
      new ApiResponse(200, result.rows, "Bank details retrieved successfully")
    );
});

const editBankDetails = asyncHandler(async (req, res) => {
  const { retid, accountno } = req.params;

  // console.log("retid", retid);

  const { bankname, branchname, ifsc, branchcode, accountholdername } =
    req.body;

  if (!retid || retid.trim() === "") {
    throw new ApiError(400, "retid is required");
  }

  if (
    [bankname, branchname, ifsc, branchcode, accountholdername].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required for updating");
  }

  const query = `
    UPDATE tbl_retailer_banking
    SET 
        bankname = $1,
        branchname = $2,
        ifsc = $3,
        branchcode = $4,
        accountholdername = $5
    WHERE retid = $6 AND accountno = $7
    RETURNING *`;
  
  // Correct order: bank details values first, followed by retid and accountno
  const values = [
    bankname,
    branchname,
    ifsc,
    branchcode,
    accountholdername,
    retid,
    accountno
  ];

  const result = await connection.query(query, values);

  if (result.rows.length === 0) {
    throw new ApiError(
      404,
      `Failed to update. No bank details found for retid: ${retid} and accountno: ${accountno}`
    );
  }

  // Send response
  return res
    .status(200)
    .json(
      new ApiResponse(200, result.rows[0], "Bank details updated successfully")
    );
});

export { registerBankDetails, getBankDetailsByRetid, editBankDetails };
