"use strict";
// src/config/mongoose.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envs_1 = require("./envs");
const connectMongo = async () => {
    try {
        await mongoose_1.default.connect(envs_1.ENV_MONGO.URI);
        console.info("🍃 MongoDB conectado");
    }
    catch (error) {
        console.error("❌ Error conectando a MongoDB:", error);
        throw error;
    }
};
exports.connectMongo = connectMongo;
//# sourceMappingURL=mongoose.js.map