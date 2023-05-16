require('dotenv').config();

const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
	const username = 'testadmin@gmail.com';
	const user = { name: username };

	const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);

	res.json({ accessToken });
});

module.exports = router;
