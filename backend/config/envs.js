"use strict";
// src/config/envs.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_WHATSAPP = exports.ENV_JWT = exports.ENV_GOOGLE = exports.ENV_DB = exports.ENV_MONGO = exports.USE_MODULE = exports.ENABLE_FRONTEND = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
exports.PORT = process.env.PORT || 3000;
exports.ENABLE_FRONTEND = process.env.ENABLE_FRONTEND ? process.env.ENABLE_FRONTEND === "true" : true;
exports.USE_MODULE = (process.env.USE_MODULE || "default").toLowerCase();
exports.ENV_MONGO = {
    USE_IN_AUTH: process.env.MONGO_USE_IN_AUTH === "true",
    URI: process.env.MONGO_URI || "mongodb://localhost:27017/miapp",
};
exports.ENV_DB = {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: parseInt(process.env.DB_PORT || "3306", 10),
    DB_TYPE: process.env.DB_TYPE || "mysql",
    DB_DATABASE: process.env.DB_DATABASE || "my_db",
    DB_USERNAME: process.env.DB_USERNAME || "root",
    DB_PASSWORD: process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD,
    SEED_DATA: process.env.SEED_DATA === "true",
    DROPSCHEMA: process.env.DROPSCHEMA === "true",
    SYNCHRONIZE: process.env.SYNCHRONIZE === "true",
    DEV_MODE: process.env.DEV_MODE === "true",
    DB_SSL: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
};
exports.ENV_GOOGLE = {
    SERVER_URL: process.env.GOOGLE_SERVER_URL,
    CLIENT_URL: process.env.GOOGLE_CLIENT_URL,
    CALLBACK_URL: process.env.GOOGLE_SERVER_URL + "/api/oauth/callback",
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
exports.ENV_JWT = {
    ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "access-secret",
    REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "refresh-secret",
    ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES || "6h",
    REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES || "7d",
};
exports.ENV_WHATSAPP = {
    APP_SECRET: process.env.WHATSAPP_APP_SECRET || "my_app_secret",
    VERIFY_TOKEN: process.env.WHATSAPP_VERIFY_TOKEN || "my_verify_token",
    API_BASE_URL: process.env.WHATSAPP_API_BASE_URL || "https://graph.facebook.com/v22.0",
    PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID || "1234567890",
    TOKEN: process.env.WHATSAPP_TOKEN || "my_token",
};
console.info("USE_MODULE: 🟢", exports.USE_MODULE);
console.info("ENV_MONGO.USE_IN_AUTH: ", exports.ENV_MONGO.USE_IN_AUTH);
console.info("DB_TYPE: ", exports.ENV_DB.DB_TYPE);
console.info("DB_DATABASE: ", exports.ENV_DB.DB_DATABASE);
console.info("SEED_DATA: ", exports.ENV_DB.SEED_DATA);
console.info("DROPSCHEMA: ", exports.ENV_DB.DROPSCHEMA);
// Verificar si estamos en desarrollo
if (process.env.DEV_MODE === "true") {
    console.info("DEV_MODE: Modo desarrollo");
}
else {
    console.info("DEV_MODE: Modo producción");
}
//# sourceMappingURL=envs.js.map