require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt')
const path = require('path');
const cookieParser = require('cookie-parser');
const sequelize = require('../backend/config/sequelize');
const { authenticate, isAdmin } = require('../backend/middlewares/auth');

const productRoutes = require('../backend/routes/products');
const adminRoutes = require('../backend/routes/admin');
const { User } = require('../backend/models');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/public', express.static(path.join(__dirname, '../frontend/public')));

// View engine setup for admin dashboard
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/admin'));

// Routes
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});


app.get('/shop.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/shop.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/about.html'));
});

app.get('frontend/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/cart.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'));
});

// API Routes

app.use('/api/products', productRoutes);
app.use('/admin', adminRoutes);


// Database sync
sequelize.sync({ force: true }).then(async () => {
    try {
        // Create initial admin user
        const [adminUser] = await User.findOrCreate({
            where: { email: 'admin@cheese.com' },
            defaults: {
                password: await bcrypt.hash('admin123', 10),
                role: 'admin'
            }
        });

        console.log('Database synced successfully');
        if (adminUser._options.isNewRecord) {
            console.log('Admin user created:', adminUser.email);
        }
    } catch (error) {
        console.error('Database sync error:', error);
    }
});


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});