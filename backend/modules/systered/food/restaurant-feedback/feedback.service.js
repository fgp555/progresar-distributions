"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
// src/common/feedback/feedback.service.ts
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const feedback_entity_1 = require("./entities/feedback.entity");
class FeedbackService {
    static async create(body) {
        const clientCode = Math.floor(10000 + Math.random() * 90000).toString();
        const createdAt = new Date();
        const data = {
            ...body,
            socialMediaSource: Array.isArray(body.socialMediaSource)
                ? body.socialMediaSource.join(",")
                : body.socialMediaSource,
            clientCode,
            createdAt,
        };
        const exp = this.repo.create(data);
        const saved = await this.repo.save(exp);
        // Enviar a Google Sheets
        const values = [
            [
                saved.name,
                saved.email,
                saved.whatsapp,
                saved.birthday,
                saved.howDidYouKnowUs,
                saved.socialMediaSource || "",
                saved.branchVisited,
                saved.waiterName || "",
                saved.experienceRating.toString(),
                saved.improvementSuggestions || "",
                saved.clientCode,
                saved.createdAt.toLocaleString("sv-SE", { timeZone: "America/Lima" }),
            ],
        ];
        try {
            // await GoogleSheetService.appendToSheet(values);
        }
        catch (err) {
            console.error("❌ Error al enviar a Google Sheets:", err);
        }
        // Enviar correo con feedback
        try {
            // const emailService = new EmailService();
            // await emailService.sendFeedbackEmail(saved);
        }
        catch (err) {
            console.error("❌ Error al enviar correo de feedback:", err);
        }
        return saved;
    }
    static async findAll() {
        return await this.repo.find();
    }
    static async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    static async update(id, data) {
        const record = await this.repo.findOneBy({ id });
        if (!record)
            return null;
        this.repo.merge(record, data);
        return await this.repo.save(record);
    }
    static async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected === 1;
    }
}
exports.FeedbackService = FeedbackService;
FeedbackService.repo = typeOrmConfig_1.AppDataSource.getRepository(feedback_entity_1.RestaurantFeedbackEntity);
//# sourceMappingURL=feedback.service.js.map