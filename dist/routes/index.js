"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_api_controller_1 = require("../controllers/api/comment.api.controller");
const HomeController_1 = require("../controllers/front-end/HomeController");
const LoginController_1 = require("../controllers/front-end/LoginController");
const UserApiController_1 = require("../controllers/api/UserApiController");
/**
 * Function: routes
 * @param app
 */
const appRouter = (0, express_1.Router)();
const homeController = new HomeController_1.HomeController();
const loginController = new LoginController_1.LoginController();
const commentApiController = new comment_api_controller_1.CommentApiController();
const UserApiController = new UserApiController_1.UserController();
// # Initial Routes: Front End
appRouter.get("/", homeController.showHomePage);
appRouter.get("/test", (req, res) => {
    res.json("Test");
});
// # Client-Side: Login Page
appRouter.get("/login", loginController.showLoginPage);
appRouter.post("/api/v1/auth", loginController.showLoginPage);
appRouter.post("/api/v1/user", UserApiController.createUser);
// # Back-End Routes
// # API Routes
//   app.get("/api/v1/comment", commentApiController);
exports.default = appRouter;
