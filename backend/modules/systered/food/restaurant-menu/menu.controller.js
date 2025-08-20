"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemController = void 0;
const menu_service_1 = require("./menu.service");
class MenuItemController {
    static async getAll(req, res) {
        const items = await menu_service_1.MenuItemService.findAll();
        res.json(items);
    }
    static async getOne(req, res) {
        const item = await menu_service_1.MenuItemService.findOne(Number(req.params.id));
        if (!item) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(item);
    }
    static async create(req, res) {
        const newItem = await menu_service_1.MenuItemService.create(req.body);
        res.status(201).json(newItem);
    }
    static async update(req, res) {
        const updated = await menu_service_1.MenuItemService.update(Number(req.params.id), req.body);
        if (!updated) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(updated);
    }
    static async remove(req, res) {
        const deleted = await menu_service_1.MenuItemService.delete(Number(req.params.id));
        res.json({ deleted });
    }
}
exports.MenuItemController = MenuItemController;
//# sourceMappingURL=menu.controller.js.map