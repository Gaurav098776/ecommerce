import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from "../../utils/ApiError.js"
import {ApiResponse} from '../../utils/ApiResponse.js'
import { connection } from "../../db/index.js";

const createUserProfile =  asyncHandler( async (req, res)=>{
  const {profile_id, user_id, first_name,last_name, email, phone , address,city, } = req.body;
})