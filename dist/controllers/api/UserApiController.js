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
exports.UserApiController = void 0;
const Controller_1 = require("../Controller");
const models_1 = require("../../models");
class UserApiController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        // #: Create User
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // # Detect: Empty object, return error 
            if (Object.keys(req.body).length === 0) {
                return res.status(500).json({
                    success: false,
                    message: "Invalid request body. Please add correct fields.",
                    status_code: "USER_API_CREATE_MISSING_FIELDS",
                    error_message: null,
                });
            }
            console.log(req.body);
            try {
                const userData = yield models_1.User.create(req.body);
                console.log(userData);
                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;
                    return res.status(200).json(userData);
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not successfully create a new user.",
                    status_code: "USER_API_CREATE_ERROR",
                    error_message: err,
                });
            }
        });
        // # User login
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.body).length === 0) {
                return res.status(500).json({
                    success: false,
                    message: "Invalid request body. Please add correct fields.",
                    status_code: "USER_API_LOGIN_MISSING_FIELDS",
                    error_message: null,
                });
            }
            console.log(req.body);
            try {
                const userData = yield models_1.User.findOne(req.body.email);
                console.log(userData);
                if (!userData) {
                    res.status(400).json({ message: "Incorrect email or password, please try again" });
                    return;
                }
                const validPassword = yield userData.checkPassword(req.body.password);
                if (!validPassword) {
                    res.status(400).json({ message: 'Incorrect email or password, please try again' });
                    return;
                }
                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;
                    return res.status(200).json(userData);
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not successfully log in.",
                    status_code: "USER_API_LOGIN_ERROR",
                    error_message: err,
                });
            }
        });
        // # User logout
        this.logoutUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.session.logged_in) {
                req.session.destroy(() => {
                    res.status(204).end();
                });
            }
            else {
                res.status(404).end();
            }
        });
    }
}
exports.UserApiController = UserApiController;
;
