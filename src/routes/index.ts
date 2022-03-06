import { Request, Response, Router } from "express";
import { CommentApiController } from "../controllers/api/comment.api.controller";
import { HomeController } from "../controllers/front-end/HomeController";
import { LoginController } from "../controllers/front-end/LoginController";

/**
 * Function: routes
 * @param app
 */

const appRouter = Router();
const homeController = new HomeController();
const loginController = new LoginController();
const commentApiController = new CommentApiController();

// # Initial Routes: Front End
appRouter.get("/", homeController.showHomePage);

appRouter.get("/test", (req: Request, res: Response) => {
  res.json("Test");
});
//   app.get("/login", LoginController);

// # Back-End Routes
// # API Routes
//   app.get("/api/v1/comment", CommentApiController);
//   app.patch("/api/v1/comment/:id", UserApiController.patchUser);

export default appRouter;
