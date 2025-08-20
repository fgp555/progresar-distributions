"use strict";
// src/auth/service/user.sql.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSQLService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const switchModule_1 = require("../../config/switchModule");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsersSQLService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository((0, switchModule_1.selectUserEntity)());
    }
    async findAll(query = {}) {
        const { dateFrom, dateTo, sortDate = "DESC", search = "", limit = 10, page = 1 } = query;
        const queryBuilder = this.repo.createQueryBuilder("user");
        // Filtro por fechas
        if (dateFrom && dateTo) {
            queryBuilder.andWhere("user.createdAt BETWEEN :dateFrom AND :dateTo", {
                dateFrom: new Date(dateFrom),
                dateTo: new Date(dateTo),
            });
        }
        // Búsqueda por texto
        if (search && search.trim() !== "") {
            queryBuilder.andWhere("(user.username LIKE :search OR user.name LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search)", { search: `%${search}%` });
        }
        // Solo usuarios visibles
        queryBuilder.andWhere("user.isVisible = :isVisible", { isVisible: true });
        // Ordenamiento
        queryBuilder.orderBy("user.createdAt", sortDate);
        // Paginación
        const offset = (page - 1) * limit;
        queryBuilder.skip(offset).take(limit);
        // Ejecutar consulta
        const [results, totalItems] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);
        const hasMore = page < totalPages;
        return {
            page: Number(page),
            totalPages,
            totalItems,
            hasMore,
            results: results.map((user) => {
                // Excluir el password del response
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }),
        };
    }
    async findOne(id) {
        const user = await this.repo.findOneBy({ _id: id });
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }
    async create(dto) {
        const hashedPassword = await bcryptjs_1.default.hash(dto.password, 10);
        const user = this.repo.create({ ...dto, password: hashedPassword });
        const savedUser = await this.repo.save(user);
        // Excluir el password del response
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async update(id, dto) {
        const user = await this.repo.findOneBy({ _id: id });
        if (!user)
            return null;
        // Si se envía un nuevo password, lo encriptamos
        if (dto.password) {
            dto.password = await bcryptjs_1.default.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        const updatedUser = await this.repo.save(user);
        // Excluir el password del response
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.UsersSQLService = UsersSQLService;
//# sourceMappingURL=user.sql.service.js.map