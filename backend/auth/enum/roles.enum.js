"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleEnum = exports.RolesEnum = void 0;
var RolesEnum;
(function (RolesEnum) {
    RolesEnum["Admin"] = "admin";
    RolesEnum["User"] = "user";
    RolesEnum["SuperAdmin"] = "superadmin";
    RolesEnum["Collaborator"] = "collaborator";
})(RolesEnum || (exports.RolesEnum = RolesEnum = {}));
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["USER"] = "user";
    UserRoleEnum["ADMIN"] = "admin";
    UserRoleEnum["SUPERADMIN"] = "superadmin";
    UserRoleEnum["COLLABORATOR"] = "collaborator";
    UserRoleEnum["DEVELOPER"] = "developer";
    UserRoleEnum["GUEST"] = "guest";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
//# sourceMappingURL=roles.enum.js.map