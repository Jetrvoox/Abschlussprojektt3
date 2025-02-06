const router = require('express').Router();
const { authenticate, isAdmin } = require('../middlewares/auth');
const { Product, Order } = require('../models');

router.get('/dashboard', authenticate, isAdmin, async (req, res) => {
    try {
        const products = await Product.findAll();
        const orders = await Order.findAll();

        res.render('dashboard', {
            totalProducts: products.length,
            totalOrders: orders.length,
            recentOrders: orders.slice(-5).reverse()
        });

    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).send('Error loading dashboard');
    }
});

module.exports = router;