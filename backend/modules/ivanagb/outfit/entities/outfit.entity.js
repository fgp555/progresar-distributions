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
exports.OutfitEntity = void 0;
const typeorm_1 = require("typeorm");
const wardrobe_entity_1 = require("../../wardrobe/entities/wardrobe.entity");
const top_entity_1 = require("../../wardrobe/entities/top.entity");
const bottom_entity_1 = require("../../wardrobe/entities/bottom.entity");
const accessory_entity_1 = require("../../wardrobe/entities/accessory.entity");
let OutfitEntity = class OutfitEntity {
};
exports.OutfitEntity = OutfitEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OutfitEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OutfitEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OutfitEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], OutfitEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OutfitEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wardrobe_entity_1.WardrobeEntity, (wardrobe) => wardrobe.outfits, { onDelete: "CASCADE" }),
    __metadata("design:type", wardrobe_entity_1.WardrobeEntity)
], OutfitEntity.prototype, "wardrobe", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => top_entity_1.WardrobeTopEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], OutfitEntity.prototype, "tops", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => bottom_entity_1.WardrobeBottomEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], OutfitEntity.prototype, "bottoms", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => accessory_entity_1.WardrobeAccessoryEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], OutfitEntity.prototype, "accessories", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OutfitEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OutfitEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OutfitEntity.prototype, "updatedAt", void 0);
exports.OutfitEntity = OutfitEntity = __decorate([
    (0, typeorm_1.Entity)("wardrobe_outfits")
], OutfitEntity);
//# sourceMappingURL=outfit.entity.js.map