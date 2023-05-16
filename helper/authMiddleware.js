require('dotenv').config();
const jwt = require('jsonwebtoken');

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

module.exports = isAuthenticated;
