import { Router } from 'express';
import {  verifyJWT } from '../middlewares/auth.middleware.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const router = Router();

router.route('/check-auth').get(verifyJWT,(req, res) => {
  const user =  req.user;
  console.log(user);
  
  res.status(200).json(new ApiResponse(200, user,"Authenticated user!"));
});


// router.route('/retailer').get(verifyToken,authorizeRoles('retailer'), (req, res) => {
//   res.status(200).json(new ApiResponse(200, { message: 'Welcome Retailer!' }));
// });


// router.route('/retailer').get(verifyToken,authorizeRoles('retailer'), (req, res) => {
//   res.status(200).json(new ApiResponse(200, { message: 'Welcome Retailer!' }));
// });

export default router;
