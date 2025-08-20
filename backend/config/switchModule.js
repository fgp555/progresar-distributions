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
const envs_1 = require("./envs");
const user_entity_1 = require("../auth/entities/user.entity");
const path_1 = __importDefault(require("path"));
const _progresar_entities_1 = require("../modules/systered/progresar/_progresar.entities");
const User_entity_1 = require("../modules/systered/progresar/entities/User.entity");
const seedProgresar_1 = require("../modules/systered/progresar/seeders/seedProgresar");
function selectUserEntity() {
    switch (envs_1.USE_MODULE) {
        case "progresar_module":
            return User_entity_1.ProgresarUserEntity;
        default:
            return user_entity_1.UserEntity;
    }
}
function getEntitiesByMode() {
    switch (envs_1.USE_MODULE) {
        case "progresar_module":
            return _progresar_entities_1.progresar_entities;
        default:
            return;
    }
}
async function runSeedsByMode() {
    switch (envs_1.USE_MODULE) {
        case "progresar_module":
            await (0, seedProgresar_1.seedDocumentTypes)();
            await (0, seedProgresar_1.seedProgresar)();
            break;
        default:
            break;
    }
}
function getFrontendBuildPath() {
    switch (envs_1.USE_MODULE) {
        case "progresar_module":
            return path_1.default.join(__dirname, "../../../progresar-distributions/frontend");
        default:
            return path_1.default.join(__dirname, "../../../progresar-distributions/frontend");
    }
}
//# sourceMappingURL=switchModule.js.map