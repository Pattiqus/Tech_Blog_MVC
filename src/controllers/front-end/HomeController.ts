// # Import: Packages
import { Request, Response } from "express";
// # Import: Defined Models
import { Controller } from "../Controller";

export class HomeController extends Controller {
  showHomePage(req: Request, res: Response) {
    const homePageData = {
      title: "Hello World",
      loggedIn: req.session.logged_in,
    };
    res.render("index", homePageData);
  }

  // showPosts(req: Request, res: Response) {

  // }
}
