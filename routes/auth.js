require('dotenv').config();

const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const isAuthenticated = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token)
		return res
			.status(401)
			.json({ message: 'You are not allowed to view this source' });

	jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
		if (err) return res.send(401).json({ message: err.message });
		req.user = user;
		next();
	});
};

router.post('/login', async (req, res) => {
	const username = 'testadmin@gmail.com';
	const user = { name: username };

	const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);

	res.json({ accessToken });
});

module.exports = { router, isAuthenticated };
