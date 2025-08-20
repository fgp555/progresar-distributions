"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
// src/socket.ts
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const httpServer = (0, http_1.createServer)(app_1.default);
exports.httpServer = httpServer;
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "*" },
});
io.on("connection", (socket) => {
    console.info("🟢 Nuevo cliente conectado:", socket.id);
    const emitConnectedUsers = () => {
        const connectedUsers = Array.from(io.sockets.sockets.keys());
        // console.info("👥 🔌 Usuarios conectados:", connectedUsers.length, new Date().toLocaleString("us-CO"));
        console.info("👥 Usuarios conectados:", connectedUsers.length, new Date());
        io.emit("connectedUsers", connectedUsers);
    };
    // 👋 Emitir al conectar
    emitConnectedUsers();
    // 🔄 Emitir manualmente cuando un cliente lo solicita
    socket.on("getConnectedUsers", () => {
        console.info("📥 Solicitud de usuarios conectados desde:", socket.id);
        emitConnectedUsers();
    });
    // 🔌 Emitir cuando un cliente se desconecta
    socket.on("disconnect", () => {
        console.info("🔴 Cliente desconectado:", socket.id);
        emitConnectedUsers();
    });
});
//# sourceMappingURL=socket.js.map