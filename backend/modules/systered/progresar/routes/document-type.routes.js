"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/users/routes/document-type.routes.ts
const express_1 = require("express");
const document_type_controller_1 = require("../controllers/document-type.controller");
const asyncHandler_1 = require("../utils/asyncHandler");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new document_type_controller_1.DocumentTypeController();
const admin = ["admin"];
const allRoles = ["user", "admin"];
// Rutas públicas (para obtener tipos de documento en formularios)
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/code/:code", (0, asyncHandler_1.asyncHandler)(controller.findByCode.bind(controller)));
// Rutas protegidas
router.get("/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(allRoles), (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.post("/", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
// Ruta especial para poblar datos por defecto
router.post("/seed-defaults", auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(admin), (0, asyncHandler_1.asyncHandler)(controller.seedDefaults.bind(controller)));
exports.default = router;
//# sourceMappingURL=document-type.routes.js.map