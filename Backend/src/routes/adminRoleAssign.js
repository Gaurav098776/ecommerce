import { Router } from "express";
import { allUsersRole, roleAssign, roleAssignDelete, usersRole } from "../controllers/adminRoleAssign/admin.RoleAssign.js";
// import { verifyJWT } from "../middlewares/auth.js";

const router = Router()

// router.use(verifyJWT);

router.route("/assign").post(roleAssign)
router.route("/usersrole/:userid").get(usersRole)
router.route("/usersrole").get(allUsersRole)
router.route("/delete/:role_id/:userid").delete(roleAssignDelete)

export default router;