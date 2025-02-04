const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ id: user.id }, 'cheese_secret', { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'cheese_secret', { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ user });
});

module.exports = router;