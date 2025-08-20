"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/common/feedback/feedback.routes.ts
const express_1 = require("express");
const feedback_controller_1 = require("./feedback.controller");
const auth_middleware_1 = require("../../../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/getAll", /* verifyToken, */ feedback_controller_1.FeedbackController.getAll);
router.get("/getOne/:id", auth_middleware_1.verifyToken, feedback_controller_1.FeedbackController.getOne);
router.post("/create", auth_middleware_1.verifyToken, feedback_controller_1.FeedbackController.create);
router.put("/update/:id", auth_middleware_1.verifyToken, feedback_controller_1.FeedbackController.update);
router.delete("/remove/:id", auth_middleware_1.verifyToken, feedback_controller_1.FeedbackController.remove);
exports.default = router;
//# sourceMappingURL=feedback.routes.js.map