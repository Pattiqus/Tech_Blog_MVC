"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
// const { Model, DataTypes } = require('sequelize');
var bcrypt_1 = __importDefault(require("bcrypt"));
// const bcrypt = require('bcrypt');
var connection_1 = __importDefault(require("../config/connection"));
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Users.prototype.checkPassword = function (loginPw) {
        return bcrypt_1.default.compareSync(loginPw, this.password);
    };
    Users.prototype.hashPassword = function (userData) {
        return bcrypt_1.default.hash(userData.password, 10);
    };
    Users.prototype.getPassword = function () {
        return this.password;
    };
    Users.prototype.setPassword = function (password) {
        this.password = password;
    };
    return Users;
}(sequelize_1.Model));
Users.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            length: 8,
        },
    },
}, {
    hooks: {
        beforeCreate: function (userData, options) {
            userData.password = userData.hashPassword(userData);
        },
        beforeUpdate: function (userData) {
            userData.password = userData.hashPassword(userData);
        },
    },
    sequelize: connection_1.default,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "users",
});
// module.exports = User;
exports.default = Users;
