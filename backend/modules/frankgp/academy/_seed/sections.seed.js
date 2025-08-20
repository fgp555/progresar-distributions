"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAcademySection = void 0;
const typeOrmConfig_1 = require("../../../../config/typeOrmConfig");
const sections_data_whatsapp_json_1 = __importDefault(require("./section-api/sections.data.whatsapp.json"));
const sections_data_aws_json_1 = __importDefault(require("./section-devops/sections.data.aws.json"));
const sections_data_azure_json_1 = __importDefault(require("./section-devops/sections.data.azure.json"));
const sections_data_cpanel_json_1 = __importDefault(require("./section-devops/sections.data.cpanel.json"));
const sections_data_cloudflare_json_1 = __importDefault(require("./section-system/sections.data.cloudflare.json"));
const sections_data_n8n_json_1 = __importDefault(require("./section-automatizacion/sections.data.n8n.json"));
const sections_data_windows_json_1 = __importDefault(require("./section-system/sections.data.windows.json"));
const sections_data_springboot_json_1 = __importDefault(require("./section-dev/sections.data.springboot.json"));
const sections_data_flutter_json_1 = __importDefault(require("./section-mobile/sections.data.flutter.json"));
const section_entity_1 = require("../dtos-entities/section.entity");
const course_entity_1 = require("../dtos-entities/course.entity");
// sections.data.springboot
const seedAcademySection = async () => {
    const sectionRepo = typeOrmConfig_1.AppDataSource.getRepository(section_entity_1.SectionEntity);
    const courseRepo = typeOrmConfig_1.AppDataSource.getRepository(course_entity_1.CourseEntity);
    const count = await sectionRepo.count();
    if (count === 0) {
        const allData = [
            // devops
            ...sections_data_aws_json_1.default,
            ...sections_data_azure_json_1.default,
            ...sections_data_cpanel_json_1.default,
            // mobile
            ...sections_data_flutter_json_1.default,
            // dev
            ...sections_data_whatsapp_json_1.default,
            ...sections_data_springboot_json_1.default,
            // system
            ...sections_data_cloudflare_json_1.default,
            ...sections_data_n8n_json_1.default,
            ...sections_data_windows_json_1.default,
            //
        ];
        for (const item of allData) {
            const course = await courseRepo.findOneBy({ id: item.courseId });
            if (!course) {
                console.warn(`⚠️ Course with id ${item.courseId} not found. Skipping section "${item.titleSection}"`);
                continue;
            }
            const section = sectionRepo.create({
                slug: item.slug,
                titleSection: item.titleSection,
                sectionOrder: item.sectionOrder,
                course,
                lessons: item.lessons || [],
            });
            await sectionRepo.save(section);
        }
        console.info("🌱 seedAcademySection seed complete ✅");
    }
    else {
        console.info("ℹ️ seedAcademySection table already has data. Seed skipped.");
    }
};
exports.seedAcademySection = seedAcademySection;
//# sourceMappingURL=sections.seed.js.map