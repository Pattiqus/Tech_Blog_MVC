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
exports.PostApiController = void 0;
const Controller_1 = require("../Controller");
const models_1 = require("../../models");
class PostApiController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        /**
         * Function: CreatePost
         * Description: Controller for creating post
         * @param req
         * @param res
         * @returns
         */
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.body).length === 0) {
                return res.status(500).json({
                    success: false,
                    message: "Invalid request body. Please add correct fields.",
                    status_code: "POST_API_CREATE_MISSING_FIELDS",
                    error_message: null,
                });
            }
            ;
            console.log(req.body);
            try {
                const newPost = yield models_1.Post.create(Object.assign(Object.assign({}, req.body), { user_id: req.session.user_id }));
                res.status(200).json(newPost);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        /**
         * Function: updatePost
         * Description: Updates existing post, must be users own post
         * @param req
         * @param res
         * @returns
         */
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.body).length === 0) {
                return res.status(500).json({
                    success: false,
                    message: "Invalid request body. Please add correct fields.",
                    status_code: "POST_UPDATE_API_CREATE_MISSING_FIELDS",
                    error_message: null,
                });
            }
            ;
            console.log(req.body);
            try {
                const postData = yield models_1.Post.update({
                    title: req.body.title,
                    content: req.body.content,
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                if (!postData) {
                    res.status(404).json({ message: 'No post found with this ID!' });
                    return;
                }
                res.status(200).json(postData);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        /**
         * Function: deletePost
         * Description: Deletes an existing post, must be the original user.
         * @param req
         * @param res
         * @returns
         */
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = yield models_1.Post.destroy({
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
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.PostApiController = PostApiController;
