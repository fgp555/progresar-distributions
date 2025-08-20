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
exports.AccountEntity = exports.AccountStatus = exports.Currency = exports.AccountType = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Transaction_entity_1 = require("./Transaction.entity");
const Loan_entity_1 = require("./Loan.entity");
var AccountType;
(function (AccountType) {
    AccountType["AHORRO"] = "ahorro";
    AccountType["CORRIENTE"] = "corriente";
    AccountType["PRESTAMO"] = "prestamo";
})(AccountType || (exports.AccountType = AccountType = {}));
var Currency;
(function (Currency) {
    Currency["COP"] = "COP";
})(Currency || (exports.Currency = Currency = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVA"] = "activa";
    AccountStatus["INACTIVA"] = "inactiva";
    AccountStatus["CERRADA"] = "cerrada";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
let AccountEntity = class AccountEntity {
};
exports.AccountEntity = AccountEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AccountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], AccountEntity.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, unique: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "numeroCuenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AccountType }),
    __metadata("design:type", String)
], AccountEntity.prototype, "tipoCuenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "saldo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Currency }),
    __metadata("design:type", String)
], AccountEntity.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AccountEntity.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AccountStatus, default: AccountStatus.ACTIVA }),
    __metadata("design:type", String)
], AccountEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.ProgresarUserEntity, (user) => user.cuentas, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "usuarioId" }),
    __metadata("design:type", User_entity_1.ProgresarUserEntity)
], AccountEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_entity_1.TransactionEntity, (transaction) => transaction.account),
    __metadata("design:type", Array)
], AccountEntity.prototype, "transacciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Loan_entity_1.LoanEntity, (loan) => loan.account),
    __metadata("design:type", Array)
], AccountEntity.prototype, "prestamos", void 0);
exports.AccountEntity = AccountEntity = __decorate([
    (0, typeorm_1.Entity)("progresar_accounts")
], AccountEntity);
//# sourceMappingURL=Account.entity.js.map