"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const account_service_1 = require("../services/account.service");
class AccountController {
    constructor() {
        this.service = new account_service_1.AccountService();
    }
    async findAll(req, res, next) {
        try {
            const accounts = await this.service.findAll();
            res.json({
                success: true,
                data: accounts.results,
                total: accounts.totalItems,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const account = await this.service.findOne(req.params.id);
            res.json({
                success: true,
                data: account,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findByUserId(req, res, next) {
        try {
            const accounts = await this.service.findByUserId(req.params.id);
            res.json({
                success: true,
                data: accounts.results,
                total: accounts.totalItems,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const account = await this.service.create(req.params.id, req.body);
            res.status(201).json({
                success: true,
                message: "Cuenta creada exitosamente",
                data: account,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const account = await this.service.update(req.params.id, req.body);
            res.json({
                success: true,
                message: "Cuenta actualizada exitosamente",
                data: account,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map