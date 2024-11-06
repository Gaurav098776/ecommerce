import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/admin_p_category/p_category.Controller.js';
import { validateSchema } from '../controllers/admin_p_categoryValidation/p_category.Validation.js';
// import { verifyJWT } from '../middlewares/auth.js';


const router =  Router();

// router.use(verifyJWT)

router.route("/createCategory").post(validateSchema,createCategory);
router.route("/deleteCategory/:catid").delete(deleteCategory);
router.route("/getall").get(getAllCategory);
router.route("/update/:catid").patch(validateSchema,updateCategory);

export default router;