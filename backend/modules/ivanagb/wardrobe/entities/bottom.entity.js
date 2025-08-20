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
exports.WardrobeBottomEntity = void 0;
const typeorm_1 = require("typeorm");
const wardrobe_entity_1 = require("./wardrobe.entity");
let WardrobeBottomEntity = class WardrobeBottomEntity {
};
exports.WardrobeBottomEntity = WardrobeBottomEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WardrobeBottomEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeBottomEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeBottomEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeBottomEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeBottomEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WardrobeBottomEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WardrobeBottomEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WardrobeBottomEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wardrobe_entity_1.WardrobeEntity, (wardrobe) => wardrobe.bottoms),
    __metadata("design:type", wardrobe_entity_1.WardrobeEntity)
], WardrobeBottomEntity.prototype, "wardrobe", void 0);
exports.WardrobeBottomEntity = WardrobeBottomEntity = __decorate([
    (0, typeorm_1.Entity)("wardrobe_bottom")
], WardrobeBottomEntity);
//# sourceMappingURL=bottom.entity.js.map