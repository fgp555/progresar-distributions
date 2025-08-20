"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wardrobe_entities = void 0;
// ivanagb - Wardrobe
const accessory_entity_1 = require("./accessory.entity");
const bottom_entity_1 = require("./bottom.entity");
const wardrobe_entity_1 = require("./wardrobe.entity");
const top_entity_1 = require("./top.entity");
const user_wardrobe_entity_1 = require("../../wardrobe-user/entities/user-wardrobe.entity");
const outfit_entity_1 = require("../../outfit/entities/outfit.entity");
exports.wardrobe_entities = [
    accessory_entity_1.WardrobeAccessoryEntity,
    bottom_entity_1.WardrobeBottomEntity,
    wardrobe_entity_1.WardrobeEntity,
    top_entity_1.WardrobeTopEntity,
    user_wardrobe_entity_1.WardrobeUserEntity,
    outfit_entity_1.OutfitEntity,
];
//# sourceMappingURL=_wardrobe.entities.js.map