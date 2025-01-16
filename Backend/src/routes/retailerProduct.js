import { Router } from 'express';
import { validateSchema } from '../controllers/retailerProductValidation/retailerProductValidation.js';
import { addProduct, deleteProduct, getProductById, updateProduct, viewSubCategory } from '../controllers/retailerProduct/retailerProduct.js';
import { upload } from '../middlewares/multer.middleware.js';


const router =  Router();

router.route('/product').post(upload.fields([{
  name: "productphoto",
  maxCount: 1
},]),validateSchema, addProduct)

router.route('/getproduct/:retid').get(getProductById)
router.route('/subcategory').get(viewSubCategory)
router.route('/deleteproduct/:pid').delete(deleteProduct)
router.route('/updateproduct/:pid').put(upload.fields([{
  name: "productphoto",
  maxCount: 1
},]), updateProduct)

export default router;
