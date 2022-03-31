import { Controller } from "../Controller";
import { Request, Response } from "express";
import { Post, User, Comment } from "../../models";


export class AnalyticsController extends Controller {

    populateDashboard = async (req: Request, res: Response) => {
        try {
            const userData = await User.findByPk(req.session.user_id, {
                attributes: { exclude: ['password'] },
                include: [{ model: Post }],
            });
    
            // Serialize data so the template can read it
            const user = userData.get({ plain: true });
    
            // Pass serialized data and session flag into template
            res.render('dashboard', {
                ...user,
                logged_in: true
            });
        } catch (err) {
            res.status(500).json(err);
        }
    };
    /**
     * Function: renderNewPost
     * Description: renders the new post page where you can create a new post
     * @param req 
     * @param res 
     */
    renderNewPost = async (req: Request, res: Response) => {
        try {
            res.render("new-post", {
                logged_in: true
            });
        } catch (err) {
            res.status(500).json(err);
        }
    };

    renderEditPost = async (req: Request, res: Response) => {
        try {
            const postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    },
                ],
            });
    
            // Serialize data so the template can read it
            const post = postData.get({ plain: true });
    
            // Pass serialized data and session flag into template
            res.render('edit-post', {
                post,
                logged_in: req.session.logged_in
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    RenderEditComment = async (req: Request, res: Response) => {
        try {
            const commentData = await Comment.findByPk(req.params.id, {
                include: [
                    {
                        model: <any>User,
                        attributes: ['name'],
                    },
                ],
            });
    
            // Serialize data so the template can read it
            const comment = commentData.get({ plain: true });
    
            // Pass serialized data and session flag into template
            res.render('edit-comment', {
                comment,
                logged_in: req.session.logged_in
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
