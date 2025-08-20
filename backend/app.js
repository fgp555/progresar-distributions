"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 🌐 Core imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
// 🛠️ Middleware y utilidades
const morganLogger_1 = require("./utils/morganLogger");
const asyncHandler_1 = require("./utils/asyncHandler");
const error_middleware_1 = require("./middleware/error.middleware");
const visit_middleware_1 = require("./middleware/visit.middleware");
const setupFrontendFallback_1 = require("./utils/setupFrontendFallback");
const envs_1 = require("./config/envs");
// 📦 Rutas: Core funcionalidad
const shortener_controller_1 = require("./common/shortener/shortener.controller");
const _index_routes_1 = __importDefault(require("./auth/routes/_index.routes"));
// 🧪 Otros (DB, Seed)
const database_routes_1 = __importDefault(require("./common/database/database.routes"));
// 👨‍💻 Systered
const _progresar_routes_1 = __importDefault(require("./modules/systered/progresar/_progresar.routes"));
// 🚀 Inicialización de app
const app = (0, express_1.default)();
// 🧾 Logging y CORS
app.use(morganLogger_1.morganLogger);
app.use((0, cors_1.default)());
// ⚠️ Webhook con raw body parser
app.use("/api/whatsapp/webhook", body_parser_1.default.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString("utf8");
    },
}));
// 🧠 Sesiones y JSON parser
app.use((0, express_session_1.default)({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.json());
app.use(visit_middleware_1.countVisitMiddleware);
// 📂 Archivos estáticos
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// 🔐 Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// 🚏 Rutas API Modules
app.use("/api", _index_routes_1.default);
app.use("/api", _progresar_routes_1.default);
// 🚏 Rutas API
// app.use("/api/email", EmailRoutes);
// app.use("/api/shortener", shortenerRoutes);
// app.use("/api/info", infoRoutes);
// app.use("/api/options", optionsRoutes);
// app.use("/api/stat", StatRoutes);
// app.use("/api/visits", visitRoutes);
// app.use("/api/whatsapp", whatsappRoutes);
// 🧪 Base de datos y seed
app.use("/api/db", database_routes_1.default);
// app.use("/api/mongoose", mongooseRoutes);
// 🔁 Redirección pública
app.get("/:code", (0, asyncHandler_1.asyncHandler)(new shortener_controller_1.ShortenerController().redirect));
// 🌐 Frontend fallback (SPA)
if (envs_1.ENABLE_FRONTEND) {
    (0, setupFrontendFallback_1.setupFrontendFallback)(app);
}
// ❌ Manejo global de errores
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map