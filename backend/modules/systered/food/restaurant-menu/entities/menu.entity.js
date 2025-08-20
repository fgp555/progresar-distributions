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
exports.RestaurantMenuEntity = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../../restaurant-category/entities/category.entity");
let RestaurantMenuEntity = class RestaurantMenuEntity {
};
exports.RestaurantMenuEntity = RestaurantMenuEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RestaurantMenuEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantMenuEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantMenuEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], RestaurantMenuEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], RestaurantMenuEntity.prototype, "offerPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], RestaurantMenuEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], RestaurantMenuEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], RestaurantMenuEntity.prototype, "videos", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RestaurantMenuEntity.prototype, "isDailySpecial", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.RestaurantCategoryEntity, (category) => category.menus, {
    // eager: true,
    // cascade: true,
    // onDelete: "CASCADE",
    //
    }),
    __metadata("design:type", category_entity_1.RestaurantCategoryEntity)
], RestaurantMenuEntity.prototype, "category", void 0);
exports.RestaurantMenuEntity = RestaurantMenuEntity = __decorate([
    (0, typeorm_1.Entity)('restaurant_menu')
], RestaurantMenuEntity);
//# sourceMappingURL=menu.entity.js.map