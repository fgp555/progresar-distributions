"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const options_entity_1 = require("./entities/options.entity");
class OptionsService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(options_entity_1.OptionsEntity);
    }
    create(data) {
        const option = this.repo.create(data);
        return this.repo.save(option);
    }
    findAll() {
        return this.repo.find();
    }
    findOne(id) {
        return this.repo.findOneBy({ id });
    }
    findByKey(key) {
        return this.repo.findOneBy({ key });
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        const option = await this.findOne(id);
        return this.repo.remove(option);
    }
    async getBootCount() {
        // const repo = AppDataSource.getRepository(OptionsEntity);
        const opt = await this.repo.findOneBy({ key: "boot_counter" });
        return opt ? parseInt(opt.value, 10) : 0;
    }
}
exports.OptionsService = OptionsService;
//# sourceMappingURL=options.service.js.map