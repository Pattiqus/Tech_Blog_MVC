import { Controller } from "../Controller";
import { Request, Response } from "express";
import { Post } from "../../models";

export class PostController extends Controller {
    newPost = async (req: Request, res: Response) => {
        if( Object.keys( req.body ).length === 0 ) {
            return res.status(500).json({
              success: false,
              message: "Invalid request body. Please add correct fields.",
              status_code: "POST_API_CREATE_MISSING_FIELDS",
              error_message: null,
            });
        };

        console.log (req.body);

        try {
            const 
        }
    }
}
