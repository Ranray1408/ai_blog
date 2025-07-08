const customersService = require('../services/customers.service');

exports.getAllCustomers = async (req, res) => {
	try {
		const customers = await customersService.getAll();
		const total = customers.length;

		res
			.set('Content-Range', `customers 0-${total - 1}/${total}`)
			.set('Access-Control-Expose-Headers', 'Content-Range')
			.status(200)
			.json(customers);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addCustomer = async (req, res) => {
	try {
		const newCustomer = req.body;
		const result = await customersService.add(newCustomer);

		if (result.success) {
			res
				.status(200)
				.json(result);
		} else {
			res.status(400).json(result);
		}

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
