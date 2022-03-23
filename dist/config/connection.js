"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new sequelize_1.Sequelize(process.env.JAWSDB_URL);
    console.log("Can read JAWS");
}
else {
    sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    });
    console.log("Can read .env");
}
// module.exports = sequelize;
exports.default = sequelize;
