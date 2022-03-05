"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var routes = require('./controllers');
var helpers = require('./utils/helpers');
var sequelize = require('./config/connection');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var app = express();
var PORT = process.env.PORT || 3001;
// Set up Handlebars.js engine with custom helpers
var hbs = exphbs.create({ helpers: helpers });
var sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () { return console.log('Now listening'); });
});
