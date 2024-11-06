import { Router } from 'express';
import  {admin_userDelete, admin_userGet, admin_userRegistration, admin_userUpdate, updateUser} from '../controllers/adminUserController/admin.User.Controller.js';
import { login } from '../controllers/Auth.controller.js';
import { validateSchema } from '../controllers/userValidation/user.Validation.js';
// import { verifyJWT } from '../middlewares/auth.middleware.js';


const router =  Router()

router.route("/register").post(validateSchema,admin_userRegistration)
router.route("/delete/:userid").delete(admin_userDelete)
router.route("/getalluser").get(admin_userGet)
router.route("/update/:status/:userid").patch(validateSchema,admin_userUpdate)
router.route("/updateuser/:userid").patch(validateSchema,updateUser)
router.route("/login").post(login)


export default router;