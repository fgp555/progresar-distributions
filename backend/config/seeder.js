"use strict";
// src/config/seeder.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeders = void 0;
const switchModule_1 = require("../config/switchModule");
const typeOrmConfig_1 = require("./typeOrmConfig");
const runSeeders = async () => {
    if (!typeOrmConfig_1.AppDataSource.isInitialized) {
        await typeOrmConfig_1.AppDataSource.initialize();
    }
    // 🌱 Seeds específicos
    await (0, switchModule_1.runSeedsByMode)();
    return { message: "Seeders executed successfully" };
};
exports.runSeeders = runSeeders;
//# sourceMappingURL=seeder.js.map