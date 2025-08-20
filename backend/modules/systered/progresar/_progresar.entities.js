"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progresar_entities = void 0;
const Account_entity_1 = require("./entities/Account.entity");
const document_type_entity_1 = require("./entities/document-type.entity");
const Loan_entity_1 = require("./entities/Loan.entity");
const LoanInstallment_entity_1 = require("./entities/LoanInstallment.entity");
const Transaction_entity_1 = require("./entities/Transaction.entity");
const User_entity_1 = require("./entities/User.entity");
exports.progresar_entities = [
    Account_entity_1.AccountEntity,
    Loan_entity_1.LoanEntity,
    LoanInstallment_entity_1.LoanInstallmentEntity,
    Transaction_entity_1.TransactionEntity,
    User_entity_1.ProgresarUserEntity,
    document_type_entity_1.DocumentTypeEntity,
    //
];
//# sourceMappingURL=_progresar.entities.js.map