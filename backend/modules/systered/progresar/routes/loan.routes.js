"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loan_controller_1 = require("../controllers/loan.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new loan_controller_1.LoanController();
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/account/:id", (0, asyncHandler_1.asyncHandler)(controller.findByAccountId.bind(controller)));
router.post("/calculate", (0, asyncHandler_1.asyncHandler)(controller.calculateLoan.bind(controller)));
router.post("/account/:id", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.post("/pay/:id", (0, asyncHandler_1.asyncHandler)(controller.payInstallment.bind(controller)));
exports.default = router;
//# sourceMappingURL=loan.routes.js.map