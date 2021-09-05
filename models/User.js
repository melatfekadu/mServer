/* eslint-disable */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
 user_name: String,
 password: String,
 type: String
},{collection: "users"});
const User = mongoose.model('User', UserSchema)
module.exports = User;

