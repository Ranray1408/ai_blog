const pool = require("../db");
const { v4: uuidv4 } = require('uuid');

exports.getAll = async () => {
	const result = await pool.query('SELECT * FROM customers ORDER BY id');
	return result.rows;
};

exports.add = async (customer) => {
	const { first_name, last_name, email, phone, message, acceptence } = customer;


	const exists = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
	if (exists.rows.length > 0) {
		return { success: false, message: 'User with this email already exists.' };
	}

	const session_id = uuidv4();

	const result = await pool.query(
		`INSERT INTO customers (first_name, last_name, email, phone, message, acceptence, session_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
     	RETURNING *`,
		[first_name, last_name, email, phone, message, acceptence, session_id]
	);

	return { success: true, customer: result.rows[0]};
};
