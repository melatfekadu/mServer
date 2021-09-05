/* eslint-disable */
const Customer = require('../models/Customer.js');

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const Complaint = require('../models/Complaint.js');
//const router = express.Router();
module.exports.controller = function (app) {
  // get all complaints
  app.get('/complaints', (req, res) => {
    Complaint.find({}, 'date bp_number select department description type subComplaint status', function (error, users) {
      if (error) { console.log(error); }
      res.send(users);
    })
  })
  //get all assistant's complaint
  app.get('/complaints1', (req, res) => {
    Complaint.find({ department: 'Assistance' }, 'date bp_number select department description type subComplaint status', function (error, users) {
      if (error) { console.log(error); }
      res.send(users);
    })
  })
  //get customer service
  app.get('/complaints2', (req, res) => {
    Complaint.find({ department: 'Customer_Service' }, 'date bp_number select department description type subComplaint status', function (error, users) {
      if (error) { console.log(error); }
      res.send(users);
    })
  })
  app.get('/complaints3', (req, res) => {
    Complaint.find({ department: 'Operation_Maintenance' }, 'date bp_number select department description type subComplaint status', function (error, users) {
      if (error) { console.log(error); }
      res.send(users);
    })
  })
  //get a single complaints details
  app.get('/complaints/:id', (req, res) => {
    Complaint.findById(req.params.id, ' select department description type subComplaint status', function (error, user) {
      if (error) { console.log(error); }
      res.send(user)
    })
  })

  async function getBpById(id, req, res) {
    await Customer.findById(id, 'bp_number first_name last_name email phone_no address gender user_name password', function (error, customer) {
      if (error) { console.log(error); }
      bpNum = customer["bp_number"];
      console.log(this.bpNum);
      const bp = this.bpNum;
      const newComplaint = new Complaint({
        date: Date.now(),
        bp_number: bp,
        select: req.body.select,
        department: req.body.department,
        description: req.body.description,
        type: req.body.type,
        subComplaint: req.body.subComplaint,
        status: req.body.status,
        test: req.body.test
      });
      console.log(newComplaint);
      newComplaint.save((error, complaint) => {
        if (error) { console.log(error); }
        res.send(complaint);
      });
    })
  }
  // add a new user
  app.post('/complaints/addComplaint', (req, res) => {
    console.log("user_id");
    const user_id = req.body.token;
    let info = fs.readFileSync('./Extra/credentials.json', { encoding: 'utf8' });
    let json = JSON.parse(info);
    console.log(json[user_id]);
    console.log(user_id);
    let bpNum = "";

    let x = getBpById(json[user_id]["id"], req, res).then((value) => {
      console.log("sda");
      console.log(x);
    }).catch(() => {

      console.log("Error!");

    });


  });

  // update a user
  app.put('/complaints/:id', (req, res) => {

    Complaint.findById(req.params.id, function (error, complaint) {

      if (error) {
        console.error(error);
      }

      complaint.user_name = req.body.user_name
      complaint.address = req.body.address
      complaint.phone_no = req.body.phone_no
      complaint.date = req.body.date
      complaint.description = req.body.description
      complaint.type = req.body.type
      complaint.subComplaint = req.body.subComplaint
      complaint.status = req.body.status

      complaint.save(function (error, complaints) {
        if (error) { console.log(error); }
        res.send(complaints)
      })

    });

  })

  // delete a user
  app.delete('/complaints/:id', (req, res) => {
    Complaint.remove({
      _id: req.params.id
    }, function (error) {
      if (error) { console.error(error); }
      res.send({ success: true })
    })
  })
};


