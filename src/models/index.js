const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.admin = require("./admin.model.js")(mongoose);
db.book = require("./book.model.js")(mongoose);
db.bookUser = require("./bookUser.model")(mongoose);

module.exports = db;