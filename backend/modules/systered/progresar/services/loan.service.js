"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const Loan_entity_1 = require("../entities/Loan.entity");
const LoanInstallment_entity_1 = require("../entities/LoanInstallment.entity");
const Account_entity_1 = require("../entities/Account.entity");
const Transaction_entity_1 = require("../entities/Transaction.entity");
const error_middleware_1 = require("../middleware/error.middleware");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
class LoanService {
    constructor() {
        this.repo = typeOrmConfig_1.AppDataSource.getRepository(Loan_entity_1.LoanEntity);
        this.installmentRepo = typeOrmConfig_1.AppDataSource.getRepository(LoanInstallment_entity_1.LoanInstallmentEntity);
        this.accountRepo = typeOrmConfig_1.AppDataSource.getRepository(Account_entity_1.AccountEntity);
        this.transactionRepo = typeOrmConfig_1.AppDataSource.getRepository(Transaction_entity_1.TransactionEntity);
    }
    calculateLoanInstallments(montoPrincipal, numeroCuotas) {
        const tasaInteres = 0.015; // 1.5% por cuota
        const montoConInteres = montoPrincipal * (1 + tasaInteres * numeroCuotas);
        const montoCuota = montoConInteres / numeroCuotas;
        return {
            montoCuota: parseFloat(montoCuota.toFixed(2)),
            montoTotal: parseFloat(montoConInteres.toFixed(2)),
            interesTotal: parseFloat((montoConInteres - montoPrincipal).toFixed(2)),
        };
    }
    calculateRiskScore(account, recentTransactions, requestedAmount, installmentAmount) {
        let score = 50; // Base score
        // Factor 1: Account balance
        if (Number(account.saldo) > requestedAmount * 2)
            score += 20;
        else if (Number(account.saldo) > requestedAmount)
            score += 10;
        // Factor 2: Transaction activity
        if (recentTransactions.length >= 5)
            score += 15;
        else if (recentTransactions.length >= 3)
            score += 10;
        else if (recentTransactions.length >= 1)
            score += 5;
        // Factor 3: Payment capacity ratio
        const paymentRatio = (installmentAmount / Number(account.saldo)) * 100;
        if (paymentRatio < 30)
            score += 15;
        else if (paymentRatio < 50)
            score += 10;
        else if (paymentRatio < 70)
            score += 5;
        return Math.min(100, Math.max(0, score));
    }
    async calculateLoan(dto) {
        if (dto.monto <= 0) {
            throw new error_middleware_1.AppError("El monto debe ser mayor a 0", 400);
        }
        // if (dto.numeroCuotas < 1 || dto.numeroCuotas > 6) {
        //   throw new AppError("El número de cuotas debe ser entre 1 y 6", 400);
        // }
        const calculation = this.calculateLoanInstallments(dto.monto, dto.numeroCuotas);
        return {
            montoPrincipal: dto.monto,
            numeroCuotas: dto.numeroCuotas,
            montoCuota: calculation.montoCuota,
            montoTotal: calculation.montoTotal,
            interesTotal: calculation.interesTotal,
            tasaInteres: "1.5% por cuota",
        };
    }
    async create(accountId, dto) {
        const account = await this.accountRepo.findOne({
            where: { id: accountId },
            relations: ["transacciones"],
        });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        if (dto.monto <= 0) {
            throw new error_middleware_1.AppError("El monto debe ser mayor a 0", 400);
        }
        // Verificar préstamos activos
        const activeLoan = await this.repo.findOne({
            where: { cuentaId: accountId, estado: Loan_entity_1.LoanStatus.ACTIVO },
        });
        if (activeLoan) {
            throw new error_middleware_1.AppError("Ya tiene un préstamo activo. Debe completar el pago antes de solicitar otro.", 400);
        }
        const calculation = this.calculateLoanInstallments(dto.monto, dto.numeroCuotas);
        const capacidadPago = Number(account.saldo) * 0.7;
        // Verificar actividad reciente
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const recentTransactions = account.transacciones?.filter((t) => new Date(t.fecha) > thirtyDaysAgo) || [];
        const scoreRiesgo = this.calculateRiskScore(account, recentTransactions, dto.monto, calculation.montoCuota);
        // Crear préstamo
        const loan = this.repo.create({
            cuentaId: accountId,
            montoPrincipal: dto.monto,
            numeroCuotas: dto.numeroCuotas,
            montoCuota: calculation.montoCuota,
            montoTotal: calculation.montoTotal,
            interesTotal: calculation.interesTotal,
            cuotasPagadas: 0,
            fechaCreacion: dto.fechaCreacion ? new Date(dto.fechaCreacion) : new Date(), // 👈 usar body
            fechaVencimiento: new Date(Date.now() + dto.numeroCuotas * 30 * 24 * 60 * 60 * 1000),
            estado: Loan_entity_1.LoanStatus.ACTIVO,
            descripcion: dto.descripcion || "Préstamo personal",
            scoreAprobacion: scoreRiesgo,
            ratioCapacidadPago: ((calculation.montoCuota / Number(account.saldo)) * 100).toFixed(1),
        });
        const savedLoan = await this.repo.save(loan);
        // Generar cronograma de cuotas
        const installments = [];
        for (let i = 1; i <= dto.numeroCuotas; i++) {
            const fechaVencimiento = new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000);
            const installment = this.installmentRepo.create({
                prestamoId: savedLoan.id,
                numeroCuota: i,
                monto: calculation.montoCuota,
                fechaVencimiento,
                estado: LoanInstallment_entity_1.InstallmentStatus.PENDIENTE,
            });
            installments.push(installment);
        }
        const savedInstallments = await this.installmentRepo.save(installments);
        // Depositar monto en cuenta
        const saldoAnterior = Number(account.saldo);
        account.saldo = Number(account.saldo) - dto.monto;
        const transaction = this.transactionRepo.create({
            cuentaId: accountId,
            prestamoId: savedLoan.id,
            tipo: Transaction_entity_1.TransactionType.PRESTAMO_DESEMBOLSO,
            monto: -dto.monto,
            descripcion: `Desembolso de préstamo - ${dto.numeroCuotas} cuotas (Score: ${scoreRiesgo})`,
            saldoAnterior,
            saldoNuevo: Number(account.saldo),
        });
        await this.accountRepo.save(account);
        const savedTransaction = await this.transactionRepo.save(transaction);
        return {
            prestamo: savedLoan,
            cronogramaCuotas: savedInstallments,
            transaccion: savedTransaction,
            saldoActual: account.saldo,
            evaluacionCredito: {
                scoreAprobacion: scoreRiesgo,
                capacidadPago: capacidadPago,
                ratioUtilizado: savedLoan.ratioCapacidadPago + "%",
            },
        };
    }
    async payInstallment(loanId, dto) {
        const loan = await this.repo.findOne({
            where: { id: loanId },
            relations: ["account", "cuotas"],
        });
        if (!loan) {
            throw new error_middleware_1.AppError("Préstamo no encontrado", 404);
        }
        if (loan.estado !== Loan_entity_1.LoanStatus.ACTIVO) {
            throw new error_middleware_1.AppError("El préstamo no está activo", 400);
        }
        const numeroCuotas = dto.numeroCuotas || 1;
        // if (numeroCuotas < 1 || numeroCuotas > 6) {
        //   throw new AppError("El número de cuotas debe ser entre 1 y 6", 400);
        // }
        const pendingInstallments = loan.cuotas
            .filter((c) => c.estado === LoanInstallment_entity_1.InstallmentStatus.PENDIENTE)
            .sort((a, b) => a.numeroCuota - b.numeroCuota);
        if (pendingInstallments.length === 0) {
            throw new error_middleware_1.AppError("No hay cuotas pendientes para este préstamo", 400);
        }
        const installmentsToPay = Math.min(numeroCuotas, pendingInstallments.length);
        const selectedInstallments = pendingInstallments.slice(0, installmentsToPay);
        const totalAmount = selectedInstallments.reduce((total, installment) => total + Number(installment.monto), 0);
        const saldoAnterior = Number(loan.account.saldo);
        loan.account.saldo = Number(loan.account.saldo) + totalAmount;
        const paidInstallments = [];
        const transactions = [];
        for (const installment of selectedInstallments) {
            installment.estado = LoanInstallment_entity_1.InstallmentStatus.PAGADA;
            installment.fechaPago = dto.fechaPago ? new Date(dto.fechaPago) : new Date(); // 👈 usar body
            paidInstallments.push(installment);
            loan.cuotasPagadas += 1;
            const transaction = this.transactionRepo.create({
                cuentaId: loan.cuentaId,
                prestamoId: loan.id,
                cuotaId: installment.id,
                tipo: Transaction_entity_1.TransactionType.PRESTAMO_PAGO_CUOTA,
                monto: Number(installment.monto),
                descripcion: `Pago cuota ${installment.numeroCuota}/${loan.numeroCuotas} - Préstamo`,
                saldoAnterior: saldoAnterior - transactions.length * Number(installment.monto),
                saldoNuevo: saldoAnterior - (transactions.length + 1) * Number(installment.monto),
                fecha: dto.fechaPago ? new Date(dto.fechaPago) : new Date(), // 👈 registrar también en transacción
            });
            transactions.push(transaction);
        }
        if (installmentsToPay > 1) {
            const summaryTransaction = this.transactionRepo.create({
                cuentaId: loan.cuentaId,
                prestamoId: loan.id,
                tipo: Transaction_entity_1.TransactionType.PRESTAMO_PAGO_MULTIPLE,
                monto: totalAmount,
                descripcion: `Pago de ${installmentsToPay} cuotas - Préstamo (Cuotas ${selectedInstallments[0].numeroCuota}-${selectedInstallments[selectedInstallments.length - 1].numeroCuota})`,
                saldoAnterior,
                saldoNuevo: Number(loan.account.saldo),
            });
            transactions.push(summaryTransaction);
        }
        if (loan.cuotasPagadas === loan.numeroCuotas) {
            loan.estado = Loan_entity_1.LoanStatus.COMPLETADO;
            loan.fechaCompletado = new Date();
        }
        await this.accountRepo.save(loan.account);
        await this.installmentRepo.save(selectedInstallments);
        await this.repo.save(loan);
        await this.transactionRepo.save(transactions);
        const remainingInstallments = loan.numeroCuotas - loan.cuotasPagadas;
        return {
            prestamo: loan,
            cuotasPagadas: paidInstallments,
            cuotasRestantes: remainingInstallments,
            montoTotalPagado: totalAmount,
            transacciones: transactions,
            saldoActual: loan.account.saldo,
            prestamoCompletado: loan.estado === Loan_entity_1.LoanStatus.COMPLETADO,
        };
    }
    async findByAccountId(accountId) {
        const account = await this.accountRepo.findOne({ where: { id: accountId } });
        if (!account) {
            throw new error_middleware_1.AppError("Cuenta no encontrada", 404);
        }
        const loans = await this.repo.find({
            where: { cuentaId: accountId },
            relations: ["cuotas", "account" /* "account.user" */],
            order: {
                cuotas: {
                    numeroCuota: "ASC",
                },
            },
        });
        return {
            page: 1,
            totalPages: 1,
            totalItems: loans.length,
            hasMore: false,
            results: loans,
        };
    }
    async findAll() {
        const loans = await this.repo.find({
            relations: ["account", "account.user", "cuotas"],
        });
        return {
            page: 1,
            totalPages: 1,
            totalItems: loans.length,
            hasMore: false,
            results: loans,
        };
    }
    async getTotalesPrestamosActivos() {
        const loans = await this.repo.find({
            where: { estado: Loan_entity_1.LoanStatus.ACTIVO },
            select: ["montoPrincipal", "interesTotal", "montoCuota", "cuotasPagadas", "numeroCuotas"],
        });
        let totalPrestamos = 0;
        let totalIntereses = 0;
        let totalPagadoIntereses = 0;
        for (const loan of loans) {
            totalPrestamos += Number(loan.montoPrincipal);
            totalIntereses += Number(loan.interesTotal);
            // interés por cuota (proporcional)
            const interesPorCuota = Number(loan.interesTotal) / Number(loan.numeroCuotas);
            // interés pagado hasta ahora
            totalPagadoIntereses += interesPorCuota * loan.cuotasPagadas;
        }
        return {
            totalPrestamosActivos: totalPrestamos,
            totalInteresesActivos: totalIntereses,
            totalPagadoIntereses,
        };
    }
}
exports.LoanService = LoanService;
//# sourceMappingURL=loan.service.js.map