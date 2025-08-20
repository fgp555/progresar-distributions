"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProjectUser = void 0;
const project_user_data_json_1 = __importDefault(require("./project-user.data.json"));
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const user_entity_1 = require("../entities/user.entity");
const mappedData = project_user_data_json_1.default.map((item) => ({
    ...item,
    role: item.role,
}));
const seedProjectUser = async () => {
    const repo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.ProjectUserEntity);
    const count = await repo.count();
    if (count === 0) {
        await repo.save(mappedData);
        console.info("🌱 seedProjectUser seed complete ✅");
    }
    else {
        console.info("ℹ️ seedProjectUser table already has data. Seed skipped.");
    }
};
exports.seedProjectUser = seedProjectUser;
//# sourceMappingURL=project-user.seed.js.map