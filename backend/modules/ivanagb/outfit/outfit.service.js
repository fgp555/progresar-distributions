"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutfitService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const outfit_entity_1 = require("./entities/outfit.entity");
class OutfitService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(outfit_entity_1.OutfitEntity);
    }
    async findAll() {
        return this.repo.find({
            relations: {
                tops: true,
                bottoms: true,
                accessories: true,
            },
            order: { date: "DESC" },
        });
    }
    async findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: {
                tops: true,
                bottoms: true,
                accessories: true,
            },
        });
    }
    async create(data) {
        const { tops, bottoms, accessories, wardrobeId, ...outfitData } = data;
        const outfit = this.repo.create(outfitData);
        if (wardrobeId) {
            outfit.wardrobe = { id: wardrobeId }; // ⚠️ TypeORM acepta referencia por ID si lo casteas
        }
        const savedOutfit = await this.repo.save(outfit);
        if (tops?.length) {
            await this.repo.createQueryBuilder().relation(outfit_entity_1.OutfitEntity, "tops").of(savedOutfit).add(tops);
        }
        if (bottoms?.length) {
            await this.repo.createQueryBuilder().relation(outfit_entity_1.OutfitEntity, "bottoms").of(savedOutfit).add(bottoms);
        }
        if (accessories?.length) {
            await this.repo.createQueryBuilder().relation(outfit_entity_1.OutfitEntity, "accessories").of(savedOutfit).add(accessories);
        }
        return this.findOne(savedOutfit.id);
    }
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
}
exports.OutfitService = OutfitService;
//# sourceMappingURL=outfit.service.js.map