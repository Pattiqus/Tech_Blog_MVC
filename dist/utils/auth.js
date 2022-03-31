"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const withAuth = (req, res, next) => {
    // If the user isn't logged in, redirect them to the login route
    if (!req.session.logged_in) {
        res.redirect('/login');
    }
    else {
        next();
    }
};
exports.default = withAuth;
// module.exports = withAuth;
