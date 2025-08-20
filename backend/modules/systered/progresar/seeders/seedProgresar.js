"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProgresar = seedProgresar;
require("dotenv/config");
const User_entity_1 = require("../entities/User.entity");
const Account_entity_1 = require("../entities/Account.entity");
const Transaction_entity_1 = require("../entities/Transaction.entity");
const Loan_entity_1 = require("../entities/Loan.entity");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roles_enum_1 = require("../../../../auth/enum/roles.enum");
const hashedPass = async (password) => await bcryptjs_1.default.hash(password, 10);
async function seedProgresar() {
    try {
        const userRepo = typeOrmConfig_1.AppDataSource.getRepository(User_entity_1.ProgresarUserEntity);
        const accountRepo = typeOrmConfig_1.AppDataSource.getRepository(Account_entity_1.AccountEntity);
        const transactionRepo = typeOrmConfig_1.AppDataSource.getRepository(Transaction_entity_1.TransactionEntity);
        const loanRepo = typeOrmConfig_1.AppDataSource.getRepository(Loan_entity_1.LoanEntity);
        console.log("🌱 Starting database seeding...");
        const SUPER_ADMIN_MAIL_SEED = process.env.SUPER_ADMIN_MAIL_SEED || "SUPER_ADMIN_MAIL_SEED";
        const SUPER_ADMIN_PASS_SEED = process.env.SUPER_ADMIN_PASS_SEED || "SUPER_ADMIN_PASS_SEED";
        // Clear existing data (optional - uncomment if needed)
        // await loanRepo.clear();
        // await transactionRepo.clear();
        // await accountRepo.clear();
        // await userRepo.clear();
        // Create users with real data - complete names with surnames
        const userData = [
            // { nombre: "Frank", apellido: "GP", saldo: 540000, email: "fgp555@gmail.com" },
            {
                nombre: "DAVID",
                apellido: "LOPEZ PEREZ",
                saldo: 540000,
                email: SUPER_ADMIN_MAIL_SEED,
                password: SUPER_ADMIN_PASS_SEED,
            },
            {
                nombre: "ALIRIO",
                apellido: "MANRIQUE TORRES",
                saldo: 540000,
                email: "usuario2@gmail.com",
            },
            {
                nombre: "AUGUSTO",
                apellido: "CONTRERAS RUIZ",
                saldo: 540000,
                email: "usuario3@gmail.com",
            },
            {
                nombre: "BRAYAN",
                apellido: "IDARRAGA MARTINEZ",
                saldo: 540000,
                email: "usuario4@gmail.com",
            },
            {
                nombre: "BRAYAN",
                apellido: "MORENO RODRIGUEZ",
                saldo: 540000,
                email: "usuario5@gmail.com",
            },
            {
                nombre: "CAROLINA",
                apellido: "REATIGA FERNANDEZ",
                saldo: 540000,
                email: "usuario6@gmail.com",
            },
            {
                nombre: "CESAR",
                apellido: "MANRIQUE MORALES",
                saldo: 540000,
                email: "usuario7@gmail.com",
            },
            {
                nombre: "DIEGO",
                apellido: "CONTRERAS VARGAS",
                saldo: 540000,
                email: "usuario8@gmail.com",
            },
            {
                nombre: "DIEGO",
                apellido: "TORRES HERNANDEZ",
                saldo: 540000,
                email: "usuario9@gmail.com",
            },
            {
                nombre: "ELOINA",
                apellido: "MANRIQUE SILVA",
                saldo: 540000,
                email: "usuario10@gmail.com",
            },
            {
                nombre: "JESSICA",
                apellido: "PLATA RAMIREZ",
                saldo: 540000,
                email: "usuario11@gmail.com",
            },
            {
                nombre: "MARIA",
                apellido: "VARGAS GONZALEZ",
                saldo: 540000,
                email: "usuario12@gmail.com",
            },
            {
                nombre: "PEDRO",
                apellido: "CONTRERAS LOPEZ",
                saldo: 540000,
                email: "usuario13@gmail.com",
            },
            {
                nombre: "SANDRA",
                apellido: "MORENO GARCIA",
                saldo: 540000,
                email: "usuario14@gmail.com",
            },
            {
                nombre: "STELLA",
                apellido: "AMAYA JIMENEZ",
                saldo: 540000,
                email: "usuario15@gmail.com",
            },
        ];
        // Generate unique users (remove duplicates based on full name)
        const uniqueUsers = userData.reduce((acc, current) => {
            const fullName = `${current.nombre} ${current.apellido}`;
            const existingUser = acc.find((user) => `${user.nombre} ${user.apellido}` === fullName);
            if (!existingUser) {
                acc.push(current);
            }
            return acc;
        }, []);
        // Create users with proper name structure
        const users = await Promise.all(uniqueUsers.map(async (userData, index) => {
            const _id = (0, uuid_1.v4)();
            return {
                _id, // 👈 usar _id
                username: `user${index + 1}`,
                name: userData.nombre,
                lastName: userData.apellido,
                email: userData.email,
                whatsapp: `+57-${String(300 + index).padStart(3, "0")}-${String(1000000 + index).slice(-6)}`,
                password: await hashedPass(userData.password || userData.email),
                role: index === 0 ? roles_enum_1.UserRoleEnum.ADMIN : roles_enum_1.UserRoleEnum.USER,
            };
        }));
        const savedUsers = await userRepo.save(users);
        console.log(`✅ Created ${savedUsers.length} users`);
        // Lista de cuentas con posibles duplicados
        const cuentasData = [
            { nombre: "ALIRIO", apellido: "MANRIQUE TORRES", numeroCuenta: "1001" },
            { nombre: "ELOINA", apellido: "MANRIQUE SILVA", numeroCuenta: "1002" },
            { nombre: "PEDRO", apellido: "CONTRERAS LOPEZ", numeroCuenta: "1003" },
            { nombre: "PEDRO", apellido: "CONTRERAS LOPEZ", numeroCuenta: "1004" }, // misma persona, otra cuenta
            { nombre: "AUGUSTO", apellido: "CONTRERAS RUIZ", numeroCuenta: "1005" },
            { nombre: "AUGUSTO", apellido: "CONTRERAS RUIZ", numeroCuenta: "1006" },
            { nombre: "SANDRA", apellido: "MORENO GARCIA", numeroCuenta: "1007" },
            { nombre: "SANDRA", apellido: "MORENO GARCIA", numeroCuenta: "1008" },
            { nombre: "BRAYAN", apellido: "IDARRAGA MARTINEZ", numeroCuenta: "1009" },
            { nombre: "BRAYAN", apellido: "MORENO RODRIGUEZ", numeroCuenta: "1010" },
            { nombre: "DIEGO", apellido: "TORRES HERNANDEZ", numeroCuenta: "1011" },
            { nombre: "CAROLINA", apellido: "REATIGA FERNANDEZ", numeroCuenta: "1012" },
            { nombre: "MARIA", apellido: "VARGAS GONZALEZ", numeroCuenta: "1013" },
            { nombre: "STELLA", apellido: "AMAYA JIMENEZ", numeroCuenta: "1014" },
            { nombre: "DAVID", apellido: "LOPEZ PEREZ", numeroCuenta: "1015" },
            { nombre: "JESSICA", apellido: "PLATA RAMIREZ", numeroCuenta: "1016" },
            { nombre: "JESSICA", apellido: "PLATA RAMIREZ", numeroCuenta: "1017" },
            { nombre: "CESAR", apellido: "MANRIQUE MORALES", numeroCuenta: "1018" },
            { nombre: "CESAR", apellido: "MANRIQUE MORALES", numeroCuenta: "1019" },
            { nombre: "DIEGO", apellido: "CONTRERAS VARGAS", numeroCuenta: "1020" },
        ];
        // Generar cuentas y asignarlas al usuario correspondiente
        const accounts = cuentasData
            .map((cuenta) => {
            const user = savedUsers.find((u) => u.name.toUpperCase() === cuenta.nombre && u.lastName.toUpperCase().includes(cuenta.apellido.split(" ")[0]));
            if (!user) {
                console.warn(`⚠️ No se encontró usuario para la cuenta ${cuenta.numeroCuenta}`);
                return null;
            }
            return {
                id: (0, uuid_1.v4)(),
                usuarioId: user._id,
                numeroCuenta: cuenta.numeroCuenta,
                tipoCuenta: Account_entity_1.AccountType.AHORRO,
                saldo: 540000,
                moneda: Account_entity_1.Currency.USD,
            };
        })
            .filter(Boolean);
        const savedAccounts = await accountRepo.save(accounts);
        console.log(`✅ Created ${savedAccounts.length} accounts (algunos usuarios tienen varias)`);
        // Create initial deposit transactions
        const transactions = [];
        savedAccounts.forEach((account, index) => {
            // Initial deposit transaction
            transactions.push({
                id: (0, uuid_1.v4)(),
                cuentaId: account.id,
                tipo: Transaction_entity_1.TransactionType.DEPOSITO,
                monto: account.saldo,
                descripcion: "Depósito inicial de capital",
                saldoAnterior: 0,
                saldoNuevo: account.saldo,
            });
            // Add some random transactions for variety
            if (index % 2 === 0) {
                const withdrawAmount = Math.floor(account.saldo * 0.1); // 10% withdrawal
                transactions.push({
                    id: (0, uuid_1.v4)(),
                    cuentaId: account.id,
                    tipo: Transaction_entity_1.TransactionType.RETIRO,
                    monto: withdrawAmount,
                    descripcion: "Retiro en cajero automático",
                    saldoAnterior: account.saldo,
                    saldoNuevo: account.saldo - withdrawAmount,
                });
            }
        });
        // Add some transfer transactions between accounts
        for (let i = 0; i < Math.min(5, savedAccounts.length - 1); i++) {
            const sourceAccount = savedAccounts[i];
            const targetAccount = savedAccounts[i + 1];
            const transferAmount = 50000; // Fixed transfer amount
            // Transfer out
            transactions.push({
                id: (0, uuid_1.v4)(),
                cuentaId: sourceAccount.id,
                cuentaDestinoId: targetAccount.id,
                tipo: Transaction_entity_1.TransactionType.TRANSFERENCIA_SALIDA,
                monto: transferAmount,
                descripcion: `Transferencia a ${targetAccount.numeroCuenta}`,
                saldoAnterior: sourceAccount.saldo,
                saldoNuevo: sourceAccount.saldo - transferAmount,
            });
            // Transfer in
            transactions.push({
                id: (0, uuid_1.v4)(),
                cuentaId: targetAccount.id,
                cuentaOrigenId: sourceAccount.id,
                tipo: Transaction_entity_1.TransactionType.TRANSFERENCIA_ENTRADA,
                monto: transferAmount,
                descripcion: `Transferencia desde ${sourceAccount.numeroCuenta}`,
                saldoAnterior: targetAccount.saldo,
                saldoNuevo: targetAccount.saldo + transferAmount,
            });
        }
        const savedTransactions = await transactionRepo.save(transactions);
        console.log(`✅ Created ${savedTransactions.length} transactions`);
        // Create some sample loans
        const loans = [];
        const loanAmounts = [100000, 150000, 200000, 250000, 300000];
        const loanTerms = [6, 12, 18, 24];
        // Create loans for first 8 accounts
        for (let i = 0; i < Math.min(8, savedAccounts.length); i++) {
            const account = savedAccounts[i];
            const loanAmount = loanAmounts[i % loanAmounts.length];
            const numeroCuotas = loanTerms[i % loanTerms.length];
            // Simple interest calculation (monthly rate of 2.5%)
            const monthlyRate = 0.025;
            const montoCuota = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numeroCuotas)) /
                (Math.pow(1 + monthlyRate, numeroCuotas) - 1));
            const montoTotal = montoCuota * numeroCuotas;
            const interesTotal = montoTotal - loanAmount;
            loans.push({
                id: (0, uuid_1.v4)(),
                cuentaId: account.id,
                montoPrincipal: loanAmount,
                numeroCuotas: numeroCuotas,
                montoCuota: montoCuota,
                montoTotal: montoTotal,
                interesTotal: interesTotal,
                cuotasPagadas: Math.floor(Math.random() * (numeroCuotas / 2)), // Random payments made
                estado: i < 6 ? Loan_entity_1.LoanStatus.ACTIVO : Loan_entity_1.LoanStatus.COMPLETADO,
                descripcion: `Préstamo para ${i % 2 === 0 ? "mejoras del hogar" : "capital de trabajo"}`,
                scoreAprobacion: Math.floor(Math.random() * 30) + 70, // Score between 70-100
                ratioCapacidadPago: `${(Math.random() * 0.2 + 0.15).toFixed(2)}`, // Ratio between 0.15-0.35
            });
        }
        const savedLoans = await loanRepo.save(loans);
        console.log(`✅ Created ${savedLoans.length} loans`);
        // Create loan disbursement transactions
        const loanTransactions = [];
        savedLoans.forEach((loan) => {
            const account = savedAccounts.find((acc) => acc.id === loan.cuentaId);
            if (account) {
                loanTransactions.push({
                    id: (0, uuid_1.v4)(),
                    cuentaId: loan.cuentaId,
                    prestamoId: loan.id,
                    tipo: Transaction_entity_1.TransactionType.PRESTAMO_DESEMBOLSO,
                    monto: loan.montoPrincipal,
                    descripcion: `Desembolso de préstamo #${loan.id.slice(-8)}`,
                    saldoAnterior: account.saldo,
                    saldoNuevo: account.saldo + loan.montoPrincipal,
                });
                // Add some payment transactions for paid installments
                for (let i = 0; i < loan.cuotasPagadas; i++) {
                    loanTransactions.push({
                        id: (0, uuid_1.v4)(),
                        cuentaId: loan.cuentaId,
                        prestamoId: loan.id,
                        tipo: Transaction_entity_1.TransactionType.PRESTAMO_PAGO_CUOTA,
                        monto: loan.montoCuota,
                        descripcion: `Pago cuota ${i + 1} - Préstamo #${loan.id.slice(-8)}`,
                        saldoAnterior: account.saldo,
                        saldoNuevo: account.saldo - loan.montoCuota,
                    });
                }
            }
        });
        const savedLoanTransactions = await transactionRepo.save(loanTransactions);
        console.log(`✅ Created ${savedLoanTransactions.length} loan transactions`);
        console.log("🎉 Database seeding completed successfully!");
        console.log(`📊 Summary:`);
        console.log(`   - ${savedUsers.length} users created`);
        console.log(`   - ${savedAccounts.length} accounts created`);
        console.log(`   - ${savedTransactions.length + savedLoanTransactions.length} transactions created`);
        console.log(`   - ${savedLoans.length} loans created`);
        return {
            users: savedUsers,
            accounts: savedAccounts,
            transactions: [...savedTransactions, ...savedLoanTransactions],
            loans: savedLoans,
        };
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    }
}
//# sourceMappingURL=seedProgresar.js.map