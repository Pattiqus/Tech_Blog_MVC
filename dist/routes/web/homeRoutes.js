var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var router = require('express').Router();
var _a = require('../models'), Project = _a.Project, User = _a.User;
var withAuth = require('../utils/auth');
router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var postData, projects, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post.findAll({
                        include: [
                            {
                                model: User,
                                attributes: ['username'],
                            },
                        ],
                    })];
            case 1:
                postData = _a.sent();
                projects = postData.map(function (project) { return project.get({ plain: true }); });
                // Pass serialized data and session flag into template
                res.render('homepage', {
                    projects: projects,
                    logged_in: req.session.logged_in
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/project/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var projectData, project, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Project.findByPk(req.params.id, {
                        include: [
                            {
                                model: User,
                                attributes: ['name'],
                            },
                        ],
                    })];
            case 1:
                projectData = _a.sent();
                project = projectData.get({ plain: true });
                res.render('project', __assign(__assign({}, project), { logged_in: req.session.logged_in }));
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userData, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findByPk(req.session.user_id, {
                        attributes: { exclude: ['password'] },
                        include: [{ model: Project }],
                    })];
            case 1:
                userData = _a.sent();
                user = userData.get({ plain: true });
                res.render('profile', __assign(__assign({}, user), { logged_in: true }));
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/login', function (req, res) {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});
module.exports = router;