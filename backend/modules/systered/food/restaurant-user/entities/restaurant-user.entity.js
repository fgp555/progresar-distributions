"use strict";
// src/common/restaurant/entities/user.entity.ts
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
exports.RestaurantUserEntity = void 0;
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("../../restaurant/entities/restaurant.entity");
const table_entity_1 = require("../../restaurant/entities/table.entity");
let RestaurantUserEntity = class RestaurantUserEntity {
};
exports.RestaurantUserEntity = RestaurantUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RestaurantUserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RestaurantUserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: true, nullable: true }),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RestaurantUserEntity.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["waiter", "cashier", "supervisor", "client"],
        default: "waiter",
    }),
    __metadata("design:type", String)
], RestaurantUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.RestaurantEntity, (restaurant) => restaurant.users),
    __metadata("design:type", restaurant_entity_1.RestaurantEntity)
], RestaurantUserEntity.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => table_entity_1.RestaurantTableEntity, (table) => table.users),
    __metadata("design:type", Array)
], RestaurantUserEntity.prototype, "tables", void 0);
exports.RestaurantUserEntity = RestaurantUserEntity = __decorate([
    (0, typeorm_1.Entity)("restaurant_user")
], RestaurantUserEntity);
//# sourceMappingURL=restaurant-user.entity.js.map