"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const connection_1 = __importDefault(require("../config/connection"));
class Comment extends core_1.Model {
}
Comment.init({
    id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: core_1.DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    post_id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "post",
            key: "id",
        },
    },
    date_commented: {
        type: core_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: core_1.DataTypes.NOW,
    }
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
});
exports.default = Comment;
