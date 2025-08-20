"use strict";
// src/modules/systered/progresar/services/user.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_entity_1 = require("../entities/User.entity");
const error_middleware_1 = require("../middleware/error.middleware");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const document_type_entity_1 = require("../entities/document-type.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(User_entity_1.ProgresarUserEntity);
    }
    async findAll(query = {}) {
        const { dateFrom, dateTo, sortDate = "DESC", search = "", limit = 10, page = 1 } = query;
        const queryBuilder = this.repo
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.cuentas", "cuentas")
            .leftJoinAndSelect("user.documentType", "documentType");
        // Filtro por fechas
        if (dateFrom && dateTo) {
            queryBuilder.andWhere("user.createdAt BETWEEN :dateFrom AND :dateTo", {
                dateFrom: new Date(dateFrom),
                dateTo: new Date(dateTo),
            });
        }
        // Búsqueda por texto en múltiples campos
        if (search && search.trim() !== "") {
            queryBuilder.andWhere("(user.name LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search OR user.documentNumber LIKE :search)", { search: `%${search}%` });
        }
        // Solo usuarios activos (si tienes un campo isActive)
        // queryBuilder.andWhere('user.isActive = :isActive', { isActive: true });
        // Ordenamiento por fecha de creación
        queryBuilder.orderBy("user.createdAt", sortDate);
        // También ordenar por nombre como criterio secundario
        queryBuilder.addOrderBy("user.name", "ASC");
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
            results,
        };
    }
    async findOne(id) {
        const user = await this.repo.findOne({
            where: { _id: id },
            relations: ["cuentas", "documentType"],
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
        // Verificar documento único si existe documentNumber
        if (dto.documentNumber) {
            const existingDoc = await this.repo.findOne({
                where: { documentNumber: dto.documentNumber },
            });
            if (existingDoc) {
                throw new error_middleware_1.AppError("El número de documento ya está registrado", 400);
            }
        }
        // documentType
        if (typeof dto.documentType === "string") {
            const documentTypeRepo = typeOrmConfig_1.AppDataSource.getRepository(document_type_entity_1.DocumentTypeEntity);
            const docType = await documentTypeRepo.findOne({
                where: { code: dto.documentType },
            });
            if (!docType) {
                throw new error_middleware_1.AppError("Tipo de documento no encontrado", 404);
            }
            dto.documentType = docType;
        }
        const user = this.repo.create(dto);
        return await this.repo.save(user);
    }
    async update(id, dto) {
        const user = await this.repo.findOne({ where: { _id: id } });
        if (!user) {
            throw new error_middleware_1.AppError("Usuario no encontrado", 404);
        }
        // Verificar email único si ha cambiado
        if (dto.email && dto.email !== user.email) {
            const existingUser = await this.repo.findOne({ where: { email: dto.email } });
            if (existingUser) {
                throw new error_middleware_1.AppError("El email ya está registrado", 400);
            }
        }
        // Verificar documento único si ha cambiado
        if (dto.documentNumber && dto.documentNumber !== user.documentNumber) {
            const existingDoc = await this.repo.findOne({
                where: { documentNumber: dto.documentNumber },
            });
            if (existingDoc) {
                throw new error_middleware_1.AppError("El número de documento ya está registrado", 400);
            }
        }
        // Handle documentType conversion if it's a string
        if (dto.documentType && typeof dto.documentType === "string") {
            const documentTypeRepo = typeOrmConfig_1.AppDataSource.getRepository(document_type_entity_1.DocumentTypeEntity);
            const docType = await documentTypeRepo.findOne({
                where: { code: dto.documentType },
            });
            if (!docType) {
                throw new error_middleware_1.AppError("Tipo de documento no válido", 400);
            }
            dto.documentType = docType;
        }
        // 🔑 Hashear password si viene en el dto
        if (dto.password) {
            dto.password = await bcryptjs_1.default.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        return await this.repo.save(user);
    }
    async remove(id) {
        const user = await this.repo.findOne({ where: { _id: id } });
        if (!user) {
            throw new error_middleware_1.AppError("Usuario no encontrado", 404);
        }
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
    // Métodos adicionales útiles
    async findByEmail(email) {
        return await this.repo.findOne({
            where: { email },
            relations: ["cuentas", "documentType"],
        });
    }
    async findByDocumentNumber(documentNumber) {
        return await this.repo.findOne({
            where: { documentNumber },
            relations: ["cuentas", "documentType"],
        });
    }
    async getStatistics() {
        const total = await this.repo.count();
        const active = await this.repo.count({
            where: { isActive: true }, // Asumiendo que tienes este campo
        });
        return {
            total,
            active,
            inactive: total - active,
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map