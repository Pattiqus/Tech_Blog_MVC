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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { UserController } from "../controllers/api/UserApiController";
// import { PostController } from "../controllers/api/PostApiController";
const auth_1 = __importDefault(require("../utils/auth"));
const classImporter_1 = require("../utils/classImporter");
/**
 * Function: routes
 * @param app
 */
const appRouter = (0, express_1.Router)();
function generateRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const routes = {
            dashboard: yield (0, classImporter_1.classImporter)('./controllers/dashboard'),
            front_end: yield (0, classImporter_1.classImporter)('./controllers/front-end'),
            front_end_api: yield (0, classImporter_1.classImporter)('./controllers/api'),
        };
        console.log(yield routes);
        // # Initial Routes: Front End
        appRouter.get("/", routes.front_end.HomeController.showHomePage);
        // appRouter.get("/test", (req: Request, res: Response) => {
        //   res.json("Test");
        // });
        // # Client-Side: Login Page
        appRouter.get("/login", routes.front_end.LoginController.showLoginPage);
        appRouter.post("/api/v1/auth", routes.front_end.LoginController.showLoginPage);
        // # Back-End Routes
        appRouter.get("/dashboard", auth_1.default, routes.dashboard.DashboardController.populateDashboard);
        appRouter.get("/newPost", auth_1.default, routes.dashboard.DashboardController.renderNewPost);
        appRouter.get("/newPost/:id", auth_1.default, routes.dashboard.DashboardController.renderEditPost);
        appRouter.get("/editComment/:id", auth_1.default, routes.dashboard.DashboardController.RenderEditComment);
        // # API Routes
        appRouter.post("/api/v1/user", routes.front_end_api.UserApiController.createUser);
        appRouter.post("/api/v1/user/login", routes.front_end_api.UserApiController.loginUser);
        appRouter.post("/api/v1/user/logout", routes.front_end_api.UserApiController.logoutUser);
        appRouter.post("/api/v1/post", auth_1.default, routes.front_end_api.postApiController.createPost);
        appRouter.put("/api/v1/post/:id", auth_1.default, routes.front_end_api.postApiController.updatePost);
        appRouter.put("/api/v1/post/:id", auth_1.default, routes.front_end_api.postApiController.deletePost);
        appRouter.post("/api/v1/post/", auth_1.default, routes.front_end_api.commentApiController.createComment);
        appRouter.post("/api/v1/post/", auth_1.default, routes.front_end_api.commentApiController.updateComment);
        appRouter.post("/api/v1/post/", auth_1.default, routes.front_end_api.commentApiController.deleteComment);
        //   app.get("/api/v1/comment", commentApiController);
        app.use(appRouter);
    });
}
exports.default = generateRoutes;
;
