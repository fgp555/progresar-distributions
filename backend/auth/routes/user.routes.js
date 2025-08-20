"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
// import roleController from "../controller/user.role.controller";
const router = (0, express_1.Router)();
const controller = new user_controller_1.UsersController();
const superAdmin = ["superadmin"];
const admin = ["admin", "superadmin"];
const allRoles = ["user", "admin", "superadmin"];
// ✅ Proteger rutas con verifyToken
router.get("/findAll", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.post("/create", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
// allRoles
// router.get("/allRoles", verifyToken, requireRole(allRoles), asyncHandler(roleController.allRoles.bind(roleController)));
// admin
// router.get("/admin", verifyToken, requireRole(admin), asyncHandler(roleController.admin.bind(roleController)));
// superAdmin
// router.get(
//   "/superAdmin",
//   verifyToken,
//   requireRole(superAdmin),
//   asyncHandler(roleController.superAdmin.bind(roleController))
// );
exports.default = router;
//# sourceMappingURL=user.routes.js.map