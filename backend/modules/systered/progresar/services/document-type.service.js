"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTypeService = void 0;
const document_type_entity_1 = require("../entities/document-type.entity");
const error_middleware_1 = require("../middleware/error.middleware");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
class DocumentTypeService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(document_type_entity_1.DocumentTypeEntity);
    }
    async findAll() {
        const documentTypes = await this.repo.find({
            relations: ["users"],
            order: { code: "ASC" },
        });
        return {
            page: 1,
            totalPages: 1,
            totalItems: documentTypes.length,
            hasMore: false,
            results: documentTypes,
        };
    }
    async findOne(id) {
        const documentType = await this.repo.findOne({
            where: { id },
            relations: ["users"],
        });
        if (!documentType) {
            throw new error_middleware_1.AppError("Tipo de documento no encontrado", 404);
        }
        return documentType;
    }
    async findByCode(code) {
        const documentType = await this.repo.findOne({
            where: { code },
            relations: ["users"],
        });
        if (!documentType) {
            throw new error_middleware_1.AppError("Tipo de documento no encontrado", 404);
        }
        return documentType;
    }
    async create(dto) {
        // Verificar código único
        const existingDocType = await this.repo.findOne({ where: { code: dto.code } });
        if (existingDocType) {
            throw new error_middleware_1.AppError("El código ya está registrado", 400);
        }
        // Verificar nombre único
        const existingName = await this.repo.findOne({ where: { name: dto.name } });
        if (existingName) {
            throw new error_middleware_1.AppError("El nombre ya está registrado", 400);
        }
        const documentType = this.repo.create(dto);
        return await this.repo.save(documentType);
    }
    async update(id, dto) {
        const documentType = await this.repo.findOne({ where: { id } });
        if (!documentType) {
            throw new error_middleware_1.AppError("Tipo de documento no encontrado", 404);
        }
        // Verificar código único si se está actualizando
        if (dto.code && dto.code !== documentType.code) {
            const existingDocType = await this.repo.findOne({ where: { code: dto.code } });
            if (existingDocType) {
                throw new error_middleware_1.AppError("El código ya está registrado", 400);
            }
        }
        // Verificar nombre único si se está actualizando
        if (dto.name && dto.name !== documentType.name) {
            const existingName = await this.repo.findOne({ where: { name: dto.name } });
            if (existingName) {
                throw new error_middleware_1.AppError("El nombre ya está registrado", 400);
            }
        }
        Object.assign(documentType, dto);
        return await this.repo.save(documentType);
    }
    async remove(id) {
        // Verificar si tiene usuarios asociados
        const documentType = await this.repo.findOne({
            where: { id },
            relations: ["users"],
        });
        if (!documentType) {
            throw new error_middleware_1.AppError("Tipo de documento no encontrado", 404);
        }
        if (documentType.users && documentType.users.length > 0) {
            throw new error_middleware_1.AppError("No se puede eliminar el tipo de documento porque tiene usuarios asociados", 400);
        }
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
    async seedDefaultTypes() {
        const defaultTypes = [
            { code: "CC", name: "Cédula de Ciudadanía" },
            { code: "CE", name: "Cédula de Extranjería" },
            { code: "TI", name: "Tarjeta de Identidad" },
            { code: "RC", name: "Registro Civil" },
            { code: "PSP", name: "Pasaporte" },
            { code: "PEP", name: "Permiso Especial de Permanencia" },
            { code: "NIT", name: "Número de Identificación Tributaria" },
            { code: "PT", name: "Permiso Temporal" },
            { code: "AS", name: "Adulto sin Identificación" },
            { code: "MS", name: "Menor sin Identificación" },
            { code: "NUIP", name: "Número Único de Identificación Personal" },
            { code: "OTRO", name: "Documento no clasificado" },
        ];
        for (const type of defaultTypes) {
            const existing = await this.repo.findOne({ where: { code: type.code } });
            if (!existing) {
                const documentType = this.repo.create(type);
                await this.repo.save(documentType);
            }
        }
        return "Tipos de documento por defecto creados exitosamente";
    }
}
exports.DocumentTypeService = DocumentTypeService;
//# sourceMappingURL=document-type.service.js.map