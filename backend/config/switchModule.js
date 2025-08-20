"use strict";
// src/config/switchModule.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserEntity = selectUserEntity;
exports.getEntitiesByMode = getEntitiesByMode;
exports.runSeedsByMode = runSeedsByMode;
exports.getFrontendBuildPath = getFrontendBuildPath;
const product_entity_1 = require("../modules/frankgp/ecommerce/product/product.entity");
const _academy_entities_1 = require("../modules/frankgp/academy/dtos-entities/_academy.entities");
const _proyect_entities_1 = require("../modules/frankgp/project/entities/_proyect.entities");
const _wardrobe_entities_1 = require("../modules/ivanagb/wardrobe/entities/_wardrobe.entities");
const _restaurant_entities_1 = require("../modules/systered/food/_restaurant.entities");
// Seeds
const categories_seed_1 = require("../modules/frankgp/academy/_seed/categories.seed");
const sections_seed_1 = require("../modules/frankgp/academy/_seed/sections.seed");
const options_seeder_1 = require("../common/options/_seed/options.seeder");
const product_seed_1 = require("../modules/frankgp/ecommerce/_seed/product.seed");
const project_seed_1 = require("../modules/frankgp/project/_seed/project.seed");
const project_user_seed_1 = require("../modules/frankgp/project/_seed/project-user.seed");
const restaurant_seed_1 = require("../modules/systered/food/seed/restaurant.seed");
const user_seed_1 = require("../auth/_seed/user.seed");
const wardrobe_seed_1 = require("../modules/ivanagb/_seed/wardrobe.seed");
const envs_1 = require("./envs");
const user_entity_1 = require("../auth/entities/user.entity");
const user_wardrobe_entity_1 = require("../modules/ivanagb/wardrobe-user/entities/user-wardrobe.entity");
const shortener_sql_seeder_1 = require("../common/shortener/_seed/shortener.sql.seeder");
const path_1 = __importDefault(require("path"));
const _progresar_entities_1 = require("../modules/systered/progresar/_progresar.entities");
const User_entity_1 = require("../modules/systered/progresar/entities/User.entity");
const seedProgresar_1 = require("../modules/systered/progresar/seeders/seedProgresar");
function selectUserEntity() {
    switch (envs_1.USE_MODULE) {
        case "wardrobe_module":
            return user_wardrobe_entity_1.WardrobeUserEntity;
        case "progresar_module":
            return User_entity_1.ProgresarUserEntity;
        case "restaurant_module":
            return user_entity_1.UserEntity;
        default:
            return user_entity_1.UserEntity;
    }
}
function getEntitiesByMode() {
    switch (envs_1.USE_MODULE) {
        case "wardrobe_module":
            return _wardrobe_entities_1.wardrobe_entities;
        case "progresar_module":
            return _progresar_entities_1.progresar_entities;
        case "restaurant_module":
            return _restaurant_entities_1.restaurat_entities;
        default:
            return [user_entity_1.UserEntity, product_entity_1.ProductEntity, ..._academy_entities_1.academy_entities, ..._proyect_entities_1.project_entities];
    }
}
async function runSeedsByMode() {
    switch (envs_1.USE_MODULE) {
        case "wardrobe_module":
            await (0, wardrobe_seed_1.seedWardrobes)();
            break;
        case "progresar_module":
            await (0, seedProgresar_1.seedProgresar)();
            break;
        case "restaurant_module":
            await (0, restaurant_seed_1.seedRestaurant)();
            break;
        default:
            await (0, user_seed_1.seedUserSQL)();
            await (0, options_seeder_1.seedOptions)();
            await (0, shortener_sql_seeder_1.seedShortenerSQL)();
            await (0, project_user_seed_1.seedProjectUser)();
            await (0, project_seed_1.seedProject)();
            await (0, product_seed_1.seedProduct)();
            await (0, categories_seed_1.seedAcademyCategory)();
            await (0, sections_seed_1.seedAcademySection)();
            break;
    }
}
function getFrontendBuildPath() {
    switch (envs_1.USE_MODULE) {
        // case "wardrobe_module":
        //   return path.join(__dirname, "../../../fgp-distributions/frontend-wardrobe");
        case "progresar_module":
            return path_1.default.join(__dirname, "../../../progresar-distributions/frontend");
        default:
            return path_1.default.join(__dirname, "../../../fgp-distributions/frontend");
    }
}
//# sourceMappingURL=switchModule.js.map