"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
require("./common/database/database.cron");
const typeOrmConfig_1 = require("./config/typeOrmConfig");
const countBoot_1 = require("./utils/countBoot");
const envs_1 = require("./config/envs");
const socket_1 = require("./socket");
const mongoose_1 = require("./config/mongoose");
const seeder_1 = require("./config/seeder");
const startServer = async () => {
    try {
        // 🧠 Conectar MongoDB
        if (process.env.MONGO_URI)
            await (0, mongoose_1.connectMongo)();
        // 🧠 Inicializar base relacional (TypeORM)
        if (process.env.DB_DATABASE) {
            await typeOrmConfig_1.AppDataSource.initialize();
            console.info("📦 Data source initialized");
            await (0, countBoot_1.countBoot)();
            if (process.env.SEED_DATA === "true") {
                // 🌱 Ejecutar seeders ✅
                await (0, seeder_1.runSeeders)();
            }
        }
        socket_1.httpServer.listen(envs_1.PORT, () => {
            console.info(`🚀 Server running on http://localhost:${envs_1.PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Error al iniciar el servidor", err);
    }
};
startServer();
//# sourceMappingURL=main.js.map