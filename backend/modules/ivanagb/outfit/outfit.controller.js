"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutfitController = void 0;
const outfit_service_1 = require("./outfit.service");
class OutfitController {
    constructor() {
        this.service = new outfit_service_1.OutfitService();
    }
    async findAll(req, res) {
        const data = await this.service.findAll();
        res.json(data);
    }
    async findOne(req, res) {
        const id = parseInt(req.params.id);
        const data = await this.service.findOne(id);
        res.json(data);
    }
    async create(req, res) {
        const data = await this.service.create(req.body);
        res.status(201).json(data);
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const updated = await this.service.update(id, req.body);
        res.json(updated);
    }
    async remove(req, res) {
        const id = parseInt(req.params.id);
        await this.service.remove(id);
        res.json({ message: "Outfit eliminado correctamente" });
    }
}
exports.OutfitController = OutfitController;
//# sourceMappingURL=outfit.controller.js.map