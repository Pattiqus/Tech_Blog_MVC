"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const Controller_1 = require("../Controller");
const models_1 = require("../../models");
class AnalyticsController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.populateDashboard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield models_1.User.findByPk(req.session.user_id, {
                    attributes: { exclude: ['password'] },
                    include: [{ model: models_1.Post }],
                });
                // Serialize data so the template can read it
                const user = userData.get({ plain: true });
                // Pass serialized data and session flag into template
                res.render('dashboard', Object.assign(Object.assign({}, user), { logged_in: true }));
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        /**
         * Function: renderNewPost
         * Description: renders the new post page where you can create a new post
         * @param req
         * @param res
         */
        this.renderNewPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("new-post", {
                    logged_in: true
                });
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.renderEditPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = yield models_1.Post.findByPk(req.params.id, {
                    include: [
                        {
                            model: models_1.User,
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
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.RenderEditComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const commentData = yield models_1.Comment.findByPk(req.params.id, {
                    include: [
                        {
                            model: models_1.User,
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
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.AnalyticsController = AnalyticsController;
