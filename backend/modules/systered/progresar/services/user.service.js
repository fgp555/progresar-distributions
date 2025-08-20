"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_entity_1 = require("../entities/User.entity");
const error_middleware_1 = require("../middleware/error.middleware");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
class UserService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(User_entity_1.ProgresarUserEntity);
    }
    async findAll() {
        const users = await this.repo.find({
            relations: ["cuentas"],
            order: { name: "ASC" },
        });
        return {
            page: 1,
            totalPages: 1,
            totalItems: users.length,
            hasMore: false,
            results: users,
        };
    }
    async findOne(id) {
        const user = await this.repo.findOne({
            where: { _id: id },
            relations: ["cuentas"],
        });
        if (!user) {
            throw new error_middleware_1.AppError("Usuario no encontrado", 404);
        }
        return user;
    }
    async create(dto) {
        // Verificar email único
        const existingUser = await this.repo.findOne({ where: { email: dto.email } });
        if (existingUser) {
            throw new error_middleware_1.AppError("El email ya está registrado", 400);
        }
        const user = this.repo.create(dto);
        return await this.repo.save(user);
    }
    async update(id, dto) {
        const user = await this.repo.findOne({ where: { _id: id } });
        if (!user) {
            throw new error_middleware_1.AppError("Usuario no encontrado", 404);
        }
        if (dto.email && dto.email !== user.email) {
            const existingUser = await this.repo.findOne({ where: { email: dto.email } });
            if (existingUser) {
                throw new error_middleware_1.AppError("El email ya está registrado", 400);
            }
        }
        Object.assign(user, dto);
        return await this.repo.save(user);
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map