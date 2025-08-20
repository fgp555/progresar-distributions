"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_routes_1 = __importDefault(require("./restaurant-category/category.routes"));
const menu_routes_1 = __importDefault(require("./restaurant-menu/menu.routes"));
const restaurant_routes_1 = __importDefault(require("./restaurant/restaurant.routes"));
const feedback_routes_1 = __importDefault(require("./restaurant-feedback/feedback.routes"));
const router = (0, express_1.Router)();
router.use("/restaurant", restaurant_routes_1.default);
router.use("/restaurant/category", category_routes_1.default);
router.use("/restaurant/menu", menu_routes_1.default);
// router.use("/restaurant/table", MenuItemRoutes);
router.use("/restaurant/feedback", feedback_routes_1.default);
exports.default = router;
//# sourceMappingURL=_restautant.routes.js.map