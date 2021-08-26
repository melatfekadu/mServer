/* eslint-disable */
const mongoose = require('mongoose');

//create bill schema
const Schema = mongoose.Schema;
const BillSchema = new Schema({
 date: Date,
 username: String,
 service_charge: Number,
 payment_date: Date
},{collection: "bill"});
const Bill= mongoose.model('Bill', BillSchema)
module.exports = Bill;