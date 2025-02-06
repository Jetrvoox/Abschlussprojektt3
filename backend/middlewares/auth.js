const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).redirect('/login.html');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cheese_secret');
        const user = await User.findByPk(decoded.id);

        if (!user) {
            res.clearCookie('jwt');
            return res.status(401).redirect('/login.html');
        }

        req.user = user;
        next();

    } catch (error) {
        res.clearCookie('jwt');
        res.status(401).redirect('/login.html');
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Forbidden - Admin access required');
};

module.exports = { authenticate, isAdmin };