/* eslint-disable */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
 emp_id: String,
 first_name: String,
 last_name: String,
 email: String,
 phone_no: String,
 gender: String,
 department: String,
 user_name: String,
 type:String,
 password: String
},{collection: "employee"});
const Employee = mongoose.model('Employee', EmployeeSchema)
module.exports = Employee;