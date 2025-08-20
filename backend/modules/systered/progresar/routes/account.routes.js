"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new account_controller_1.AccountController();
const admin = ["admin"];
const allRoles = ["user", "admin"];
router.get("/", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(allRoles), (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.get("/user/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(allRoles), (0, asyncHandler_1.asyncHandler)(controller.findByUserId.bind(controller)));
router.post("/user/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.put("/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
// router.delete("/:id", verifyToken, requireRole(admin), asyncHandler(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=account.routes.js.map