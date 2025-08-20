"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardrobeUserController = void 0;
const wardrobe_user_service_1 = require("./wardrobe-user.service");
class WardrobeUserController {
    constructor(service = new wardrobe_user_service_1.WardrobeUserService()) {
        this.service = service;
    }
    async findAll(req, res) {
        const users = await this.service.findAll();
        res.json(users);
    }
    async findOne(req, res) {
        const id = req.params.id;
        const user = await this.service.findOne(id);
        res.json(user);
    }
    async create(req, res) {
        const newUser = await this.service.create(req.body);
        res.status(201).json(newUser);
    }
    async update(req, res) {
        const id = req.params.id;
        const updatedUser = await this.service.update(id, req.body);
        res.json(updatedUser);
    }
    async remove(req, res) {
        const id = req.params.id;
        await this.service.remove(id);
        res.status(204).send();
    }
    async findByUsername(req, res) {
        const username = req.params.username;
        const user = await this.service.findByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
}
exports.WardrobeUserController = WardrobeUserController;
//# sourceMappingURL=wardrobe-user.controller.js.map