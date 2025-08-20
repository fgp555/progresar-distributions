"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUploadController = void 0;
const wardrobe_upload_service_1 = require("./wardrobe-upload.service");
class WardrobeUploadController {
    constructor() {
        this.service = new wardrobe_upload_service_1.WardrobeUploadService();
    }
    async uploadItem(req, res) {
        const { wardrobeId, type } = req.body;
        const image = req.file?.filename;
        if (!wardrobeId || !type || !image) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        const result = await this.service.saveItem({
            wardrobeId: parseInt(wardrobeId),
            type,
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
            brand: req.body.brand,
            image,
        });
        return res.status(201).json(result);
    }
    async getItem(req, res) {
        const id = parseInt(req.query.id, 10);
        const type = req.query.type;
        if (isNaN(id) || !type) {
            return res.status(400).json({ message: "Invalid id or type" });
        }
        const item = await this.service.getItemById(id, type);
        if (!item)
            return res.status(404).json({ message: "Item not found" });
        res.json(item);
    }
}
exports.WardrobeUploadController = WardrobeUploadController;
//# sourceMappingURL=wardrobe-upload.controller.js.map