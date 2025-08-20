"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
    UserRole["SUPERADMIN"] = "superadmin";
    UserRole["COLLABORATOR"] = "collaborator";
    UserRole["DEVELOPER"] = "developer";
    UserRole["GUEST"] = "guest";
})(UserRole || (exports.UserRole = UserRole = {}));
const UserSchema = new mongoose_1.Schema({
    googleId: { type: String },
    name: { type: String },
    username: { type: String, unique: true, sparse: true },
    lastName: { type: String, maxlength: 100 },
    displayName: { type: String, maxlength: 100 },
    email: { type: String, unique: true, sparse: true }, // `sparse` permite valores nulos repetidos
    whatsapp: { type: String },
    password: { type: String, select: true },
    photo: { type: String },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    isVisible: { type: Boolean, default: true },
    rawGoogle: { type: String },
}, {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map