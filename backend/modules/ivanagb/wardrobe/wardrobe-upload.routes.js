"use strict";
// src/ivanagb/wardrobe/wardrobe-upload.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wardrobe_upload_controller_1 = require("./wardrobe-upload.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const controller = new wardrobe_upload_controller_1.WardrobeUploadController();
const uploadDir = path_1.default.resolve(__dirname, "../../../../uploads");
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
router.post("/image", 
//   verifyToken,
upload.single("image"), (0, asyncHandler_1.asyncHandler)(controller.uploadItem.bind(controller)));
router.get("/image", 
// verifyToken,
(0, asyncHandler_1.asyncHandler)(controller.getItem.bind(controller)));
exports.default = router;
//# sourceMappingURL=wardrobe-upload.routes.js.map