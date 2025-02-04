const router = require('express').Router();
const { Product, Order } = require('../models');
const { authenticate, isAdmin } = require('../middlewares/auth');

router.use(authenticate);
router.use(isAdmin);

router.get('/dashboard', async (req, res) => {
    const [products, orders] = await Promise.all([
        Product.count(),
        Order.count()
    ]);

    res.render('dashboard', {
        stats: { products, orders },
        recentOrders: await Order.findAll({ limit: 5, order: [['createdAt', 'DESC']] })
    });
});

module.exports = router;