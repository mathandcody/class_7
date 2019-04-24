const mongoose = require("mongoose");

// SCHEMA
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Users = mongoose.model("User", userSchema)

module.exports = Users;