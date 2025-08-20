"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const category_entity_1 = require("./entities/category.entity");
class CategoryService {
    static async findAll() {
        return this.repo.find({ relations: ["menus"] });
    }
    static async findOne(id) {
        return this.repo.findOne({ where: { id }, relations: ["menus"] });
    }
    static async create(data) {
        const category = this.repo.create(data);
        return this.repo.save(category);
    }
    static async update(id, data) {
        const category = await this.repo.findOne({ where: { id } });
        if (!category)
            return null;
        this.repo.merge(category, data);
        return this.repo.save(category);
    }
    static async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.CategoryService = CategoryService;
CategoryService.repo = typeOrmConfig_1.AppDataSource.getRepository(category_entity_1.RestaurantCategoryEntity);
//# sourceMappingURL=category.service.js.map