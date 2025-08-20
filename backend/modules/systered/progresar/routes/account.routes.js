"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new account_controller_1.AccountController();
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.get("/user/:id", (0, asyncHandler_1.asyncHandler)(controller.findByUserId.bind(controller)));
router.post("/user/:id", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.put("/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
// router.delete("/:id", asyncHandler(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=account.routes.js.map