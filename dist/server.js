"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var session = require("express-session");
var exphbs = __importStar(require("express-handlebars"));
var routes_1 = __importDefault(require("./routes"));
var viewHelpers = __importStar(require("./utils/views/handlebarsHelpers"));
var connection_1 = __importDefault(require("./config/connection"));
var SequelizeStore = require("connect-session-sequelize");
var seqStore = SequelizeStore(session.Store);
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3001;
// Set up Handlebars.js engine with custom helpers
var hbs = exphbs.create({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path_1.default.join(__dirname, "../views/layouts"),
    partialsDir: path_1.default.join(__dirname, "../views/partials"),
    helpers: viewHelpers.getHelpers(),
});
console.log(hbs);
var sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new seqStore({
        db: connection_1.default,
    }),
};
app.use(session(sess));
// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", ".hbs");
app.set("view options", { layout: "layouts/main" });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// app.get("/some-resource", (req, res, next) => {
//   res.json("Hello World");
// });
app.use(routes_1.default);
// app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
connection_1.default.sync({ force: false }).then(function () {
    app.listen(PORT, function () { return console.log("Now listening"); });
});
