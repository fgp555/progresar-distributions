"use strict";
// utils/slugify.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlug = toSlug;
function toSlug(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
//# sourceMappingURL=slugify.js.map