"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUserMongoDB = exports.seedUserSQL = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const user_entity_1 = require("../entities/user.entity");
const roles_enum_1 = require("../enum/roles.enum");
const user_model_1 = __importDefault(require("../models/user.model"));
const hashedPass = async (password) => await bcryptjs_1.default.hash(password, 10);
// Datos base
const getUsers = async () => {
    const baseUsers = [
        {
            name: "User Tester",
            username: "user",
            email: "user@gmail.com",
            password: await hashedPass("user@gmail.com"),
            role: roles_enum_1.UserRoleEnum.USER,
        },
        {
            name: "Admin Tester",
            email: "admin@gmail.com",
            username: "admin",
            password: await hashedPass("admin@gmail.com"),
            role: roles_enum_1.UserRoleEnum.ADMIN,
        },
    ];
    const emailAdmin = process.env.SUPER_ADMIN_MAIL_SEED;
    const passAdmin = process.env.SUPER_ADMIN_PASS_SEED;
    if (emailAdmin && passAdmin) {
        // console.info("🔑 Admin credentials found in environment variables");
        baseUsers.push({
            name: "SUPERADMIN",
            username: "superadmin",
            email: emailAdmin,
            password: await hashedPass(passAdmin),
            role: roles_enum_1.UserRoleEnum.SUPERADMIN,
            photo: "https://i.postimg.cc/GmddyvS1/icon-user.webp",
            sendMail: false,
            isVisible: true,
        });
    }
    return baseUsers;
};
// Seeder SQL
const seedUserSQL = async () => {
    try {
        const users = await getUsers();
        const userRepository = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.UserEntity);
        for (const user of users) {
            const exists = await userRepository.findOneBy({ email: user.email });
            if (!exists) {
                const newUser = userRepository.create(user);
                await userRepository.save(newUser);
            }
            else {
                console.info(`ℹ️ [SQL] Already exists: ${user.email}`);
            }
        }
        console.info("🌱 seedUserSQL seed complete ✅");
    }
    catch (error) {
        console.error("❌ [SQL] Error seeding users:", error);
    }
};
exports.seedUserSQL = seedUserSQL;
// Seeder MongoDB
const seedUserMongoDB = async () => {
    try {
        const users = await getUsers();
        for (const user of users) {
            const exists = await user_model_1.default.findOne({ email: user.email });
            if (!exists) {
                await user_model_1.default.create(user);
                console.info(`✅ [MongoDB] Seeded: ${user.email}`);
            }
            else {
                console.info(`ℹ️ [MongoDB] Already exists: ${user.email}`);
            }
        }
        console.info("🎉 [MongoDB] User seeding completed");
    }
    catch (error) {
        console.error("❌ [MongoDB] Error seeding users:", error);
    }
};
exports.seedUserMongoDB = seedUserMongoDB;
//# sourceMappingURL=user.seed.js.map