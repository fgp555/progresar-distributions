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
exports.RestaurantEntity = void 0;
const typeorm_1 = require("typeorm");
const table_entity_1 = require("./table.entity");
const category_entity_1 = require("../../restaurant-category/entities/category.entity");
const restaurant_user_entity_1 = require("../../restaurant-user/entities/restaurant-user.entity");
let RestaurantEntity = class RestaurantEntity {
};
exports.RestaurantEntity = RestaurantEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RestaurantEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" }),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "instagram", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "googleMapUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], RestaurantEntity.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.RestaurantCategoryEntity, (category) => category.restaurant, {
        cascade: true,
        eager: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], RestaurantEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => restaurant_user_entity_1.RestaurantUserEntity, (user) => user.restaurant, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], RestaurantEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => table_entity_1.RestaurantTableEntity, (table) => table.restaurant, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], RestaurantEntity.prototype, "tables", void 0);
exports.RestaurantEntity = RestaurantEntity = __decorate([
    (0, typeorm_1.Entity)('restaurant')
], RestaurantEntity);
//# sourceMappingURL=restaurant.entity.js.map