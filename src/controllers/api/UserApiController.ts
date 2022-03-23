import { Controller } from "../Controller";
import { Request, Response, Router } from "express";
import { User } from "../../models";
import session from "express-session";

export class UserController extends Controller {
  private router: Router;
  // #: Create User
  createUser = async (req: Request, res: Response) => {

      // # Detect: Empty object, return error 
      if( Object.keys( req.body ).length === 0 ) {
        return res.status(500).json({
          success: false,
          message: "Invalid request body. Please add correct fields.",
          status_code: "USER_API_CREATE_MISSING_FIELDS",
          error_message: null,
        })
      }

      console.log( req.body );

      // const userData = new User(req.body);
      try {
        const userData = await User.create(req.body);
        console.log( userData );
        
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          return res.status(200).json(userData);
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Could not successfully create a new user.",
          status_code: "USER_API_CREATE_ERROR",
          error_message: err,
        });
      }
  }
  // # User login
  loginUser() {
    this.router.post("/login", 
      async (req: Request, res: Response) => {
        try {
          const userData = await User.findOne({
            where: { email: req.body.email },
          });

          if (!userData) {
            res
              .status(400)
              .json({ message: "Incorrect email or password, please try again" });
            return;
          }
          const validPassword = await userData.checkPassword(req.body.password);

          if (!validPassword) {
            res
              .status(400)
              .json({ message: "Incorrect email or password, please try again" });
            return;
          }

          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
          });
        } catch (err) {
          res.status(400).json(err);
        }
      }
    );
  }
  // # User logout
  logoutUser() {
    this.router.post("/logout", (req: Request, res: Response) => {
      if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
    });
  }
}
