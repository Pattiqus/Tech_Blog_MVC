import { Request, Response, Router } from "express";
import { CommentApiController } from "../controllers/api/comment.api.controller";
import { HomeController } from "../controllers/front-end/HomeController";
import { LoginController } from "../controllers/front-end/LoginController";
import { UserController } from "../controllers/api/UserApiController";
import { PostController } from "@/controllers/api/PostApiController";
import withAuth from "@/utils/auth";

/**
 * Function: routes
 * @param app
 */

const appRouter = Router();
const homeController = new HomeController();
const loginController = new LoginController();
const commentApiController = new CommentApiController();
const postApiController = new PostController();
const UserApiController = new UserController();

// # Initial Routes: Front End
appRouter.get("/", homeController.showHomePage);

appRouter.get("/test", (req: Request, res: Response) => {
  res.json("Test");
});

// # Client-Side: Login Page
appRouter.get("/login", loginController.showLoginPage);
appRouter.post("/api/v1/auth", loginController.showLoginPage);


// # Back-End Routes
// # API Routes
appRouter.post("/api/v1/user", UserApiController.createUser);
appRouter.post("/api/v1/user/login",UserApiController.loginUser);
appRouter.post("/api/v1/user/logout", UserApiController.logoutUser);
appRouter.post("/api/v1/post", withAuth, postApiController.createPost);
appRouter.put("/api/v1/post/:id", withAuth, postApiController.updatePost);
appRouter.put("/api/v1/post/:id", withAuth, postApiController.deletePost);
appRouter.post("/api/v1/post/", withAuth, commentApiController.createComment);
appRouter.post("/api/v1/post/", withAuth, commentApiController.updateComment);
appRouter.post("/api/v1/post/", withAuth, commentApiController.deleteComment);

//   app.get("/api/v1/comment", commentApiController);


export default appRouter;
