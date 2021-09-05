const Customer = require('../models/Customer.js');
//const router = express.Router();
module.exports.controller = function (app) {
  // get all users
  app.get('/customers', (req, res) => {
    Customer.find({}, 'bp_number first_name last_name email phone_no address gender user_name password ', function (error, customers) {
      if (error) { console.log(error); }
      res.send(customers);
    })
  })

  //get a single user details
  app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id, 'bp_number first_name last_name email phone_no address gender user_name password', function (error, customer) {
      if (error) { console.log(error); }
      res.send(customer)
    })
  })

  app.get('/customer/:bp_number', (req, res) => {
    Customer.findById(req.params.bp_number, 'bp_number first_name last_name email phone_no address gender user_name password', function (error, customer) {
      if (error) { console.log(error); }
      console.log(customer);
      res.send(customer)
    })
  }),
  //check user existance
  app.get('/customers/isUsernameTaken', (req, res) => {
    Customer.countDocuments({ bp_number: req.query.bp_number }, function (error, customerCount) {
    if (error) { console.log(error); }
    //customerCount= 3;
    res.json({ 
      isTaken: customerCount != 0
    })
   })
  })
  // add a new user
  app.post('/customers', (req, res) => {
    const newCustomer = new Customer({
      bp_number: req.body.bp_number,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_no: req.body.phone_no,
      address: req.body.address,
      gender: req.body.gender,
      user_name: req.body.user_name,
      password: req.body.password

    });
    newCustomer.save((error, customer) => {
      if (error) { console.log(error); }
      res.send(customer);
    });
  });

  // update a user
  app.put('/customer/:id', (req, res) => {
    Customer.findById(req.params.id,  'bp_number first_name last_name email phone_no address gender user_name password ', function (error, customer) {
      if (error) { console.error(error); }
      customer.bp_number=req.body.bp_number
      customer.first_name = req.body.first_name
      customer.last_name = req.body.last_name
      customer.email = req.body.email
      customer.phone_no = req.body.phone_no
      customer.address = req.body.address
      customer.gender = req.body.gender
      customer.user_name = req.body.user_name
      customer.password = req.body.password

      customer.save(function (error, customer) {
        if (error) { console.log(error); }
        res.send(customer)
      })
    })
  })

  // delete a user
  app.delete('/customer/:id', (req, res) => {
    Customer.remove({_id: req.params.id
    }, function (error) {
      if (error) { console.error(error); }
      res.send({ success: true })
    })
  })

};

