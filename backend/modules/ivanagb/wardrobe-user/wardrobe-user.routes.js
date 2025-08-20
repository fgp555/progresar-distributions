"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wardrobe_user_controller_1 = require("./wardrobe-user.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new wardrobe_user_controller_1.WardrobeUserController();
router.get("/findAll", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.post("/create", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/update/:id", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", /* verifyToken, */ (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
router.get("/findByUsername/:username", (0, asyncHandler_1.asyncHandler)(controller.findByUsername.bind(controller)));
exports.default = router;
//# sourceMappingURL=wardrobe-user.routes.js.map