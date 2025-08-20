"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeEntity = void 0;
// wardrobe.entity.ts
const typeorm_1 = require("typeorm");
const top_entity_1 = require("./top.entity");
const bottom_entity_1 = require("./bottom.entity");
const accessory_entity_1 = require("./accessory.entity");
const outfit_entity_1 = require("../../outfit/entities/outfit.entity");
const user_wardrobe_entity_1 = require("../../wardrobe-user/entities/user-wardrobe.entity");
let WardrobeEntity = class WardrobeEntity {
};
exports.WardrobeEntity = WardrobeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WardrobeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WardrobeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_wardrobe_entity_1.WardrobeUserEntity, (user) => user.wardrobes, { onDelete: "CASCADE" }),
    __metadata("design:type", user_wardrobe_entity_1.WardrobeUserEntity)
], WardrobeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => top_entity_1.WardrobeTopEntity, (top) => top.wardrobe, {
        onDelete: "CASCADE",
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], WardrobeEntity.prototype, "tops", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bottom_entity_1.WardrobeBottomEntity, (bottom) => bottom.wardrobe, {
        onDelete: "CASCADE",
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], WardrobeEntity.prototype, "bottoms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accessory_entity_1.WardrobeAccessoryEntity, (accessory) => accessory.wardrobe, {
        onDelete: "CASCADE",
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], WardrobeEntity.prototype, "accessories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => outfit_entity_1.OutfitEntity, (outfit) => outfit.wardrobe, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], WardrobeEntity.prototype, "outfits", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WardrobeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WardrobeEntity.prototype, "updatedAt", void 0);
exports.WardrobeEntity = WardrobeEntity = __decorate([
    (0, typeorm_1.Entity)("wardrobe")
], WardrobeEntity);
//# sourceMappingURL=wardrobe.entity.js.map