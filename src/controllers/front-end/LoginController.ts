import { Request, Response } from "express";
import { Controller } from "../Controller";

export class LoginController extends Controller {
  showLoginPage(req: Request, res: Response) {
    // # Retrieve: Data
    const loginPageData = {
      script_extras: ["login.js"],
      styles_extras: [],
    };
    // # Render: View
    res.render("login", loginPageData);
  }
}
