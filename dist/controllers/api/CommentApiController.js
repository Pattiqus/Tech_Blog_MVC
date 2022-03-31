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
exports.CommentApiController = void 0;
const Controller_1 = require("../Controller");
const models_1 = require("../../models");
class CommentApiController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                if (req.session) {
                    const newComment = yield models_1.Comment.create({
                        description: req.body.description,
                        post_id: req.body.post_id,
                        user_id: req.session.user_id,
                    });
                    res.status(200).json(newComment);
                }
            }
            catch (err) {
                res.status(500).json(err);
            }
            ;
        });
        this.updateComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                const commentData = yield models_1.Comment.update({
                    content: req.body.content
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                if (!commentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
                }
                res.status(200).json(commentData);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const commentData = yield models_1.Comment.destroy({
                    where: {
                        id: req.params.id
                    },
                });
                if (!commentData) {
                    res.status(404).json({ message: 'No comment found with this id!' });
                    return;
                }
                res.status(200).json(commentData);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.CommentApiController = CommentApiController;
;
