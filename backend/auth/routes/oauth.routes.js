"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("../../config/envs");
const oauth_controller_1 = require("../controller/oauth.controller");
const express_1 = require("express");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
// 🔐 Auth (Google Strategy)
if (envs_1.ENV_GOOGLE.CLIENT_ID) {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: envs_1.ENV_GOOGLE.CLIENT_ID,
        clientSecret: envs_1.ENV_GOOGLE.CLIENT_SECRET,
        callbackURL: envs_1.ENV_GOOGLE.CALLBACK_URL,
    }, async (accessToken, refreshToken, profile, done) => {
        return done(null, profile); // lo usamos como req.user
    }));
}
const controller = new oauth_controller_1.OAuthController();
const router = (0, express_1.Router)();
router.get("/login", passport_1.default.authenticate("google", { scope: ["profile", "email"] })
//
);
router.get("/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: envs_1.ENV_GOOGLE.CLIENT_URL + "/auth/login" }
//
), controller.googleCallback);
exports.default = router;
//# sourceMappingURL=oauth.routes.js.map