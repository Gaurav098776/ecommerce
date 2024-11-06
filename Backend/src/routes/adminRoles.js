import { Router } from "express";
import { createRole, deleteRole, get_roles } from "../controllers/adminRolesController/roles.Controller.js";
import { validateSchema } from "../controllers/roleValidation/role.Validation.js";
// import { verifyJWT } from "../middlewares/auth.js";

const router =  Router()

// router.use(verifyJWT)

router.route("/create").post(validateSchema,createRole,);
router.route("/get").get(get_roles);
router.route("/delete/:role_id").delete(deleteRole);

export default router;