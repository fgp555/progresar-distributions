"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new user_controller_1.UserController();
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.post("/", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/:id", (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=user.routes.js.map