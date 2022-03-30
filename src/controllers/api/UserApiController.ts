import { Controller } from "../Controller";
import { Request, Response } from "express";
import { User } from "../../models";

export class UserController extends Controller {
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
  loginUser = async (req: Request, res: Response) => {

    if( Object.keys( req.body ).length === 0 ) {
      return res.status(500).json({
        success: false,
        message: "Invalid request body. Please add correct fields.",
        status_code: "USER_API_LOGIN_MISSING_FIELDS",
        error_message: null,
      })
    }

    console.log( req.body );

    try {
      const userData = await User.findOne( req.body.email );
      console.log(userData);

      if (!userData) {
        res.status(400).json({ message: "Incorrect email or password, please try again" });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        return res.status(200).json(userData);
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Could not successfully log in.",
        status_code: "USER_API_LOGIN_ERROR",
        error_message: err,
      });
    }
  };
  // # User logout
  logoutUser = async (req: Request, res: Response) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  }
};
