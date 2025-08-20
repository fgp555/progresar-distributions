"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.requireRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const envs_1 = require("../config/envs");
const requireRole = (roles) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new error_middleware_1.AppError("Missing token", 401);
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, envs_1.ENV_JWT.ACCESS_TOKEN_SECRET);
            if (!decoded.roles || !decoded.roles.some((r) => allowedRoles.includes(r))) {
                throw new error_middleware_1.AppError("Insufficient permissions", 403);
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            next(new error_middleware_1.AppError("Invalid or expired token", 401));
        }
    };
};
exports.requireRole = requireRole;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader /* || !authHeader.startsWith("Bearer ") */) {
        return next(new error_middleware_1.AppError("Token no proporcionado", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, envs_1.ENV_JWT.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new error_middleware_1.AppError("Token inválido o expirado", 401));
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.middleware.js.map