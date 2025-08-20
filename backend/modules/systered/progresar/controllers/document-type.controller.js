"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTypeController = void 0;
const document_type_service_1 = require("../services/document-type.service");
class DocumentTypeController {
    constructor() {
        this.service = new document_type_service_1.DocumentTypeService();
    }
    async findAll(req, res, next) {
        try {
            const documentTypes = await this.service.findAll();
            res.json({
                success: true,
                data: documentTypes.results,
                total: documentTypes.totalItems,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: "ID inválido",
                });
            }
            const documentType = await this.service.findOne(id);
            res.json({
                success: true,
                data: documentType,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async findByCode(req, res, next) {
        try {
            const code = req.params.code;
            const documentType = await this.service.findByCode(code);
            res.json({
                success: true,
                data: documentType,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const documentType = await this.service.create(req.body);
            res.status(201).json({
                success: true,
                message: "Tipo de documento creado exitosamente",
                data: documentType,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: "ID inválido",
                });
            }
            const documentType = await this.service.update(id, req.body);
            res.json({
                success: true,
                message: "Tipo de documento actualizado exitosamente",
                data: documentType,
            });
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: "ID inválido",
                });
            }
            await this.service.remove(id);
            res.json({
                success: true,
                message: "Tipo de documento eliminado exitosamente",
            });
        }
        catch (err) {
            next(err);
        }
    }
    async seedDefaults(req, res, next) {
        try {
            const message = await this.service.seedDefaultTypes();
            res.json({
                success: true,
                message,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.DocumentTypeController = DocumentTypeController;
//# sourceMappingURL=document-type.controller.js.map