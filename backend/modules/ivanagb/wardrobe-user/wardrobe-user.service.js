"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUserService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const user_wardrobe_entity_1 = require("./entities/user-wardrobe.entity");
class WardrobeUserService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(user_wardrobe_entity_1.WardrobeUserEntity);
    }
    findAll() {
        return this.repo.find();
    }
    findOne(id) {
        return this.repo.findOne({ where: { _id: id } });
    }
    create(data) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    async findByUsername(username) {
        return this.repo.findOne({ where: { username } });
    }
}
exports.WardrobeUserService = WardrobeUserService;
//# sourceMappingURL=wardrobe-user.service.js.map