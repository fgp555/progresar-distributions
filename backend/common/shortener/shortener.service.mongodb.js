"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerMongoDBService = void 0;
// src/common/shortener/shortener.service.ts
const shortener_model_1 = __importDefault(require("./models/shortener.model"));
const shortener_visit_model_1 = __importDefault(require("./models/shortener-visit.model"));
const nanoid_1 = require("nanoid");
const mongoose_1 = require("mongoose");
class ShortenerMongoDBService {
    async findAll() {
        return await shortener_model_1.default.find();
    }
    async findAllSelectBackup() {
        return await shortener_model_1.default.find().select("backHalf destination -_id").sort({ destination: 1 });
    }
    async findAllFilter(params = {}) {
        const { page, limit, search, dateVisitFrom, dateVisitTo, sortVisitCount } = params;
        const baseQuery = {};
        if (search) {
            baseQuery.backHalf = { $regex: search, $options: "i" };
        }
        const shorteners = await shortener_model_1.default.find(baseQuery);
        const fromDate = dateVisitFrom ? new Date(dateVisitFrom) : new Date(Date.now() - 24 * 60 * 60 * 1000);
        const toDate = dateVisitTo ? new Date(dateVisitTo) : new Date();
        const results = await Promise.all(shorteners.map(async (short) => {
            const visits = await shortener_visit_model_1.default.find({
                shortenerId: short._id,
                visitedAt: { $gte: fromDate, $lte: toDate },
            });
            return {
                ...short.toObject(),
                visits,
                visitCount: visits.length,
            };
        }));
        // Ordenar
        if (sortVisitCount === "ASC") {
            results.sort((a, b) => a.visitCount - b.visitCount);
        }
        else if (sortVisitCount === "DESC") {
            results.sort((a, b) => b.visitCount - a.visitCount);
        }
        if (!page || !limit) {
            return {
                page: 1,
                totalPages: 1,
                totalItems: results.length,
                hasMore: false,
                results,
            };
        }
        const skip = (page - 1) * limit;
        const paginated = results.slice(skip, skip + limit);
        return {
            page,
            totalPages: Math.ceil(results.length / limit),
            totalItems: results.length,
            hasMore: page * limit < results.length,
            results: paginated,
        };
    }
    async create(destination, backHalf) {
        const backHalfValue = backHalf || (0, nanoid_1.nanoid)(6);
        const exists = await shortener_model_1.default.findOne({ backHalf: backHalfValue });
        if (exists)
            throw new Error("Short code already in use");
        const short = new shortener_model_1.default({ backHalf: backHalfValue, destination });
        return await short.save();
    }
    async findByCode(code) {
        return await shortener_model_1.default.findOne({ backHalf: code });
    }
    async findOne(id) {
        return await shortener_model_1.default.findById(id);
    }
    async update(id, data) {
        const record = await shortener_model_1.default.findById(id);
        if (!record)
            return null;
        // Validar si el backHalf está en uso por otro documento
        if (data.backHalf && data.backHalf !== record.backHalf) {
            const exists = await shortener_model_1.default.findOne({
                backHalf: data.backHalf,
                _id: { $ne: new mongoose_1.Types.ObjectId(id) }, // ✅ excluir el actual
            });
            if (exists)
                throw new Error("Custom code already in use");
            record.backHalf = data.backHalf;
        }
        if (data.destination) {
            record.destination = data.destination;
        }
        return await record.save();
    }
    async remove(id) {
        const result = await shortener_model_1.default.deleteOne({ _id: id });
        return result.deletedCount !== 0;
    }
    async registerVisit(shortenerId, data) {
        const visit = new shortener_visit_model_1.default({
            ...data,
            shortenerId: new mongoose_1.Types.ObjectId(shortenerId),
            visitedAt: new Date(),
        });
        return await visit.save();
    }
}
exports.ShortenerMongoDBService = ShortenerMongoDBService;
//# sourceMappingURL=shortener.service.mongodb.js.map