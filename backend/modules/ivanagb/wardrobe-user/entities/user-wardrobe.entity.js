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
exports.WardrobeUserEntity = void 0;
// wardrobe-user.entity.ts
const typeorm_1 = require("typeorm");
const wardrobe_entity_1 = require("../../wardrobe/entities/wardrobe.entity");
let WardrobeUserEntity = class WardrobeUserEntity {
};
exports.WardrobeUserEntity = WardrobeUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], WardrobeUserEntity.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], WardrobeUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], WardrobeUserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WardrobeUserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: true, nullable: true }),
    __metadata("design:type", String)
], WardrobeUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "user" }),
    __metadata("design:type", String)
], WardrobeUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WardrobeUserEntity.prototype, "isPublic", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WardrobeUserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WardrobeUserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wardrobe_entity_1.WardrobeEntity, (wardrobe) => wardrobe.user, {
        onDelete: "CASCADE",
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], WardrobeUserEntity.prototype, "wardrobes", void 0);
exports.WardrobeUserEntity = WardrobeUserEntity = __decorate([
    (0, typeorm_1.Entity)("wardrobe_user")
], WardrobeUserEntity);
//# sourceMappingURL=user-wardrobe.entity.js.map