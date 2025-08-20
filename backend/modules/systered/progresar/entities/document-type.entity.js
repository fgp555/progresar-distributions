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
exports.DocumentTypeEntity = void 0;
// src/modules/users/entities/document-type.entity.ts
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let DocumentTypeEntity = class DocumentTypeEntity {
};
exports.DocumentTypeEntity = DocumentTypeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentTypeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], DocumentTypeEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentTypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DocumentTypeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DocumentTypeEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_entity_1.ProgresarUserEntity, (user) => user.documentType),
    __metadata("design:type", Array)
], DocumentTypeEntity.prototype, "users", void 0);
exports.DocumentTypeEntity = DocumentTypeEntity = __decorate([
    (0, typeorm_1.Entity)("progresar_document_types")
], DocumentTypeEntity);
/**
| Código       | Nombre                                                                         |
| ------------ | ------------------------------------------------------------------------------ |
| **CC**       | Cédula de Ciudadanía                                                           |
| **CE**       | Cédula de Extranjería                                                          |
| **TI**       | Tarjeta de Identidad                                                           |
| **RC**       | Registro Civil                                                                 |
| **PA / PSP** | Pasaporte                                                                      |
| **PEP**      | Permiso Especial de Permanencia                                                |
| **NIT**      | Número de Identificación Tributaria                                            |
| **PT**       | Permiso Temporal                                                               |
| **AS**       | Adulto sin Identificación                                                      |
| **MS**       | Menor sin Identificación                                                       |
| **NUIP**     | Número Único de Identificación Personal (algunos sistemas lo separan de CC/TI) |
| **OTRO**     | Documento no clasificado (campo abierto en algunos sistemas)                   |

 */
//# sourceMappingURL=document-type.entity.js.map