"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUploadService = void 0;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const accessory_entity_1 = require("./entities/accessory.entity");
const bottom_entity_1 = require("./entities/bottom.entity");
const top_entity_1 = require("./entities/top.entity");
const wardrobe_entity_1 = require("./entities/wardrobe.entity");
class WardrobeUploadService {
    async saveItem(data) {
        const wardrobe = await typeOrmConfig_1.AppDataSource.getRepository(wardrobe_entity_1.WardrobeEntity).findOneBy({
            id: data.wardrobeId,
        });
        if (!wardrobe)
            throw new Error("Wardrobe not found");
        const base = {
            name: data.name,
            color: data.color,
            size: data.size,
            image: data.image,
            brand: data.brand,
            wardrobe,
        };
        if (data.type === "accessory") {
            return await typeOrmConfig_1.AppDataSource.getRepository(accessory_entity_1.WardrobeAccessoryEntity).save(base);
        }
        if (data.type === "top") {
            return await typeOrmConfig_1.AppDataSource.getRepository(top_entity_1.WardrobeTopEntity).save(base);
        }
        if (data.type === "bottom") {
            return await typeOrmConfig_1.AppDataSource.getRepository(bottom_entity_1.WardrobeBottomEntity).save(base);
        }
        throw new Error("Invalid item type");
    }
    async getItemById(id, type) {
        if (type === "accessory") {
            return await typeOrmConfig_1.AppDataSource.getRepository(accessory_entity_1.WardrobeAccessoryEntity).findOneBy({ id });
        }
        if (type === "top") {
            return await typeOrmConfig_1.AppDataSource.getRepository(top_entity_1.WardrobeTopEntity).findOneBy({ id });
        }
        if (type === "bottom") {
            return await typeOrmConfig_1.AppDataSource.getRepository(bottom_entity_1.WardrobeBottomEntity).findOneBy({ id });
        }
        throw new Error("Invalid item type");
    }
}
exports.WardrobeUploadService = WardrobeUploadService;
//# sourceMappingURL=wardrobe-upload.service.js.map