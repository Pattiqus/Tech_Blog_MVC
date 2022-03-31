import { Controller } from "../Controller";
import { Request, Response } from "express";
import { Post } from "../../models";

export class PostApiController extends Controller {
    /**
     * Function: CreatePost
     * Description: Controller for creating post
     * @param req 
     * @param res 
     * @returns 
     */
    createPost = async (req: Request, res: Response) => {
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
            const newPost = await Post.create({
                ...req.body,
                user_id: req.session.user_id,
            });
            res.status(200).json(newPost)
        } catch (err) {
            res.status(500).json(err);
        }
    };
    /**
     * Function: updatePost
     * Description: Updates existing post, must be users own post
     * @param req 
     * @param res 
     * @returns 
     */
    updatePost = async (req: Request, res: Response) => {
        if( Object.keys( req.body ).length === 0 ) {
            return res.status(500).json({
              success: false,
              message: "Invalid request body. Please add correct fields.",
              status_code: "POST_UPDATE_API_CREATE_MISSING_FIELDS",
              error_message: null,
            });
        };

        console.log(req.body);

        try {
            const postData = await Post.update({
                title: req.body.title,
                content: req.body.content,
            },
                {
                    where: {
                        id: req.params.id
                    }
                });
            if (!postData) {
                res.status(404).json({ message: 'No post found with this ID!'}); 
                return;
            }
            res.status(200).json(postData);
        } catch (err) {
            res.status(500).json(err)
        }
    };
    /**
     * Function: deletePost
     * Description: Deletes an existing post, must be the original user.
     * @param req 
     * @param res 
     * @returns 
     */
    deletePost = async (req: Request, res: Response) => {
        try {
            const postData = await Post.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            });
    
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
            }
    
            res.status(200).json(postData);
        } catch (err) {
            res.status(500).json(err);
        }
    };

}
