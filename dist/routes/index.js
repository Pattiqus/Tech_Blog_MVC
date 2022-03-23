"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var comment_api_controller_1 = require("../controllers/api/comment.api.controller");
var HomeController_1 = require("../controllers/front-end/HomeController");
var LoginController_1 = require("../controllers/front-end/LoginController");
var UserApiController_1 = require("../controllers/api/UserApiController");
/**
 * Function: routes
 * @param app
 */
var appRouter = (0, express_1.Router)();
var homeController = new HomeController_1.HomeController();
var loginController = new LoginController_1.LoginController();
var commentApiController = new comment_api_controller_1.CommentApiController();
var UserApiController = new UserApiController_1.UserController();
// # Initial Routes: Front End
appRouter.get("/", homeController.showHomePage);
appRouter.get("/test", function (req, res) {
    res.json("Test");
});
// # Client-Side: Login Page
appRouter.get("/login", loginController.showLoginPage);
appRouter.post("/api/v1/auth", loginController.showLoginPage);
// # Back-End Routes
// # API Routes
//   app.get("/api/v1/comment", commentApiController);
exports.default = appRouter;
