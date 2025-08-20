"use strict";
// src/utils/setupFrontendFallback.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFrontendFallback = setupFrontendFallback;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const switchModule_1 = require("../config/switchModule");
function setupFrontendFallback(app) {
    const clientBuildPath = (0, switchModule_1.getFrontendBuildPath)();
    console.log("clientBuildPath:", clientBuildPath);
    if (!fs_1.default.existsSync(clientBuildPath)) {
        console.warn(`[setupFrontendFallback] WARNING: Build path not found: ${clientBuildPath}`);
        return;
    }
    // Servir archivos estáticos
    app.use((0, express_1.static)(clientBuildPath));
    // Fallback para rutas del frontend que no coincidan con una API
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path_1.default.join(clientBuildPath, "index.html"));
    });
}
//# sourceMappingURL=setupFrontendFallback.js.map