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
exports.LoanEntity = exports.LoanStatus = void 0;
const typeorm_1 = require("typeorm");
const Account_entity_1 = require("./Account.entity");
const Transaction_entity_1 = require("./Transaction.entity");
const LoanInstallment_entity_1 = require("./LoanInstallment.entity");
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["ACTIVO"] = "activo";
    LoanStatus["COMPLETADO"] = "completado";
    LoanStatus["CANCELADO"] = "cancelado";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
let LoanEntity = class LoanEntity {
};
exports.LoanEntity = LoanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], LoanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], LoanEntity.prototype, "cuentaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "montoPrincipal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "numeroCuotas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "montoCuota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "montoTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "interesTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "cuotasPagadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], LoanEntity.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], LoanEntity.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], LoanEntity.prototype, "fechaCompletado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: LoanStatus, default: LoanStatus.ACTIVO }),
    __metadata("design:type", String)
], LoanEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], LoanEntity.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], LoanEntity.prototype, "scoreAprobacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], LoanEntity.prototype, "ratioCapacidadPago", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_entity_1.AccountEntity, (account) => account.prestamos, {
        // cascade: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "cuentaId" }),
    __metadata("design:type", Account_entity_1.AccountEntity)
], LoanEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_entity_1.TransactionEntity, (transaction) => transaction.prestamo, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], LoanEntity.prototype, "transacciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LoanInstallment_entity_1.LoanInstallmentEntity, (installment) => installment.loan, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], LoanEntity.prototype, "cuotas", void 0);
exports.LoanEntity = LoanEntity = __decorate([
    (0, typeorm_1.Entity)("progresar_loans")
], LoanEntity);
//# sourceMappingURL=Loan.entity.js.map