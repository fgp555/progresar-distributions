"use strict";
// src\feedback\feedback.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const feedback_service_1 = require("./feedback.service");
class FeedbackController {
    static async create(req, res) {
        const result = await feedback_service_1.FeedbackService.create(req.body);
        res.status(201).json(result);
    }
    static async getAll(req, res) {
        const feedbacks = await feedback_service_1.FeedbackService.findAll();
        res.json(feedbacks);
    }
    static async getOne(req, res) {
        const feedback = await feedback_service_1.FeedbackService.findOne(Number(req.params.id));
        if (!feedback) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(feedback);
    }
    static async update(req, res) {
        const updated = await feedback_service_1.FeedbackService.update(Number(req.params.id), req.body);
        if (!updated) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        res.json(updated);
    }
    static async remove(req, res) {
        const success = await feedback_service_1.FeedbackService.remove(Number(req.params.id));
        res.json({ deleted: success });
    }
}
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=feedback.controller.js.map