"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedShortenerMongoDB = void 0;
// src/seed/shortener/shortener.seed.ts
const shortener_data_json_1 = __importDefault(require("./shortener.data.json"));
const shortener_model_1 = __importDefault(require("../../../common/shortener/models/shortener.model")); // modelo mongoose
const seedShortenerMongoDB = async () => {
    const count = await shortener_model_1.default.countDocuments();
    if (count === 0) {
        await shortener_model_1.default.insertMany(shortener_data_json_1.default);
        console.info("🌱 seedShortenerMongoDB seed complete ✅");
    }
    else {
        console.info("ℹ️ seedShortenerMongoDB already has data. Seed skipped.");
    }
};
exports.seedShortenerMongoDB = seedShortenerMongoDB;
//# sourceMappingURL=shortener.seeder.mogodb.js.map