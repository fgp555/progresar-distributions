"use strict";
// src/common/stat/stat.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const stat_entity_1 = require("./entities/stat.entity");
class StatService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(stat_entity_1.StatEntity);
        this.truncate = (str, max) => (str && str.length > max ? str.substring(0, max) : str);
    }
    async track(data) {
        data.currentURL = this.truncate(data.currentURL, 200);
        data.referrerURL = this.truncate(data.referrerURL, 200);
        const stat = this.repo.create(data);
        return await this.repo.save(stat);
    }
    async findAll() {
        return await this.repo.find({ order: { createdAt: "DESC" } });
    }
    async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    async remove(id) {
        return await this.repo.delete(id);
    }
}
exports.StatService = StatService;
//# sourceMappingURL=stat.service.js.map