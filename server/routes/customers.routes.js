const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers.controllers');

router.get('/', customersController.getAllCustomers);

router.post('/', customersController.addCustomer);

module.exports = router;
