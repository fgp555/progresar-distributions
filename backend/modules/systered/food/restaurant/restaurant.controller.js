"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const restaurant_service_1 = require("./restaurant.service");
class RestaurantController {
    static async findAll(req, res) {
        const locations = await restaurant_service_1.RestaurantService.findAllLocations();
        res.json(locations);
    }
    static async findOne(req, res) {
        const location = await restaurant_service_1.RestaurantService.findLocationById(Number(req.params.id));
        if (!location) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(location);
    }
    static async create(req, res) {
        const result = await restaurant_service_1.RestaurantService.createLocation(req.body);
        res.status(201).json(result);
    }
    static async update(req, res) {
        const updated = await restaurant_service_1.RestaurantService.updateLocation(Number(req.params.id), req.body);
        if (!updated) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(updated);
    }
    static async remove(req, res) {
        const success = await restaurant_service_1.RestaurantService.deleteLocation(Number(req.params.id));
        res.json({ deleted: success });
    }
    static async getBySlug(req, res) {
        const location = await restaurant_service_1.RestaurantService.findLocationBySlug(req.params.slug);
        if (!location) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(location);
    }
    static async getWaitersBySlug(req, res) {
        const slug = req.params.slug;
        const waiters = await restaurant_service_1.RestaurantService.findWaitersByRestaurantSlug(slug);
        if (!waiters) {
            res.status(404).json({ message: "Restaurant not found" });
            return;
        }
        res.json(waiters);
    }
    static async getTablesBySlug(req, res) {
        const slug = req.params.slug;
        const tables = await restaurant_service_1.RestaurantService.findTablesByRestaurantSlug(slug);
        if (!tables) {
            res.status(404).json({ message: "Restaurant not found" });
            return;
        }
        res.json(tables);
    }
    static async getCategoriesBySlug(req, res) {
        const { slug } = req.params;
        const { menuName } = req.query;
        const categories = await restaurant_service_1.RestaurantService.findCategoriesBySlugWithMenuName(slug, typeof menuName === "string" ? menuName : undefined);
        if (!categories) {
            res.status(404).json({ message: "Restaurant not found" });
            return;
        }
        res.json(categories);
    }
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map