"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = __importDefault(require("./post"));
var user_1 = __importDefault(require("./user"));
var comment_1 = __importDefault(require("./comment"));
exports.default = {
    Post: post_1.default,
    User: user_1.default,
    Comment: comment_1.default,
};
