"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/common/auth/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post("/register", (0, asyncHandler_1.asyncHandler)(authController.register.bind(authController)));
router.post("/login", (0, asyncHandler_1.asyncHandler)(authController.login.bind(authController)));
router.post("/loginNoCaptcha", (0, asyncHandler_1.asyncHandler)(authController.login.bind(authController)));
router.post("/forgot-password", (0, asyncHandler_1.asyncHandler)(authController.forgotPassword.bind(authController)));
router.post("/restore-password", (0, asyncHandler_1.asyncHandler)(authController.restorePassword.bind(authController)));
router.get("/check-existence", (0, asyncHandler_1.asyncHandler)(authController.checkExistence.bind(authController)));
router.get("/me", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(authController.me.bind(authController)));
router.post("/decode-token", (0, asyncHandler_1.asyncHandler)(authController.decodeToken.bind(authController)));
router.post("/refresh-token", (0, asyncHandler_1.asyncHandler)(authController.refreshToken.bind(authController)));
router.post("/logout", (0, asyncHandler_1.asyncHandler)(authController.logout.bind(authController)));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map