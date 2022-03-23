"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const Controller_1 = require("../Controller");
class LoginController extends Controller_1.Controller {
    showLoginPage(req, res) {
        // # Retrieve: Data
        const loginPageData = {
            script_extras: ["loginSignup.js"],
            styles_extras: [],
        };
        // # Render: View
        res.render("login", loginPageData);
    }
}
exports.LoginController = LoginController;
