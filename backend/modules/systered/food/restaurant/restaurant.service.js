"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
// src/common/restaurant/restaurant.service.ts
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const restaurant_user_entity_1 = require("../restaurant-user/entities/restaurant-user.entity");
const restaurant_entity_1 = require("./entities/restaurant.entity");
class RestaurantService {
    static async findAllLocations() {
        return await this.locationRepo.find({ relations: ["users"] });
    }
    static async findLocationById(id) {
        return await this.locationRepo.findOne({ where: { id }, relations: ["users"] });
    }
    static async createLocation(data) {
        const created = this.locationRepo.create(data);
        return await this.locationRepo.save(created);
    }
    static async updateLocation(id, data) {
        const location = await this.locationRepo.findOneBy({ id });
        if (!location)
            return null;
        this.locationRepo.merge(location, data);
        return await this.locationRepo.save(location);
    }
    static async deleteLocation(id) {
        const result = await this.locationRepo.delete(id);
        return result.affected === 1;
    }
    static async findLocationBySlug(slug) {
        return await this.locationRepo.findOne({
            where: { slug },
            relations: ["users", "categories", "tables"],
        });
    }
    static async findWaitersByRestaurantSlug(slug) {
        const restaurant = await this.locationRepo.findOne({
            where: { slug },
            relations: ["users"],
        });
        if (!restaurant)
            return null;
        return restaurant.users.filter((user) => user.role === "waiter");
    }
    static async findTablesByRestaurantSlug(slug) {
        const restaurant = await this.locationRepo.findOne({
            where: { slug },
            relations: ["tables"],
        });
        if (!restaurant)
            return null;
        return restaurant.tables;
    }
    static async findCategoriesBySlugWithMenuName(slug, menuName) {
        const restaurant = await this.locationRepo.findOne({
            where: { slug },
            relations: ["categories", "categories.menus"],
        });
        if (!restaurant)
            return null;
        if (!menuName) {
            // 🔽 Ordenar categorías directamente si no hay filtro de menú
            return restaurant.categories.sort((a, b) => a.order - b.order);
        }
        const filteredCategories = restaurant.categories
            .map((category) => {
            const filteredMenus = category.menus.filter((menu) => menu.name.toLowerCase().includes(menuName.trim().toLowerCase()) ||
                menu.slug.toLowerCase().includes(menuName.trim().toLowerCase()));
            return filteredMenus.length > 0 ? { ...category, menus: filteredMenus } : null;
        })
            .filter((category) => category !== null)
            .sort((a, b) => a.order - b.order); // 🔽 Ordenar también los resultados filtrados
        return filteredCategories;
    }
}
exports.RestaurantService = RestaurantService;
RestaurantService.locationRepo = typeOrmConfig_1.AppDataSource.getRepository(restaurant_entity_1.RestaurantEntity);
RestaurantService.userRepo = typeOrmConfig_1.AppDataSource.getRepository(restaurant_user_entity_1.RestaurantUserEntity);
//# sourceMappingURL=restaurant.service.js.map