"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/common/shortener/models/shortener.model.ts
const mongoose_1 = require("mongoose");
const ShortenerSchema = new mongoose_1.Schema({
    backHalf: { type: String, unique: true, required: true },
    destination: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Shortener", ShortenerSchema);
//# sourceMappingURL=shortener.model.js.map