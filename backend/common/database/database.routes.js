"use strict";
// src/common/database/database.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../../middleware/auth.middleware");
const asyncHandler_1 = require("../../utils/asyncHandler");
const db_backup_controller_1 = require("./db-backup.controller");
const db_config_controller_1 = require("./db-config.controller");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const controller = new db_backup_controller_1.DBBackupController();
const controllerConfig = new db_config_controller_1.DBConfigController();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.get("/list", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.list.bind(controller)));
router.get("/download/:filename", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.download.bind(controller)));
router.post("/backup", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.backup.bind(controller)));
router.post("/backupNodeJS", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.backupNodeJS.bind(controller)));
router.patch("/restore/:backupfile", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.restore.bind(controller)));
router.patch("/restoreNodeJS/:backupfile", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.restoreNodeJS.bind(controller)));
router.patch("/rename/:filename", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.rename.bind(controller)));
router.delete("/delete/:filename", auth_middleware_1.verifyToken, (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
router.post("/upload", auth_middleware_1.verifyToken, upload.single("file"), (0, asyncHandler_1.asyncHandler)(controller.upload.bind(controller)));
// router.post("/config/dropAndSync", asyncHandler(controllerConfig.dropAndSync.bind(controllerConfig)));
// router.post("/config/runSeeders", asyncHandler(controllerConfig.runSeeders.bind(controllerConfig)));
// router.post("/config/dropAndSeed", asyncHandler(controllerConfig.dropAndSeed.bind(controllerConfig)));
// router.post("/config/runSQLQuery", asyncHandler(controllerConfig.runSQLQuery.bind(controllerConfig)));
exports.default = router;
//# sourceMappingURL=database.routes.js.map