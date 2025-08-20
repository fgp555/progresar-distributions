"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProgresar = seedProgresar;
exports.seedDocumentTypes = seedDocumentTypes;
require("dotenv/config");
const Account_entity_1 = require("../entities/Account.entity");
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const document_type_entity_1 = require("../entities/document-type.entity");
const User_entity_1 = require("../entities/User.entity");
const roles_enum_1 = require("../../../../auth/enum/roles.enum");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashedPass = async (password) => await bcryptjs_1.default.hash(password, 10);
async function seedProgresar() {
    try {
        const userRepo = typeOrmConfig_1.AppDataSource.getRepository(User_entity_1.ProgresarUserEntity);
        const accountRepo = typeOrmConfig_1.AppDataSource.getRepository(Account_entity_1.AccountEntity);
        const documentTypeRepo = typeOrmConfig_1.AppDataSource.getRepository(document_type_entity_1.DocumentTypeEntity);
        console.log("🌱 Starting database seeding...");
        // Asegurar que los tipos de documento existan
        let documentTypes = await documentTypeRepo.find();
        if (documentTypes.length === 0) {
            console.log("📄 No document types found, seeding them first...");
            await seedDocumentTypes();
            documentTypes = await documentTypeRepo.find();
        }
        const SUPER_ADMIN_MAIL_SEED = process.env.SUPER_ADMIN_MAIL_SEED || "soporte@systered.com";
        const SUPER_ADMIN_PASS_SEED = process.env.SUPER_ADMIN_PASS_SEED || "admin123";
        // IDs estáticos - útiles para testing y referencias consistentes
        const staticUserIds = [
            "07a6227c-ce24-455a-99d4-89d934b54dc5", // DAVID - Admin
            "34e43cb1-30ff-4072-8084-4c564099f2a0", // ALIRIO
            "add62185-a7f1-4794-b4e4-2a813ca93342", // AUGUSTO
            "eabdb08b-9368-4371-a248-203f98b11efd", // BRAYAN IDARRAGA
            "47de9800-396c-4376-9d58-57d11c8e956b", // CAROLINA
            "0eef54ef-00a2-4a7b-a09b-ee279419203a", // CESAR
            "0fb32eb3-a16f-4de4-a60d-6ce4f3797259", // DIEGO CONTRERAS
            "7aa336c0-0809-4fd5-ae51-e542003bea52", // DIEGO TORRES
            "ff1d5dfb-d3c3-43f8-a619-abafe7d373a5", // ELOINA
            "9fa7ae03-bda3-467a-9853-03bf196688f4", // JESSICA
            "af1b7e56-0dca-4608-9578-0adb16126f0e", // MARIA
            "22a850c9-1a37-4683-8c75-7ee5bd74ea51", // PEDRO
            "9aa02019-d291-477d-b2db-73bfd441dbd3", // SANDRA
            "1963d5bb-252e-4e86-8947-5af99667a2a3", // STELLA
        ];
        const staticAccountIds = [
            "e04652ec-24ab-44bf-b8d7-ddeb7f985203", // Cuenta 1001 - DAVID
            "b25a7e04-25ee-4b65-b073-08b76c46775a", // Cuenta 1002 - ALIRIO
            "c3e47e50-16c7-4990-9c35-ac5011b260a0", // Cuenta 1003 - AUGUSTO
            "880c1200-66be-47e0-879c-8f139cfffb21", // Cuenta 1004 - BRAYAN I.
            "72017a4a-854d-48c2-b697-2a6f3de0970c", // Cuenta 1006 - CAROLINA
            "b0c24f59-299f-481f-be50-ccc43d0ce660", // Cuenta 1007 - CESAR
            "d0fc36f9-c6b4-4eaf-814c-6873a3e73e8e", // Cuenta 1008 - DIEGO C.
            "bb8242e6-fe92-4f2d-96bc-dd200d374d87", // Cuenta 1009 - DIEGO T.
            "ad44c600-56b4-4977-8184-74ef53c67925", // Cuenta 1010 - ELOINA
            "6678ca64-6efb-4b7a-ae4e-d727cbd4e643", // Cuenta 1011 - JESSICA
            "076bdbf1-f24e-4f01-b14b-8dfd35578392", // Cuenta 1012 - MARIA
            "4778d645-cc62-41a3-a80f-87da395448f7", // Cuenta 1013 - PEDRO
            "0775db4b-ee3f-4d15-843d-9da7d043fb05", // Cuenta 1014 - SANDRA
            "2545c818-414a-4488-ab42-a1147d15b705", // Cuenta 1015 - STELLA
        ];
        // Datos de usuarios con IDs estáticos (sin BRAYAN MORENO)
        const userData = [
            {
                _id: staticUserIds[0],
                nombre: "DAVID",
                apellido: "LOPEZ PEREZ",
                saldo: 500000,
                email: SUPER_ADMIN_MAIL_SEED,
                password: SUPER_ADMIN_PASS_SEED,
                documentType: "CC",
                documentNumber: "1012345678",
                username: "user1",
            },
            {
                _id: staticUserIds[1],
                nombre: "ALIRIO",
                apellido: "MANRIQUE TORRES",
                saldo: 500000,
                email: "usuario2@gmail.com",
                documentType: "CC",
                documentNumber: "1023456789",
                username: "user2",
            },
            {
                _id: staticUserIds[2],
                nombre: "AUGUSTO",
                apellido: "CONTRERAS RUIZ",
                saldo: 500000 * 2,
                email: "usuario3@gmail.com",
                documentType: "CC",
                documentNumber: "1034567890",
                cupos: 2,
                username: "user3",
            },
            {
                _id: staticUserIds[3],
                nombre: "BRAYAN",
                apellido: "IDARRAGA MARTINEZ",
                saldo: 500000,
                email: "usuario4@gmail.com",
                documentType: "CC",
                documentNumber: "1045678901",
                username: "user4",
            },
            {
                _id: staticUserIds[4], // Ahora es índice 4 (antes era 5 - CAROLINA)
                nombre: "CAROLINA",
                apellido: "REATIGA FERNANDEZ",
                saldo: 500000,
                email: "usuario6@gmail.com",
                documentType: "CC",
                documentNumber: "1067890123",
                username: "user6",
            },
            {
                _id: staticUserIds[5], // Ahora es índice 5 (antes era 6 - CESAR)
                nombre: "CESAR",
                apellido: "MANRIQUE MORALES",
                saldo: 500000 * 2,
                email: "usuario7@gmail.com",
                documentType: "CC",
                documentNumber: "1078901234",
                cupos: 2,
                username: "user7",
            },
            {
                _id: staticUserIds[6], // Ahora es índice 6 (antes era 7 - DIEGO C.)
                nombre: "DIEGO",
                apellido: "CONTRERAS VARGAS",
                saldo: 500000,
                email: "usuario8@gmail.com",
                documentType: "CC",
                documentNumber: "1089012345",
                username: "user8",
            },
            {
                _id: staticUserIds[7], // Ahora es índice 7 (antes era 8 - DIEGO T.)
                nombre: "DIEGO",
                apellido: "TORRES HERNANDEZ",
                saldo: 500000,
                email: "usuario9@gmail.com",
                documentType: "CC",
                documentNumber: "1090123456",
                username: "user9",
            },
            {
                _id: staticUserIds[8], // Ahora es índice 8 (antes era 9 - ELOINA)
                nombre: "ELOINA",
                apellido: "MANRIQUE SILVA",
                saldo: 500000,
                email: "usuario10@gmail.com",
                documentType: "CC",
                documentNumber: "1101234567",
                username: "user10",
            },
            {
                _id: staticUserIds[9], // Ahora es índice 9 (antes era 10 - JESSICA)
                nombre: "JESSICA",
                apellido: "PLATA RAMIREZ",
                saldo: 500000 * 2,
                email: "usuario11@gmail.com",
                documentType: "CC",
                documentNumber: "1112345678",
                cupos: 2,
                username: "user11",
            },
            {
                _id: staticUserIds[10], // Ahora es índice 10 (antes era 11 - MARIA)
                nombre: "MARIA",
                apellido: "VARGAS GONZALEZ",
                saldo: 500000,
                email: "usuario12@gmail.com",
                documentType: "CC",
                documentNumber: "1123456789",
                username: "user12",
            },
            {
                _id: staticUserIds[11], // Ahora es índice 11 (antes era 12 - PEDRO)
                nombre: "PEDRO",
                apellido: "CONTRERAS LOPEZ",
                saldo: 500000 * 2,
                email: "usuario13@gmail.com",
                documentType: "CC",
                documentNumber: "1134567890",
                cupos: 2,
                username: "user13",
            },
            {
                _id: staticUserIds[12], // Ahora es índice 12 (antes era 13 - SANDRA)
                nombre: "SANDRA",
                apellido: "MORENO GARCIA",
                saldo: 500000 * 2,
                email: "usuario14@gmail.com",
                documentType: "CC",
                documentNumber: "1145678901",
                cupos: 2,
                username: "user14",
            },
            {
                _id: staticUserIds[13], // Ahora es índice 13 (antes era 14 - STELLA)
                nombre: "STELLA",
                apellido: "AMAYA JIMENEZ",
                saldo: 500000,
                email: "usuario15@gmail.com",
                documentType: "CC",
                documentNumber: "1156789012",
                username: "user15",
            },
        ];
        // Crear usuarios con IDs estáticos
        const users = await Promise.all(userData.map(async (userData) => {
            // Buscar el tipo de documento correspondiente
            const documentType = documentTypes.find((dt) => dt.code === userData.documentType);
            return {
                _id: userData._id, // ID estático
                username: userData.username,
                name: userData.nombre,
                lastName: userData.apellido,
                email: userData.email,
                whatsapp: `+57-300-1000${userData.username.replace("user", "").padStart(3, "0")}`,
                password: await hashedPass(userData.password || userData.email),
                role: userData.username === "user1" ? roles_enum_1.UserRoleEnum.ADMIN : roles_enum_1.UserRoleEnum.USER,
                documentType: documentType || null,
                documentNumber: userData.documentNumber,
                cupos: userData.cupos || 1,
            };
        }));
        // Usar upsert para evitar duplicados en re-ejecuciones
        const savedUsers = [];
        for (const user of users) {
            const existingUser = await userRepo.findOne({ where: { _id: user._id } });
            if (!existingUser) {
                const savedUser = await userRepo.save(user);
                savedUsers.push(savedUser);
                console.log(`✅ Created user: ${user.name} ${user.lastName} (${user._id})`);
            }
            else {
                savedUsers.push(existingUser);
                console.log(`ℹ️ User already exists: ${user.name} ${user.lastName} (${user._id})`);
            }
        }
        // Datos de cuentas con IDs estáticos (sin cuenta 1005 de BRAYAN MORENO)
        const cuentasData = [
            { userId: staticUserIds[0], accountId: staticAccountIds[0], numeroCuenta: "1001" },
            { userId: staticUserIds[1], accountId: staticAccountIds[1], numeroCuenta: "1002" },
            { userId: staticUserIds[2], accountId: staticAccountIds[2], numeroCuenta: "1003" },
            { userId: staticUserIds[3], accountId: staticAccountIds[3], numeroCuenta: "1004" },
            { userId: staticUserIds[4], accountId: staticAccountIds[4], numeroCuenta: "1006" }, // CAROLINA
            { userId: staticUserIds[5], accountId: staticAccountIds[5], numeroCuenta: "1007" }, // CESAR
            { userId: staticUserIds[6], accountId: staticAccountIds[6], numeroCuenta: "1008" }, // DIEGO C.
            { userId: staticUserIds[7], accountId: staticAccountIds[7], numeroCuenta: "1009" }, // DIEGO T.
            { userId: staticUserIds[8], accountId: staticAccountIds[8], numeroCuenta: "1010" }, // ELOINA
            { userId: staticUserIds[9], accountId: staticAccountIds[9], numeroCuenta: "1011" }, // JESSICA
            { userId: staticUserIds[10], accountId: staticAccountIds[10], numeroCuenta: "1012" }, // MARIA
            { userId: staticUserIds[11], accountId: staticAccountIds[11], numeroCuenta: "1013" }, // PEDRO
            { userId: staticUserIds[12], accountId: staticAccountIds[12], numeroCuenta: "1014" }, // SANDRA
            { userId: staticUserIds[13], accountId: staticAccountIds[13], numeroCuenta: "1015" }, // STELLA
        ];
        const accounts = cuentasData
            .map((cuenta, index) => {
            const user = savedUsers.find((u) => u._id === cuenta.userId);
            const userDataInfo = userData[index];
            if (!user) {
                console.warn(`⚠️ No se encontró usuario para la cuenta ${cuenta.numeroCuenta}`);
                return null;
            }
            return {
                id: cuenta.accountId, // ID estático
                usuarioId: user._id,
                numeroCuenta: cuenta.numeroCuenta,
                tipoCuenta: Account_entity_1.AccountType.AHORRO,
                saldo: userDataInfo?.saldo || 500000,
                moneda: Account_entity_1.Currency.COP,
            };
        })
            .filter(Boolean);
        // Usar upsert para cuentas también
        const savedAccounts = [];
        for (const account of accounts) {
            const existingAccount = await accountRepo.findOne({ where: { id: account.id } });
            if (!existingAccount) {
                const savedAccount = await accountRepo.save(account);
                savedAccounts.push(savedAccount);
                const user = savedUsers.find((u) => u._id === account.usuarioId);
                const saldoFormatted = new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                }).format(account.saldo);
                console.log(`✅ Created account: ${user?.name} ${user?.lastName} - ${account.numeroCuenta} - ${saldoFormatted}`);
            }
            else {
                savedAccounts.push(existingAccount);
                console.log(`ℹ️ Account already exists: ${account.numeroCuenta} (${account.id})`);
            }
        }
        console.log("🎉 Database seeding completed successfully!");
        console.log(`📊 Summary:`);
        console.log(`   - ${savedUsers.length} users processed`);
        console.log(`   - ${savedAccounts.length} accounts processed`);
        return {
            users: savedUsers,
            accounts: savedAccounts,
        };
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    }
}
async function seedDocumentTypes() {
    const documentTypeRepo = typeOrmConfig_1.AppDataSource.getRepository(document_type_entity_1.DocumentTypeEntity);
    const documentTypes = [
        { id: 1, code: "CC", name: "Cédula de ciudadanía" },
        { id: 2, code: "RC", name: "Registro Civil" },
        // Otros tipos de documento...
    ];
    // Usar upsert para tipos de documento también
    for (const docType of documentTypes) {
        const existing = await documentTypeRepo.findOne({ where: { id: docType.id } });
        if (!existing) {
            await documentTypeRepo.save(docType);
            console.log(`✅ Created document type: ${docType.code} - ${docType.name}`);
        }
        else {
            console.log(`ℹ️ Document type already exists: ${docType.code}`);
        }
    }
}
//# sourceMappingURL=seedProgresar.js.map