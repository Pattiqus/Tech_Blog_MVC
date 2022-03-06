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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var Controller_1 = require("../Controller");
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.prototype.getUser = function () {
        var hello;
    };
    UserController.prototype.getAllUsers = function () {
        var hello;
    };
    UserController.prototype.updateUser = function () {
        var hello;
    };
    UserController.prototype.patchUser = function () {
        var hello;
        // # DO Sequelize stuff here.. like retrieve userById, & mutate..
    };
    UserController.prototype.deleteUser = function (req, res) {
        var hello;
    };
    UserController.prototype.helloLinter = function () {
        var waeabc;
        var webkitURL;
    };
    return UserController;
}(Controller_1.Controller));
exports.UserController = UserController;
