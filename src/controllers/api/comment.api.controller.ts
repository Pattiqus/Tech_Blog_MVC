import { Controller } from "../Controller";
import { Request, Response } from "express";
import { Comment } from "../../models"

export class CommentApiController extends Controller {

    createComment = async (req: Request, res: Response) => {
        if( Object.keys( req.body ).length === 0 ) {
            return res.status(500).json({
              success: false,
              message: "Invalid request body. Please add correct fields.",
              status_code: "POST_API_CREATE_MISSING_FIELDS",
              error_message: null,
            });
        };

        console.log(req.body);

        try {
            if (req.session) {
                const newComment = await Comment.create({
                    description: req.body.description,
                    post_id: req.body.post_id,
                    user_id: req.session.user_id,
                })
                res.status(200).json(newComment);
            }
        } catch (err) {
            res.status(500).json(err);
        };
    };


    updateComment = async (req: Request, res: Response) => {
        if( Object.keys( req.body ).length === 0 ) {
            return res.status(500).json({
              success: false,
              message: "Invalid request body. Please add correct fields.",
              status_code: "POST_API_CREATE_MISSING_FIELDS",
              error_message: null,
            });
        };

        console.log(req.body);

        try {
            const commentData = await Comment.update({
                content: req.body.content
            },
                {
                    where: {
                        id: req.params.id
                    }
                });
    
            if (!commentData) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
    
            res.status(200).json(commentData);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    deleteComment = async (req: Request, res: Response) => {
        try {
            const commentData = await Comment.destroy({
                where: {
                    id: req.params.id
                },
            });
    
            if (!commentData) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.status(200).json(commentData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
