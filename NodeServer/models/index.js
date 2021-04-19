const dbConfig = require("../config/db.config.json");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.role = require("./role.model")(mongoose);

db.ROLES = ["patient", "admin", "docteur"];

module.exports = db;