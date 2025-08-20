"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProject = void 0;
const project_data_json_1 = __importDefault(require("./project.data.json"));
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const project_entity_1 = require("../entities/project.entity");
const seedProject = async () => {
    const repo = typeOrmConfig_1.AppDataSource.getRepository(project_entity_1.ProjectEntity);
    const count = await repo.count();
    if (count === 0) {
        await repo.save(project_data_json_1.default);
        console.info("🌱 seedProject seed complete ✅");
    }
    else {
        console.info("ℹ️ seedProject table already has data. Seed skipped.");
    }
};
exports.seedProject = seedProject;
//# sourceMappingURL=project.seed.js.map