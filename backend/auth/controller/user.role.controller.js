"use strict";
// src/auth/controller/user.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_sql_service_1 = require("../service/user.sql.service");
class UsersController {
    constructor() {
        this.service = new user_sql_service_1.UsersSQLService();
    }
    async findAll(req, res) {
        try {
            const query = {
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                sortDate: req.query.sortDate || "DESC",
                search: req.query.search,
                limit: req.query.limit ? parseInt(req.query.limit) : 10,
                page: req.query.page ? parseInt(req.query.page) : 1,
            };
            const result = await this.service.findAll(query);
            res.status(200).json(result);
        }
        catch (error) {
            console.error("Error in findAll users:", error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to retrieve users",
            });
        }
    }
    async findOne(req, res) {
        try {
            const { id } = req.params;
            const user = await this.service.findOne(id);
            if (!user) {
                return res.status(404).json({
                    error: "User not found",
                    message: `User with id ${id} not found`,
                });
            }
            res.status(200).json(user);
        }
        catch (error) {
            console.error("Error in findOne user:", error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to retrieve user",
            });
        }
    }
    async create(req, res) {
        try {
            const user = await this.service.create(req.body);
            res.status(201).json({
                message: "User created successfully",
                user,
            });
        }
        catch (error) {
            console.error("Error in create user:", error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to create user",
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const user = await this.service.update(id, req.body);
            if (!user) {
                return res.status(404).json({
                    error: "User not found",
                    message: `User with id ${id} not found`,
                });
            }
            res.status(200).json({
                message: "User updated successfully",
                user,
            });
        }
        catch (error) {
            console.error("Error in update user:", error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to update user",
            });
        }
    }
    async remove(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.service.remove(id);
            if (!deleted) {
                return res.status(404).json({
                    error: "User not found",
                    message: `User with id ${id} not found`,
                });
            }
            res.status(200).json({
                message: "User deleted successfully",
            });
        }
        catch (error) {
            console.error("Error in remove user:", error);
            res.status(500).json({
                error: "Internal server error",
                message: "Failed to delete user",
            });
        }
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=user.role.controller.js.map