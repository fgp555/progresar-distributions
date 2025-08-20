"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerVisitMongoDBService = void 0;
// src/common/shortener/shortener-visit.service.ts
const shortener_visit_model_1 = __importDefault(require("./models/shortener-visit.model"));
class ShortenerVisitMongoDBService {
    async findAll() {
        return await shortener_visit_model_1.default.find().sort({ visitedAt: -1 }).populate("shortenerId");
    }
    async findByShortenerId(shortenerId) {
        return await shortener_visit_model_1.default.find({ shortenerId }).sort({ visitedAt: -1 });
    }
}
exports.ShortenerVisitMongoDBService = ShortenerVisitMongoDBService;
//# sourceMappingURL=shortener-visit.service.mongodb.js.map