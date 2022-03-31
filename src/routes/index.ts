import { Request, Response, Router, Express } from "express";
import { CommentApiController } from "../controllers/api/CommentApiController";
import { HomeController } from "../controllers/front-end/HomeController";
import { LoginController } from "../controllers/front-end/LoginController";
// import { UserController } from "../controllers/api/UserApiController";
// import { PostController } from "../controllers/api/PostApiController";
import withAuth from "../utils/auth";
import { DashboardController } from "../controllers/dashboard/DashboardController";
import { classImporter } from "../utils/classImporter";
import * as classImporter2 from "../utils/classImporter";

/**
 * Function: routes
 * @param app
 */

const appRouter = Router();


export default async function generateRoutes( app?: Express  ) {
  const routes = {
    dashboard: <any>await classImporter('./controllers/dashboard'),
    front_end: <any>await classImporter('./controllers/front-end'),
    front_end_api: <any>await classImporter('./controllers/api'),
  };

  console.log( await routes );

  // # Initial Routes: Front End
  appRouter.get("/", routes.front_end.HomeController.showHomePage);

  // appRouter.get("/test", (req: Request, res: Response) => {
  //   res.json("Test");
  // });

  // # Client-Side: Login Page
  appRouter.get("/login", routes.front_end.LoginController.showLoginPage);
  appRouter.post("/api/v1/auth", routes.front_end.LoginController.showLoginPage);


  // # Back-End Routes
  appRouter.get("/dashboard", withAuth, routes.dashboard.DashboardController.populateDashboard);
  appRouter.get("/newPost", withAuth, routes.dashboard.DashboardController.renderNewPost);
  appRouter.get("/newPost/:id", withAuth, routes.dashboard.DashboardController.renderEditPost);
  appRouter.get("/editComment/:id", withAuth, routes.dashboard.DashboardController.RenderEditComment)


  // # API Routes
  appRouter.post("/api/v1/user", routes.front_end_api.UserApiController.createUser);
  appRouter.post("/api/v1/user/login", routes.front_end_api.UserApiController.loginUser);
  appRouter.post("/api/v1/user/logout", routes.front_end_api.UserApiController.logoutUser);
  appRouter.post("/api/v1/post", withAuth, routes.front_end_api.postApiController.createPost);
  appRouter.put("/api/v1/post/:id", withAuth, routes.front_end_api.postApiController.updatePost);
  appRouter.put("/api/v1/post/:id", withAuth, routes.front_end_api.postApiController.deletePost);
  appRouter.post("/api/v1/post/", withAuth, routes.front_end_api.commentApiController.createComment);
  appRouter.post("/api/v1/post/", withAuth, routes.front_end_api.commentApiController.updateComment);
  appRouter.post("/api/v1/post/", withAuth, routes.front_end_api.commentApiController.deleteComment);

  //   app.get("/api/v1/comment", commentApiController);
  app.use( appRouter );
};
