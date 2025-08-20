"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wardrobe_routes_1 = __importDefault(require("./wardrobe/wardrobe.routes"));
const wardrobe_user_routes_1 = __importDefault(require("./wardrobe-user/wardrobe-user.routes"));
const wardrobe_upload_routes_1 = __importDefault(require("./wardrobe/wardrobe-upload.routes"));
const outfit_routes_1 = __importDefault(require("./outfit/outfit.routes"));
const router = (0, express_1.Router)();
router.use("/wardrobe", wardrobe_routes_1.default);
router.use("/wardrobe-users", wardrobe_user_routes_1.default);
router.use("/wardrobe-upload", wardrobe_upload_routes_1.default);
router.use("/outfits", outfit_routes_1.default);
exports.default = router;
//# sourceMappingURL=_ivanagb.routes.js.map