const express = require('express');
const router = express.Router();
const productSchema = require('../models/product');
const auth = require('../helper/authMiddleware');

const getProduct = async (req, res, next) => {
	let product;
	try {
		product = await productSchema.findById(req.params.id);
		if (!product)
			return res.status(404).json({ message: `Product doesn't exist` });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.product = product;
	next();
};

router.get('/', auth, async (req, res) => {
	try {
		const products = await productSchema.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
router.get('/:id', auth, getProduct, (req, res) => {
	res.status(200).json(res.product);
});

router.post('/', auth, async (req, res) => {
	const newProduct = new productSchema({
		name: req.body.name,
		description: req.body.description,
		url: req.body.url,
		price: req.body.price,
	});

	try {
		await newProduct.save();

		res.status(201).json({ message: 'Product added successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.patch('/:id', auth, getProduct, async (req, res) => {
	res.product = { ...res.product, ...req.body, createdAt: Date.now() };

	try {
		await res.product.save();
		res.status(201).json({ message: 'Product updated successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/:id', auth, getProduct, async (req, res) => {
	try {
		await res.product.remove();
		res.json({ message: 'Product deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
