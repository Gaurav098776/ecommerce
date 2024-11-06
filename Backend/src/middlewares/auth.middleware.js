import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

// Middleware to verify token
const verifyJWT = (req, res, next) => {
  try {
    console.log(req.cookies);
    
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", ""); // Get token from cookies
      console.log("accessToken",accessToken);
      
    if (!accessToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    
    req.user = decoded; // Attach the user to the request object
    next(); // Proceed to the next middleware
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid access token")
  }
};

export { verifyJWT };
