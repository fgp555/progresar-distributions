"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurat_entities = void 0;
const category_entity_1 = require("./restaurant-category/entities/category.entity");
const restaurant_entity_1 = require("./restaurant/entities/restaurant.entity");
const menu_entity_1 = require("./restaurant-menu/entities/menu.entity");
const table_entity_1 = require("./restaurant/entities/table.entity");
const restaurant_user_entity_1 = require("./restaurant-user/entities/restaurant-user.entity");
const feedback_entity_1 = require("./restaurant-feedback/entities/feedback.entity");
exports.restaurat_entities = [
    category_entity_1.RestaurantCategoryEntity,
    menu_entity_1.RestaurantMenuEntity,
    restaurant_entity_1.RestaurantEntity,
    restaurant_user_entity_1.RestaurantUserEntity,
    table_entity_1.RestaurantTableEntity,
    feedback_entity_1.RestaurantFeedbackEntity,
    //
];
//# sourceMappingURL=_restaurant.entities.js.map