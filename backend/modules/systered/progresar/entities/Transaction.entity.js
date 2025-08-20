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
exports.TransactionEntity = exports.TransactionType = void 0;
const typeorm_1 = require("typeorm");
const Account_entity_1 = require("./Account.entity");
const Loan_entity_1 = require("./Loan.entity");
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSITO"] = "deposito";
    TransactionType["RETIRO"] = "retiro";
    TransactionType["TRANSFERENCIA_ENTRADA"] = "transferencia_entrada";
    TransactionType["TRANSFERENCIA_SALIDA"] = "transferencia_salida";
    TransactionType["PRESTAMO_DESEMBOLSO"] = "prestamo_desembolso";
    TransactionType["PRESTAMO_PAGO_CUOTA"] = "prestamo_pago_cuota";
    TransactionType["PRESTAMO_PAGO_MULTIPLE"] = "prestamo_pago_multiple";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
let TransactionEntity = class TransactionEntity {
};
exports.TransactionEntity = TransactionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], TransactionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "cuentaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "cuentaDestinoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "cuentaOrigenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "prestamoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "cuotaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: TransactionType }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TransactionEntity.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "saldoAnterior", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "saldoNuevo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_entity_1.AccountEntity, (account) => account.transacciones, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "cuentaId" }),
    __metadata("design:type", Account_entity_1.AccountEntity)
], TransactionEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Loan_entity_1.LoanEntity, (loan) => loan.transacciones, { nullable: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "prestamoId" }),
    __metadata("design:type", Loan_entity_1.LoanEntity)
], TransactionEntity.prototype, "prestamo", void 0);
exports.TransactionEntity = TransactionEntity = __decorate([
    (0, typeorm_1.Entity)("progresar_transactions")
], TransactionEntity);
//# sourceMappingURL=Transaction.entity.js.map