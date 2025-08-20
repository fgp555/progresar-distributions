"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new user_controller_1.UserController();
const admin = ["admin"];
const allRoles = ["user", "admin"];
router.get("/", (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/:id", (0, auth_middleware_1.requireRole)(allRoles), (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.post("/", (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/:id", (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/:id", (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=user.routes.js.map