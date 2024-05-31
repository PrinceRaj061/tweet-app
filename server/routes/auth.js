const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({ username, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, 'secret', { expiresIn: 3600 });
        res.json({ token, user: { id: newUser.id, username: newUser.username } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 3600 });
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
