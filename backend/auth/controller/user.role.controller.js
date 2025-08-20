"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRoleController {
    // allRoles
    allRoles(req, res) {
        res.json({
            access: "ok",
            message: "Access granted to superadmin",
            role: "allRoles",
        });
    }
    // adminOnly
    admin(req, res) {
        res.json({
            access: "ok",
            message: "Access granted to superadmin",
            role: "admin",
        });
    }
    // superAdminOnly
    superAdmin(req, res) {
        res.json({
            access: "ok",
            message: "Access granted to superadmin",
            role: "superadmin",
        });
    }
}
exports.default = new UserRoleController();
//# sourceMappingURL=user.role.controller.js.map