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
exports.ProgresarUserEntity = void 0;
const typeorm_1 = require("typeorm");
const Account_entity_1 = require("./Account.entity");
const roles_enum_1 = require("../../../../auth/enum/roles.enum");
const document_type_entity_1 = require("./document-type.entity");
let ProgresarUserEntity = class ProgresarUserEntity {
};
exports.ProgresarUserEntity = ProgresarUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: true, nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: roles_enum_1.UserRoleEnum,
        default: roles_enum_1.UserRoleEnum.USER,
    }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ProgresarUserEntity.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ProgresarUserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "rawGoogle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_type_entity_1.DocumentTypeEntity, (docType) => docType.users, {
        nullable: true,
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "document_type_id" }),
    __metadata("design:type", document_type_entity_1.DocumentTypeEntity)
], ProgresarUserEntity.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProgresarUserEntity.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], ProgresarUserEntity.prototype, "cupos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProgresarUserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProgresarUserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Account_entity_1.AccountEntity, (account) => account.user, {
        cascade: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], ProgresarUserEntity.prototype, "cuentas", void 0);
exports.ProgresarUserEntity = ProgresarUserEntity = __decorate([
    (0, typeorm_1.Entity)("progresar_users")
], ProgresarUserEntity);
//# sourceMappingURL=User.entity.js.map