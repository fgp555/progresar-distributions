"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSQLService = void 0;
const typeOrmConfig_1 = require("../../config/typeOrmConfig");
const switchModule_1 = require("../../config/switchModule");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsersSQLService {
    constructor() {
        // this.repo = AppDataSource.getRepository(UserEntity);
        this.repo = typeOrmConfig_1.AppDataSource.getRepository((0, switchModule_1.selectUserEntity)());
    }
    async findAll() {
        const results = await this.repo.find();
        return {
            page: 1,
            totalPages: 1,
            totalItems: 1,
            hasMore: false,
            results,
        };
    }
    async findOne(id) {
        return await this.repo.findOneBy({ _id: id });
    }
    async create(dto) {
        const hashedPassword = await bcryptjs_1.default.hash(dto.password, 10);
        const user = this.repo.create({ ...dto, password: hashedPassword });
        return await this.repo.save(user);
    }
    async update(id, dto) {
        const user = await this.repo.findOneBy({ _id: id });
        if (!user)
            return null;
        // Si se envía un nuevo password, lo encriptamos
        if (dto.password) {
            dto.password = await bcryptjs_1.default.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        return await this.repo.save(user);
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.UsersSQLService = UsersSQLService;
//# sourceMappingURL=user.sql.service.js.map