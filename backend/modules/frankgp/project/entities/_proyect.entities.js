"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project_entities = void 0;
// Project
const project_collaborator_entity_1 = require("./project-collaborator.entity");
const project_dates_embeddable_1 = require("./project-dates.embeddable");
const project_entity_1 = require("./project.entity");
const project_image_entity_1 = require("./project-image.entity");
const project_link_entity_1 = require("./project-link.entity");
const project_skill_entity_1 = require("./project-skill.entity");
const user_entity_1 = require("./user.entity");
const user_skill_entity_1 = require("./user-skill.entity");
const project_technology_entity_1 = require("./project-technology.entity");
const user_link_entity_1 = require("./user-link.entity");
exports.project_entities = [
    project_collaborator_entity_1.CollaboratorEntity,
    project_dates_embeddable_1.ProjectDates,
    project_entity_1.ProjectEntity,
    project_image_entity_1.ProjectImageEntity,
    project_link_entity_1.ProjectLinkEntity,
    project_skill_entity_1.ProjectSkillEntity,
    user_entity_1.ProjectUserEntity,
    user_skill_entity_1.SkillUserEntity,
    project_technology_entity_1.TechnologyEntity,
    user_link_entity_1.UserLinkEntity,
];
//# sourceMappingURL=_proyect.entities.js.map