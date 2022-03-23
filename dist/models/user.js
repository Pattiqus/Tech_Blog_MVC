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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const { Model, DataTypes } = require('sequelize');
const bcrypt_1 = __importDefault(require("bcrypt"));
// const bcrypt = require('bcrypt');
const connection_1 = __importDefault(require("../config/connection"));
class user extends sequelize_1.Model {
    checkPassword(loginPw) {
        return bcrypt_1.default.compareSync(loginPw, this.password);
    }
    hashPassword(userData) {
        return bcrypt_1.default.hash(userData.password, 10);
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
}
user.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
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
        // validate: {
        //   length: 8,
        // },
    },
}, {
    hooks: {
        beforeCreate: (userData, options) => __awaiter(void 0, void 0, void 0, function* () {
            userData.password = yield userData.hashPassword(userData);
        }),
        beforeUpdate: (userData) => __awaiter(void 0, void 0, void 0, function* () {
            userData.password = yield userData.hashPassword(userData);
        }),
    },
    sequelize: connection_1.default,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
    tableName: "user",
});
// module.exports = User;
exports.default = user;
