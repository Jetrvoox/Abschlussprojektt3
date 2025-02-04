const router = require('express').Router();
const { Product } = require('../models');
const { authenticate } = require('../middlewares/auth');

router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

router.post('/', authenticate, async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

module.exports = router;