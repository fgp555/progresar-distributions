"use strict";
// src/modules/wardrobe/wardrobe.seeder.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedWardrobes = seedWardrobes;
const typeOrmConfig_1 = require("../../../config/typeOrmConfig");
const user_wardrobe_entity_1 = require("../../ivanagb/wardrobe-user/entities/user-wardrobe.entity");
const wardrobe_data_frank_json_1 = __importDefault(require("./wardrobe.data.frank.json"));
const wardrobe_data_ivana_json_1 = __importDefault(require("./wardrobe.data.ivana.json"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seedWardrobes() {
    const hashedPass = async (password) => await bcryptjs_1.default.hash(password, 10);
    const usersDemos = [
        {
            name: "Administrador 123",
            email: "admin@gmail.com",
            username: "admin123",
            role: "admin",
            password: await hashedPass("admin@gmail.com"),
            isPublic: false,
            wardrobes: [
                {
                    name: "Armario de verano",
                    slug: "armario-de-verano",
                    description: "Ropa ligera y fresca para el verano",
                },
            ],
        },
        {
            name: "Usuario 123",
            email: "user@gmail.com",
            username: "user123",
            role: "user",
            password: await hashedPass("user@gmail.com"),
            isPublic: false,
            wardrobes: [
                {
                    name: "Armario de verano",
                    slug: "armario-de-verano",
                    description: "Ropa ligera y fresca para el verano",
                },
                {
                    name: "Armario de invierno",
                    slug: "armario-de-invierno",
                    description: "Ropa ligera y fresca para el invierno",
                },
            ],
        },
    ];
    const userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_wardrobe_entity_1.WardrobeUserEntity);
    const exist = await userRepo.find();
    const dataWardrobe = [wardrobe_data_frank_json_1.default, wardrobe_data_ivana_json_1.default, ...usersDemos];
    if (exist.length === 0) {
        const user = userRepo.create(dataWardrobe);
        await userRepo.save(user);
        console.info(`🌱 Insertado ${dataWardrobe.length} Seeder de wardrobes completado.`);
    }
    else {
        console.info(`⚠️ seedWardrobes: Seed skipped.`);
    }
}
//# sourceMappingURL=wardrobe.seed.js.map