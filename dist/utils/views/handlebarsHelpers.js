"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpers = void 0;
var handlebarsHelpers = require("handlebars-helpers");
function getHelpers() {
    var hbsHelpers = handlebarsHelpers();
    var _helpers = {};
    // # Attach HandleBars Helpers
    _helpers = Object.assign({}, hbsHelpers);
    return _helpers;
}
exports.getHelpers = getHelpers;
