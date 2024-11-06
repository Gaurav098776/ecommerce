import { Router } from 'express';
import { getReatilerDetails, login, logoutRetailer, refreshAccessToken, registerRetailer } from '../controllers/retailer/retailer.Registration.Controller.js';

import { validateSchema } from '../controllers/retailervalidation/retailerRegistrationValidation.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router =  Router();

router.route("/register").post(validateSchema,registerRetailer)
router.route("/login").post(login)

//secured route
router.route("/logout").post(verifyJWT,logoutRetailer)
router.route("/details").get(verifyJWT,getReatilerDetails)
router.route("/refresh-token").post(refreshAccessToken)

export default router;