"use strict";
// src/common/database/db-backup.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseController = void 0;
const error_middleware_1 = require("../../../middleware/error.middleware");
const mongoose_service_1 = require("./mongoose.service");
class MongooseController {
    constructor() {
        this.dbBackupService = new mongoose_service_1.MongooseService();
        this.backup = async (req, res, next) => {
            try {
                const result = await this.dbBackupService.backup();
                res.json({ message: result });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al generar el backup: ${error.message}`, 500));
            }
        };
        this.dropCollections = async (req, res, next) => {
            try {
                const result = await this.dbBackupService.dropAllCollections();
                res.json({ message: "Todas las colecciones eliminadas", dropped: result });
            }
            catch (error) {
                next(new error_middleware_1.AppError(`Error al eliminar las colecciones: ${error.message}`, 500));
            }
        };
    }
}
exports.MongooseController = MongooseController;
//# sourceMappingURL=mongoose.controller.js.map