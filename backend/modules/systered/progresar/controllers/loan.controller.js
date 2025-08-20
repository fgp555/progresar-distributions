"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanController = void 0;
const loan_service_1 = require("../services/loan.service");
class LoanController {
    constructor() {
        this.service = new loan_service_1.LoanService();
    }
    async calculateLoan(req, res, next) {
        try {
            const calculation = await this.service.calculateLoan(req.body);
            res.json({
                success: true,
                data: calculation,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const result = await this.service.create(req.params.id, req.body);
            res.status(201).json({
                success: true,
                message: "Préstamo aprobado y desembolsado exitosamente",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async payInstallment(req, res, next) {
        try {
            const result = await this.service.payInstallment(req.params.id, req.body);
            res.json({
                success: true,
                message: `${req.body.numeroCuotas || 1} cuota(s) pagada(s) exitosamente`,
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findByAccountId(req, res, next) {
        try {
            const loans = await this.service.findByAccountId(req.params.id);
            res.json({
                success: true,
                data: loans.results,
                total: loans.totalItems,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findAll(req, res, next) {
        try {
            const loans = await this.service.findAll();
            res.json({
                success: true,
                data: loans.results,
                total: loans.totalItems,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async getTotalesPrestamosActivos(req, res, next) {
        try {
            const data = await this.service.getTotalesPrestamosActivos();
            res.json({
                success: true,
                ...data,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.LoanController = LoanController;
//# sourceMappingURL=loan.controller.js.map