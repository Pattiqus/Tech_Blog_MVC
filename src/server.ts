import { isPropertyAccessChain } from "typescript";

import path from "path";
import express from "express";
import session = require("express-session");
import * as exphbs from "express-handlebars";
import appRouter from "./routes";
import * as helpers from "./utils/helpers";
import * as viewHelpers from "./utils/views/handlebarsHelpers";

import sequelize from "./config/connection";

import SequelizeStore = require("connect-session-sequelize");
const seqStore = SequelizeStore(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "../views/layouts"),
  partialsDir: path.join(__dirname, "../views/partials"),
  helpers: viewHelpers.getHelpers(),
});
console.log(hbs);

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new seqStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", ".hbs");
app.set("view options", { layout: "layouts/main" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// app.get("/some-resource", (req, res, next) => {
//   res.json("Hello World");
// });

app.use(appRouter);

// app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
