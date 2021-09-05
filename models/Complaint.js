const mongoose = require('mongoose');
//create complaint schema
const Schema = mongoose.Schema;
const ComplaintSchema = new Schema({
 date: Date,
 bp_number: String,
 select: String,
 department: String,
 description: String,
 type:{
     type: String,
     default:null,
    },
 subComplaint:{
        type: String,
        default:null,
    },
 status:{
        type: String,
        default:null,
    }

},{collection: "complaint"});
const Complaint = mongoose.model('Complaint', ComplaintSchema)
module.exports = Complaint;
