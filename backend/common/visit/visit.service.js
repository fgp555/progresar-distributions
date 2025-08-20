"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitService = void 0;
// src/common/visit/visit.service.ts
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const visit_middleware_1 = require("../../middleware/visit.middleware");
const visit_entity_1 = require("./entities/visit.entity");
class VisitService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(visit_entity_1.VisitEntity);
    }
    async findAll() {
        return this.repo.find({
            order: { visitedAt: "DESC" }, // opcional: ordenar por fecha
        });
    }
    async findAllMock() {
        // Retornar ordenado por fecha descendente
        return visit_middleware_1.visitDataMock.sort((a, b) => b.visitedAt.getTime() - a.visitedAt.getTime());
    }
}
exports.VisitService = VisitService;
//# sourceMappingURL=visit.service.js.map