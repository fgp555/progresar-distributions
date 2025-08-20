"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSQLService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const envs_1 = require("../../config/envs");
const roles_enum_1 = require("../enum/roles.enum");
const switchModule_1 = require("../../config/switchModule");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_service_1 = require("../../common/mail/email.service");
class AuthSQLService {
    constructor() {
        this.emailService = new email_service_1.EmailService();
        this.repo = typeOrmConfig_1.AppDataSource.getRepository((0, switchModule_1.selectUserEntity)());
    }
    async getUserByEmail(email) {
        const user = await this.repo.findOne({
            where: { email },
            relations: [], // agrega relaciones si necesitas
        });
        if (!user)
            return null;
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async register(body) {
        const existing = await this.repo.findOneBy({ email: body.email });
        if (existing)
            throw new Error("Email already registered");
        const hashed = await bcryptjs_1.default.hash(body.password, 10);
        const user = this.repo.create({ ...body, password: hashed });
        return await this.repo.save(user);
    }
    async login(body) {
        const { email, password } = body;
        const findEmail = await this.repo.findOneBy({ email });
        if (!findEmail)
            return null;
        const isPasswordValid = await bcryptjs_1.default.compare(password, findEmail.password);
        if (!isPasswordValid)
            return null;
        const { password: _, ...user } = findEmail;
        const userRoles = findEmail.role === "superadmin"
            ? [roles_enum_1.RolesEnum.SuperAdmin]
            : findEmail.role === "admin"
                ? [roles_enum_1.RolesEnum.Admin]
                : findEmail.role === "collaborator"
                    ? [roles_enum_1.RolesEnum.Collaborator]
                    : [roles_enum_1.RolesEnum.User];
        const userPayload = {
            sub: findEmail._id,
            userId: findEmail._id,
            email: findEmail.email,
            roles: userRoles,
            // photo: findEmail.photo,
        };
        const tokens = this.generateTokens(userPayload);
        const decodedAccess = jsonwebtoken_1.default.decode(tokens.accessToken);
        const loginDate = new Date().toLocaleString();
        const expirationDate = decodedAccess?.exp ? new Date(decodedAccess.exp * 1000).toLocaleString() : null;
        return {
            login: true,
            user: {
                ...user,
            },
            loginDate,
            expirationDate,
            currentDate: new Date().toLocaleString(),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    decodeToken(token) {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded)
            return null;
        const createdDate = decoded.iat ? new Date(decoded.iat * 1000) : null;
        const expirationDate = decoded.exp ? new Date(decoded.exp * 1000) : null;
        const currentDate = new Date();
        let status = "unknown";
        if (expirationDate) {
            status = expirationDate > currentDate ? "active" : "expired";
        }
        return {
            ...decoded,
            status,
            tokenType: decoded.tokenType || "unknown",
            createdDate: createdDate?.toLocaleString() || null,
            expirationDate: expirationDate?.toLocaleString() || null,
            currentDate: currentDate.toLocaleString(),
        };
    }
    generateTokens(payload) {
        const accessPayload = { ...payload, tokenType: "access" };
        const refreshPayload = { ...payload, tokenType: "refresh" };
        const accessToken = jsonwebtoken_1.default.sign(accessPayload, envs_1.ENV_JWT.ACCESS_TOKEN_SECRET, {
            expiresIn: envs_1.ENV_JWT.ACCESS_TOKEN_EXPIRES,
        });
        const refreshToken = jsonwebtoken_1.default.sign(refreshPayload, envs_1.ENV_JWT.REFRESH_TOKEN_SECRET, {
            expiresIn: envs_1.ENV_JWT.REFRESH_TOKEN_EXPIRES,
        });
        return { accessToken, refreshToken };
    }
    verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, envs_1.ENV_JWT.REFRESH_TOKEN_SECRET);
        }
        catch {
            return null;
        }
    }
    async forgotPassword(email, baseURL) {
        const user = await this.repo.findOneBy({ email });
        if (!user)
            throw new Error("Email not found");
        const tokenPayload = {
            email: user.email,
            userId: user._id,
            tokenType: "reset",
        };
        const resetToken = jsonwebtoken_1.default.sign(tokenPayload, envs_1.ENV_JWT.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });
        // Aquí podrías enviar el token por correo (ej. con nodemailer)
        const resetLink = `${baseURL}/password/reset?resetToken=${resetToken}`;
        await this.emailService.sendResetPasswordEmail(email, resetLink);
        return resetToken;
    }
    async restorePassword(resetToken, newPassword) {
        try {
            const decoded = jsonwebtoken_1.default.verify(resetToken, envs_1.ENV_JWT.ACCESS_TOKEN_SECRET);
            if (!decoded || decoded.tokenType !== "reset")
                throw new Error("Invalid token");
            const user = await this.repo.findOneBy({ _id: decoded.userId });
            if (!user)
                throw new Error("User not found");
            const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
            user.password = hashedPassword;
            await this.repo.save(user);
            return true;
        }
        catch {
            return false;
        }
    }
    async checkExistence({ email, username }) {
        const conditions = [];
        if (email)
            conditions.push({ email });
        if (username)
            conditions.push({ username });
        if (conditions.length === 0)
            return {};
        const found = await this.repo.find({
            where: conditions,
        });
        return {
            email: found.some((u) => u.email === email),
            username: found.some((u) => u.username === username),
        };
    }
}
exports.AuthSQLService = AuthSQLService;
//# sourceMappingURL=auth.sql.service.js.map