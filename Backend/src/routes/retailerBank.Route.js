import { Router } from 'express';
import { validateSchema } from '../controllers/retailerBankValidation/retailerBankValidation.js';
import { editBankDetails, getBankDetailsByRetid, registerBankDetails } from '../controllers/retailerBank/bank.js';

const router = Router()

router.route('/addbankdetails').post(validateSchema,registerBankDetails)
router.route('/details/:retid').get(getBankDetailsByRetid)
router.route('/editdetails/:retid/:accountno').put(editBankDetails)

export default router;