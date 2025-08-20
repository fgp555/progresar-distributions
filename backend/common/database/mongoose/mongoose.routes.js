"use strict";
// src/common/database/database.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../../../utils/asyncHandler");
const express_1 = require("express");
const mongoose_controller_1 = require("./mongoose.controller");
const router = (0, express_1.Router)();
const controller = new mongoose_controller_1.MongooseController();
router.post("/backup", (0, asyncHandler_1.asyncHandler)(controller.backup.bind(controller)));
router.delete("/drop", (0, asyncHandler_1.asyncHandler)(controller.dropCollections.bind(controller))); // 🆕
exports.default = router;
//# sourceMappingURL=mongoose.routes.js.map