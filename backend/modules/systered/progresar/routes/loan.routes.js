"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loan_controller_1 = require("../controllers/loan.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new loan_controller_1.LoanController();
const admin = ["admin"];
const allRoles = ["user", "admin"];
router.get("/", (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/account/:id", (0, auth_middleware_1.requireRole)(allRoles), (0, asyncHandler_1.asyncHandler)(controller.findByAccountId.bind(controller)));
router.post("/calculate", (0, auth_middleware_1.requireRole)(allRoles), (0, asyncHandler_1.asyncHandler)(controller.calculateLoan.bind(controller)));
router.post("/account/:id", (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.post("/pay/:id", (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.payInstallment.bind(controller)));
router.get("/totales/activos", (0, auth_middleware_1.requireRole)(["admin"]), (0, asyncHandler_1.asyncHandler)(controller.getTotalesPrestamosActivos.bind(controller)));
exports.default = router;
//# sourceMappingURL=loan.routes.js.map