"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.service = new user_service_1.UserService();
    }
    async findAll(req, res, next) {
        try {
            const users = await this.service.findAll();
            res.json({
                success: true,
                data: users.results,
                total: users.totalItems,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const user = await this.service.findOne(req.params.id);
            res.json({
                success: true,
                data: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const user = await this.service.create(req.body);
            res.status(201).json({
                success: true,
                message: "Usuario creado exitosamente",
                data: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const user = await this.service.update(req.params.id, req.body);
            res.json({
                success: true,
                message: "Usuario actualizado exitosamente",
                data: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            await this.service.remove(req.params.id);
            res.json({
                success: true,
                message: "Usuario eliminado exitosamente",
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map