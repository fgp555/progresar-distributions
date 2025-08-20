"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = exports.AppDataSource = void 0;
// src/config/typeOrmConfig.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
// Common entities
const switchModule_1 = require("./switchModule");
const options_entity_1 = require("../common/options/entities/options.entity");
const shortener_entity_1 = require("../common/shortener/entities/shortener.entity");
const shortener_visit_entity_1 = require("../common/shortener/entities/shortener-visit.entity");
const stat_entity_1 = require("../common/stat/entities/stat.entity");
const visit_entity_1 = require("../common/visit/entities/visit.entity");
const whatsapp_message_entity_1 = require("../common/whatsapp/entities/whatsapp-message.entity");
// Entidades comunes
const baseEntities = [
    options_entity_1.OptionsEntity,
    shortener_entity_1.ShortenerEntity,
    shortener_visit_entity_1.ShortenerVisitEntity,
    stat_entity_1.StatEntity,
    visit_entity_1.VisitEntity,
    whatsapp_message_entity_1.WhatsappMessageEntity,
];
let entities = [...baseEntities, ...(0, switchModule_1.getEntitiesByMode)()];
// Configuración de TypeORM
const typeOrmConfig = {
    type: envs_1.ENV_DB.DB_TYPE,
    host: envs_1.ENV_DB.DB_HOST,
    port: envs_1.ENV_DB.DB_PORT,
    username: envs_1.ENV_DB.DB_USERNAME,
    password: envs_1.ENV_DB.DB_PASSWORD,
    database: envs_1.ENV_DB.DB_DATABASE,
    synchronize: envs_1.ENV_DB.SYNCHRONIZE,
    dropSchema: envs_1.ENV_DB.DROPSCHEMA,
    logging: ["error"],
    entities,
    migrations: ["dist/migrations/*{.ts,.js}"],
    subscribers: [],
    ssl: envs_1.ENV_DB.DB_SSL,
};
// Crear la instancia de DataSource
exports.AppDataSource = new typeorm_1.DataSource(typeOrmConfig);
// Exporta el tipo para uso global en otras partes de la app
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=typeOrmConfig.js.map