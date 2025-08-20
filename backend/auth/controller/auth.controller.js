"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const error_middleware_1 = require("../../middleware/error.middleware");
const auth_sql_service_1 = require("../service/auth.sql.service");
// const service = new AuthMongoDBService();
const service = new auth_sql_service_1.AuthSQLService();
class AuthController {
    async me(req, res, next) {
        try {
            const { user } = req;
            if (!user || !user.email)
                throw new error_middleware_1.AppError("Unauthorized", 401);
            const dbUser = await service.getUserByEmail(user.email);
            if (!dbUser)
                throw new error_middleware_1.AppError("User not found", 404);
            res.json({
                success: true,
                user: dbUser,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await service.register(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async login(req, res, next) {
        try {
            // console.log("req.body", req.body);
            const result = await service.login(req.body);
            if (!result)
                throw new error_middleware_1.AppError("Invalid credentials", 401);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    decodeToken(req, res, next) {
        try {
            const bodyToken = req.body?.token;
            const authHeader = req.headers.authorization;
            const tokenFromHeader = authHeader?.split(" ")[1];
            const token = bodyToken || tokenFromHeader;
            if (!token)
                throw new error_middleware_1.AppError("Authorization token missing", 401);
            const decoded = service.decodeToken(token);
            if (!decoded)
                throw new error_middleware_1.AppError("Invalid or expired token", 401);
            res.json({ decoded });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const bodyToken = req.body?.refreshToken;
            const authHeader = req.headers.authorization;
            const tokenFromHeader = authHeader?.split(" ")[1];
            const token = bodyToken || tokenFromHeader;
            if (!token)
                throw new error_middleware_1.AppError("Refresh token missing", 401);
            const payload = service.verifyRefreshToken(token);
            if (!payload)
                throw new error_middleware_1.AppError("Invalid or expired refresh token", 401);
            const { email, sub, userId, roles } = payload;
            const newTokens = service.generateTokens({ email, sub, userId, roles });
            res.json(newTokens);
        }
        catch (err) {
            next(err);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const { email, baseURL } = req.body;
            const token = await service.forgotPassword(email, baseURL);
            // Por ahora solo devolvemos el token (en producción deberías enviarlo por correo)
            res.json({ resetToken: token });
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async restorePassword(req, res, next) {
        try {
            const { resetToken, newPassword } = req.body;
            const success = await service.restorePassword(resetToken, newPassword);
            if (!success)
                throw new error_middleware_1.AppError("Failed to reset password", 400);
            res.json({ message: "Password reset successful" });
        }
        catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
        try {
            // No hay lógica en el backend en este caso
            res.status(200).json({ message: "Logged out successfully" });
        }
        catch (err) {
            next(err);
        }
    }
    async checkExistence(req, res, next) {
        try {
            const { email, username } = req.query;
            const result = await service.checkExistence({
                email: email?.toString(),
                username: username?.toString(),
            });
            res.json({ exists: result });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map