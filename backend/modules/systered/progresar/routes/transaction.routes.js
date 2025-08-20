"use strict";
// src\modules\systered\progresar\routes\transaction.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new transaction_controller_1.TransactionController();
const admin = ["admin"];
const allRoles = ["user", "admin"];
router.get("/findAll", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(allRoles), (req, res, next) => controller.findAll(req, res, next));
router.get("/account/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(allRoles), (0, asyncHandler_1.asyncHandler)(controller.findByAccountId.bind(controller)));
router.post("/deposit/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.deposit.bind(controller)));
router.post("/withdraw/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.withdraw.bind(controller)));
router.post("/transfer", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.transfer.bind(controller)));
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map