import { Router } from "express";
import { create_p_Sub_category, delete_p_Sub_category, getall_p_Sub_category } from "../controllers/admin_p_sub_Category/admin_p_sub_category.js";
import { validateSchema } from "../controllers/subCategoryValidation/admin_p_sub_Category.js";
// import { verifyJWT } from "../middlewares/auth.js";


const router =  Router();

// router.use(verifyJWT);

router.route('/create').post(validateSchema,create_p_Sub_category)
router.route('/delete/:sub_catid').delete(delete_p_Sub_category)
router.route('/getall').get(getall_p_Sub_category)

export default router;