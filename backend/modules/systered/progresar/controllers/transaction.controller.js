"use strict";
// src\modules\systered\progresar\controllers\transaction.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = require("../services/transaction.service");
class TransactionController {
    constructor() {
        this.service = new transaction_service_1.TransactionService();
    }
    async findAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const transactions = await this.service.findAll(page, limit);
            res.json({
                success: true,
                data: transactions.results,
                pagination: {
                    current: transactions.page,
                    total: transactions.totalPages,
                    count: transactions.results.length,
                    totalRecords: transactions.totalItems,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findByAccountId(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const transactions = await this.service.findByAccountId(req.params.id, page, limit);
            res.json({
                success: true,
                data: transactions.results,
                user: transactions.user,
                pagination: {
                    current: transactions.page,
                    total: transactions.totalPages,
                    count: transactions.results.length,
                    totalRecords: transactions.totalItems,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }
    async deposit(req, res, next) {
        try {
            const result = await this.service.deposit(req.params.id, req.body);
            res.json({
                success: true,
                message: "Depósito realizado exitosamente",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async withdraw(req, res, next) {
        try {
            const result = await this.service.withdraw(req.params.id, req.body);
            res.json({
                success: true,
                message: "Retiro realizado exitosamente",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async transfer(req, res, next) {
        try {
            const result = await this.service.transfer(req.body);
            res.json({
                success: true,
                message: "Transferencia realizada exitosamente",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map