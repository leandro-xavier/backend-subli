const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

exports.ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema({
    name: String,
}, {
    versionKey: false,
});

module.exports = mongoose.model("Role", roleSchema);