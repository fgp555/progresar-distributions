"use strict";
// src\modules\systered\progresar\routes\transaction.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new transaction_controller_1.TransactionController();
router.get("/findAll", (req, res, next) => controller.findAll(req, res, next));
router.get("/account/:id", (0, asyncHandler_1.asyncHandler)(controller.findByAccountId.bind(controller)));
router.post("/deposit/:id", (0, asyncHandler_1.asyncHandler)(controller.deposit.bind(controller)));
router.post("/withdraw/:id", (0, asyncHandler_1.asyncHandler)(controller.withdraw.bind(controller)));
router.post("/transfer", (0, asyncHandler_1.asyncHandler)(controller.transfer.bind(controller)));
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map