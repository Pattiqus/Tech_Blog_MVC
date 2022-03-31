"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
// # Import: Defined Models
const Controller_1 = require("../Controller");
class HomeController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.showHomePage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const homePageData = {
                title: "Hello World",
                loggedIn: req.session.logged_in,
            };
            res.render("index", homePageData);
        });
        // showPosts(req: Request, res: Response) {
        // }
    }
}
exports.HomeController = HomeController;
