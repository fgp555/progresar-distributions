"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const slugify_1 = require("../../../utils/slugify");
const wardrobe_entity_1 = require("./entities/wardrobe.entity");
class WardrobeService {
    constructor() {
        this.wardrobeRepo = typeOrmConfig_1.AppDataSource.getRepository(wardrobe_entity_1.WardrobeEntity);
    }
    async findAll() {
        return await this.wardrobeRepo.find({
            relations: [
                "user",
                "tops",
                "bottoms",
                "accessories",
                "outfits",
                "outfits.tops",
                "outfits.bottoms",
                "outfits.accessories",
            ],
        });
    }
    async findOne(id) {
        return await this.wardrobeRepo.findOne({
            where: { id },
            relations: [
                "user",
                "tops",
                "bottoms",
                "accessories",
                "outfits",
                "outfits.tops",
                "outfits.bottoms",
                "outfits.accessories",
            ],
        });
    }
    async create(data) {
        if (data.name) {
            data.slug = (0, slugify_1.toSlug)(data.name);
        }
        const newWardrobe = this.wardrobeRepo.create(data);
        return await this.wardrobeRepo.save(newWardrobe);
    }
    async update(id, data) {
        await this.wardrobeRepo.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        await this.wardrobeRepo.delete(id);
    }
}
exports.WardrobeService = WardrobeService;
//# sourceMappingURL=wardrobe.service.js.map