"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeController = void 0;
const wardrobe_service_1 = require("./wardrobe.service");
class WardrobeController {
    constructor() {
        this.service = new wardrobe_service_1.WardrobeService();
    }
    async findAll(req, res) {
        const wardrobes = await this.service.findAll();
        res.json(wardrobes);
    }
    async findOne(req, res) {
        const { id } = req.params;
        const wardrobe = await this.service.findOne(+id);
        res.json(wardrobe);
    }
    async create(req, res) {
        const data = req.body;
        const wardrobe = await this.service.create(data);
        res.status(201).json(wardrobe);
    }
    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        const updated = await this.service.update(+id, data);
        res.json(updated);
    }
    async remove(req, res) {
        const { id } = req.params;
        await this.service.remove(+id);
        res.status(204).send();
    }
}
exports.WardrobeController = WardrobeController;
//# sourceMappingURL=wardrobe.controller.js.map