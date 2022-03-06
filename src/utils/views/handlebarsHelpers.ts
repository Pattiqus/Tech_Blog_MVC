import handlebarsHelpers = require("handlebars-helpers");

export function getHelpers() {
  const hbsHelpers = handlebarsHelpers();
  let _helpers: { [k: string]: any } = {};

  // # Attach HandleBars Helpers
  _helpers = Object.assign({}, hbsHelpers);

  return _helpers;
}
