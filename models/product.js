const { default: mongoose } = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	createdAt: {
		type: String,
		required: true,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Product', productSchema);
