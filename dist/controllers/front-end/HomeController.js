"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
// # Import: Defined Models
const Controller_1 = require("../Controller");
class HomeController extends Controller_1.Controller {
    showHomePage(req, res) {
        const homePageData = {
            title: "Hello World",
            loggedIn: req.session.logged_in,
        };
        res.render("index", homePageData);
    }
}
exports.HomeController = HomeController;
