"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const Account_entity_1 = require("../entities/Account.entity");
const User_entity_1 = require("../entities/User.entity");
const error_middleware_1 = require("../middleware/error.middleware");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
class AccountService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(Account_entity_1.AccountEntity);
        this.userRepo = typeOrmConfig_1.AppDataSource.getRepository(User_entity_1.ProgresarUserEntity);
    }
    generateAccountNumber() {
        return Date.now().toString();
    }
    async findAll(page = 1, limit = 100) {
        const query = this.repo
            .createQueryBuilder("account")
            .leftJoinAndSelect("account.user", "user")
            .orderBy("user.name", "ASC") // 👈 ordenar por el nombre del usuario
            .skip((page - 1) * limit)
            .take(limit);
        const [accounts, total] = await query.getManyAndCount();
        return {
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            hasMore: page < Math.ceil(total / limit),
            results: accounts,
        };
    }
    async findOne(id) {
        const account = await this.repo.findOne({
            where: { id },
            relations: ["user", "transacciones", "prestamos"],
        });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        return account;
    }
    async findByAccountNumber(numeroCuenta) {
        return await this.repo.findOne({
            where: { numeroCuenta },
            relations: ["user"],
        });
    }
    async findByUserId(userId) {
        const user = await this.userRepo.findOne({ where: { _id: userId } });
        if (!user) {
            throw new error_middleware_1.AppError("Usuario no encontrado", 404);
        }
        const accounts = await this.repo.find({
            where: { usuarioId: userId },
            relations: ["user"],
        });
        return {
            page: 1,
            totalPages: 1,
            totalItems: accounts.length,
            hasMore: false,
            results: accounts,
        };
    }
    async create(userId, dto) {
        const user = await this.userRepo.findOne({ where: { _id: userId } });
        if (!user) {
            throw new error_middleware_1.AppError("Usuario no encontrado", 404);
        }
        // validar saldo
        const saldoInicial = dto.saldo !== undefined ? Number(dto.saldo) : 0;
        if (isNaN(saldoInicial) || saldoInicial < 0) {
            throw new error_middleware_1.AppError("El saldo debe ser un número válido mayor o igual a 0", 400);
        }
        const account = this.repo.create({
            usuarioId: userId,
            numeroCuenta: this.generateAccountNumber(),
            tipoCuenta: dto.tipoCuenta,
            moneda: dto.moneda,
            saldo: saldoInicial,
            fechaCreacion: dto.fechaCreacion ?? new Date(), // si lo envías en dto
            estado: dto.estado ?? "activa",
        });
        return await this.repo.save(account);
    }
    async update(id, dto) {
        const account = await this.repo.findOne({ where: { id } });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        // Mezclamos los datos actuales con los nuevos
        this.repo.merge(account, dto);
        return await this.repo.save(account);
    }
    async remove(id) {
        const account = await this.repo.findOne({ where: { id } });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        await this.repo.remove(account);
        return true;
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map