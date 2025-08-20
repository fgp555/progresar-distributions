"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const loan_routes_1 = __importDefault(require("./routes/loan.routes"));
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const User_entity_1 = require("./entities/User.entity");
const Account_entity_1 = require("./entities/Account.entity");
const Transaction_entity_1 = require("./entities/Transaction.entity");
const Loan_entity_1 = require("./entities/Loan.entity");
const document_type_routes_1 = __importDefault(require("./routes/document-type.routes"));
const router = (0, express_1.Router)();
// Routes
router.use("/progresar/usuarios", user_routes_1.default);
router.use("/progresar/cuentas", account_routes_1.default);
router.use("/progresar/transacciones", transaction_routes_1.default);
router.use("/progresar/prestamos", loan_routes_1.default);
router.use("/progresar/document", document_type_routes_1.default);
// Health check
// router.get("/progresar/seed",
router.get("/progresar/health", async (req, res) => {
    console.log("🔍 Health check endpoint hit");
    try {
        const userRepo = typeOrmConfig_1.AppDataSource.getRepository(User_entity_1.ProgresarUserEntity);
        const accountRepo = typeOrmConfig_1.AppDataSource.getRepository(Account_entity_1.AccountEntity);
        const transactionRepo = typeOrmConfig_1.AppDataSource.getRepository(Transaction_entity_1.TransactionEntity);
        const loanRepo = typeOrmConfig_1.AppDataSource.getRepository(Loan_entity_1.LoanEntity);
        const [usuarios, cuentas, transacciones, prestamos] = await Promise.all([
            userRepo.count(),
            accountRepo.count(),
            transactionRepo.count(),
            loanRepo.count(),
        ]);
        const prestamosActivos = await loanRepo.count({
            where: { estado: Loan_entity_1.LoanStatus.ACTIVO },
        });
        res.json({
            success: true,
            message: "Sistema bancario funcionando correctamente",
            timestamp: new Date(),
            stats: {
                usuarios,
                cuentas,
                transacciones,
                prestamos,
                prestamosActivos,
            },
        });
    }
    catch (error) {
        console.error("❌ Error en health check", error);
        res.status(500).json({
            success: false,
            message: "Error en el sistema",
        });
    }
});
exports.default = router;
//# sourceMappingURL=_progresar.routes.js.map