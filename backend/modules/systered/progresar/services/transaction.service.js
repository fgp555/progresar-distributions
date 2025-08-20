"use strict";
// src\modules\systered\progresar\services\transaction.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const Transaction_entity_1 = require("../entities/Transaction.entity");
const Account_entity_1 = require("../entities/Account.entity");
const error_middleware_1 = require("../middleware/error.middleware");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
class TransactionService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(Transaction_entity_1.TransactionEntity);
        this.accountRepo = typeOrmConfig_1.AppDataSource.getRepository(Account_entity_1.AccountEntity);
    }
    async findAll(page = 1, limit = 10) {
        const [transactions, total] = await this.repo.findAndCount({
            order: { fecha: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            hasMore: page < Math.ceil(total / limit),
            results: transactions,
        };
    }
    async findByAccountId(accountId, page = 1, limit = 10) {
        const account = await this.accountRepo.findOne({ where: { id: accountId }, relations: ["user"] });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        const [transactions, total] = await this.repo.findAndCount({
            where: { cuentaId: accountId },
            order: { fecha: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            hasMore: page < Math.ceil(total / limit),
            results: transactions,
            user: account.user,
        };
    }
    async deposit(accountId, dto) {
        const account = await this.accountRepo.findOne({ where: { id: accountId } });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        if (dto.monto <= 0) {
            throw new error_middleware_1.AppError("El monto debe ser mayor a 0", 400);
        }
        const saldoAnterior = Number(account.saldo);
        account.saldo = Number(account.saldo) + dto.monto;
        const transaction = this.repo.create({
            cuentaId: accountId,
            tipo: Transaction_entity_1.TransactionType.DEPOSITO,
            monto: dto.monto,
            descripcion: dto.descripcion || "Depósito",
            saldoAnterior,
            saldoNuevo: Number(account.saldo),
            fecha: dto.fecha || new Date(),
        });
        await this.accountRepo.save(account);
        const savedTransaction = await this.repo.save(transaction);
        return {
            transaction: savedTransaction,
            saldoActual: account.saldo,
        };
    }
    async withdraw(accountId, dto) {
        const account = await this.accountRepo.findOne({ where: { id: accountId } });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        if (dto.monto <= 0) {
            throw new error_middleware_1.AppError("El monto debe ser mayor a 0", 400);
        }
        if (Number(account.saldo) < dto.monto) {
            throw new error_middleware_1.AppError("Saldo insuficiente", 400);
        }
        const saldoAnterior = Number(account.saldo);
        account.saldo = Number(account.saldo) - dto.monto;
        const transaction = this.repo.create({
            cuentaId: accountId,
            tipo: Transaction_entity_1.TransactionType.RETIRO,
            monto: dto.monto,
            descripcion: dto.descripcion || "Retiro",
            saldoAnterior,
            saldoNuevo: Number(account.saldo),
            fecha: dto.fecha || new Date(),
        });
        await this.accountRepo.save(account);
        const savedTransaction = await this.repo.save(transaction);
        return {
            transaction: savedTransaction,
            saldoActual: account.saldo,
        };
    }
    async transfer(dto) {
        const accountOrigin = await this.accountRepo.findOne({ where: { id: dto.cuentaOrigenId } });
        const accountDestination = await this.accountRepo.findOne({ where: { numeroCuenta: dto.cuentaDestinoNumero } });
        if (!accountOrigin) {
            throw new error_middleware_1.AppError("Cuenta origen no encontrada", 404);
        }
        if (!accountDestination) {
            throw new error_middleware_1.AppError("Cuenta destino no encontrada", 404);
        }
        if (accountOrigin.id === accountDestination.id) {
            throw new error_middleware_1.AppError("No se puede transferir a la misma cuenta", 400);
        }
        if (dto.monto <= 0) {
            throw new error_middleware_1.AppError("El monto debe ser mayor a 0", 400);
        }
        if (Number(accountOrigin.saldo) < dto.monto) {
            throw new error_middleware_1.AppError("Saldo insuficiente en cuenta origen", 400);
        }
        const saldoAnteriorOrigen = Number(accountOrigin.saldo);
        const saldoAnteriorDestino = Number(accountDestination.saldo);
        accountOrigin.saldo = Number(accountOrigin.saldo) - dto.monto;
        accountDestination.saldo = Number(accountDestination.saldo) + dto.monto;
        const transactionOrigin = this.repo.create({
            cuentaId: accountOrigin.id,
            cuentaDestinoId: accountDestination.id,
            tipo: Transaction_entity_1.TransactionType.TRANSFERENCIA_SALIDA,
            monto: dto.monto,
            descripcion: dto.descripcion || `Transferencia a ${accountDestination.numeroCuenta}`,
            saldoAnterior: saldoAnteriorOrigen,
            saldoNuevo: Number(accountOrigin.saldo),
        });
        const transactionDestination = this.repo.create({
            cuentaId: accountDestination.id,
            cuentaOrigenId: accountOrigin.id,
            tipo: Transaction_entity_1.TransactionType.TRANSFERENCIA_ENTRADA,
            monto: dto.monto,
            descripcion: dto.descripcion || `Transferencia desde ${accountOrigin.numeroCuenta}`,
            saldoAnterior: saldoAnteriorDestino,
            saldoNuevo: Number(accountDestination.saldo),
        });
        await this.accountRepo.save([accountOrigin, accountDestination]);
        const savedTransactions = await this.repo.save([transactionOrigin, transactionDestination]);
        return {
            transaccionOrigen: savedTransactions[0],
            transaccionDestino: savedTransactions[1],
            saldoOrigenActual: accountOrigin.saldo,
            saldoDestinoActual: accountDestination.saldo,
        };
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map