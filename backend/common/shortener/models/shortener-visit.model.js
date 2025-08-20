"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/common/shortener/models/shortener-visit.model.ts
const mongoose_1 = require("mongoose");
const ShortenerVisitSchema = new mongoose_1.Schema({
    ip: String,
    userAgent: String,
    referrer: String,
    country: String,
    city: String,
    device: String,
    visitedAt: { type: Date, default: Date.now },
    shortenerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Shortener", required: true },
}, { timestamps: false });
exports.default = (0, mongoose_1.model)("ShortenerVisit", ShortenerVisitSchema);
//# sourceMappingURL=shortener-visit.model.js.map