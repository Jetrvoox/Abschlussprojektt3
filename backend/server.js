const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/sequelize');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const { User, Product, Order } = require('./models');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('../frontend/public'));
app.set('view engine', 'ejs');
app.set('views', '../frontend/admin');

// Sync database and relationships
sequelize.sync({ force: true }).then(async () => {
    // Create admin user (demo only - remove in production!)
    await User.create({
        email: 'admin@cheese.com',
        password: 'admin123',
        role: 'admin'
    });
    console.log('Database synced!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () => console.log('Server running on http://localhost:3000'));