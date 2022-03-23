"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpers = void 0;
const handlebarsHelpers = require("handlebars-helpers");
function getHelpers() {
    const hbsHelpers = handlebarsHelpers();
    let _helpers = {};
    // # Attach HandleBars Helpers
    _helpers = Object.assign({}, hbsHelpers);
    return _helpers;
}
exports.getHelpers = getHelpers;
