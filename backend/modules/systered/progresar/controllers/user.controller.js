"use strict";
// src/modules/systered/progresar/controllers/user.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.service = new user_service_1.UserService();
    }
    async findAll(req, res, next) {
        try {
            const query = {
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                sortDate: req.query.sortDate || "DESC",
                search: req.query.search,
                limit: req.query.limit ? parseInt(req.query.limit) : 50,
                page: req.query.page ? parseInt(req.query.page) : 1,
            };
            const result = await this.service.findAll(query);
            res.json({
                success: true,
                pagination: {
                    page: result.page,
                    totalPages: result.totalPages,
                    totalItems: result.totalItems,
                    hasMore: result.hasMore,
                    limit: query.limit,
                },
                // Mantener compatibilidad con respuesta anterior
                total: result.totalItems,
                data: result.results,
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
            const deleted = await this.service.remove(req.params.id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado",
                });
            }
            res.json({
                success: true,
                message: "Usuario eliminado exitosamente",
            });
        }
        catch (err) {
            next(err);
        }
    }
    // Métodos adicionales
    async findByEmail(req, res, next) {
        try {
            const { email } = req.params;
            const user = await this.service.findByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado con ese email",
                });
            }
            res.json({
                success: true,
                data: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findByDocument(req, res, next) {
        try {
            const { documentNumber } = req.params;
            const user = await this.service.findByDocumentNumber(documentNumber);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado con ese número de documento",
                });
            }
            res.json({
                success: true,
                data: user,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async getStatistics(req, res, next) {
        try {
            const stats = await this.service.getStatistics();
            res.json({
                success: true,
                data: stats,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map