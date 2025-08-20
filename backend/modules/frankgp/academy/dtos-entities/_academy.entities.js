"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academy_entities = void 0;
// Academy
const category_entity_1 = require("./category.entity");
const course_entity_1 = require("./course.entity");
const lesson_entity_1 = require("./lesson.entity");
const lesson_link_entity_1 = require("./lesson-link.entity");
const lesson_link_premium_entity_1 = require("./lesson-link-premium.entity");
const section_entity_1 = require("./section.entity");
exports.academy_entities = [
    category_entity_1.CategoryEntity,
    course_entity_1.CourseEntity,
    lesson_entity_1.LessonEntity,
    lesson_link_entity_1.LessonLinkEntity,
    lesson_link_premium_entity_1.LessonLinkPremiumEntity,
    section_entity_1.SectionEntity,
];
//# sourceMappingURL=_academy.entities.js.map