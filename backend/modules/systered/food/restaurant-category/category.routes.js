"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.get("/findAll", category_controller_1.CategoryController.findAll);
router.get("/findOne/:id", category_controller_1.CategoryController.findOne);
router.post("/create", category_controller_1.CategoryController.create);
router.put("/update/:id", category_controller_1.CategoryController.update);
router.delete("/remove/:id", category_controller_1.CategoryController.remove);
exports.default = router;
//# sourceMappingURL=category.routes.js.map