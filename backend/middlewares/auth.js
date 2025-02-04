const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
    authenticate: async (req, res, next) => {
        const token = req.cookies.jwt;
        if (!token) return res.redirect('/login.html');

        try {
            const decoded = jwt.verify(token, 'cheese_secret');
            const user = await User.findByPk(decoded.id);
            if (!user) throw new Error();
            req.user = user;
            next();
        } catch (err) {
            res.clearCookie('jwt');
            res.redirect('/login.html');
        }
    },

    isAdmin: (req, res, next) => {
        if (req.user?.role !== 'admin') return res.status(403).send('Forbidden');
        next();
    }
};