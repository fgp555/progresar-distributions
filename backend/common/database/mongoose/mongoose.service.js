"use strict";
// src/common/database/db-backup.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const mongoose_1 = __importDefault(require("mongoose"));
const envs_1 = require("../../../config/envs");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class MongooseService {
    constructor() {
        this.backupsDir = path_1.default.resolve(__dirname, "../../../../backups/db");
        this.mongoUri = envs_1.ENV_MONGO.URI;
        if (!fs_1.default.existsSync(this.backupsDir)) {
            fs_1.default.mkdirSync(this.backupsDir, { recursive: true });
        }
    }
    async backup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupFolder = path_1.default.join(this.backupsDir, `mongo-backup-${timestamp}`);
        const dumpCommand = `mongodump --uri="${this.mongoUri}" --out="${backupFolder}"`;
        try {
            const { stdout, stderr } = await execAsync(dumpCommand);
            if (stderr)
                console.error("⚠️ mongodump stderr:", stderr);
            console.info("✅ mongodump stdout:", stdout);
            return backupFolder;
        }
        catch (error) {
            console.error("❌ Backup failed:", error);
            throw new Error("MongoDB backup failed");
        }
    }
    async dropAllCollections() {
        const db = mongoose_1.default.connection;
        const dropped = [];
        const collections = Object.keys(db.collections);
        for (const name of collections) {
            try {
                await db.dropCollection(name);
                console.info(`🗑️ Dropped: ${name}`);
                dropped.push(name);
            }
            catch (err) {
                if (err.code === 26) {
                    console.warn(`⚠️ Collection not found: ${name}`);
                }
                else {
                    console.error(`❌ Failed to drop ${name}:`, err);
                    throw new Error(`Failed to drop collection ${name}`);
                }
            }
        }
        return dropped;
    }
}
exports.MongooseService = MongooseService;
//# sourceMappingURL=mongoose.service.js.map