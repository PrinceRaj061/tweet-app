const express = require('express');
const auth = require('../middleware/auth');
const Tweet = require('../models/Tweet');
const router = express.Router();

// Create a new tweet
router.post('/', auth, async (req, res) => {
    const { content } = req.body;
    try {
        const newTweet = new Tweet({
            user: req.user.id,
            content
        });
        await newTweet.save();
        res.json(newTweet);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all tweets
router.get('/', async (req, res) => {
    try {
        const tweets = await Tweet.find().populate('user', 'username').sort({ createdAt: -1 });
        res.json(tweets);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
