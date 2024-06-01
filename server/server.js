const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
});

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now },
});

const tweetSchema = new mongoose.Schema({
    content: String,
    code: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

mongoose.connect('mongodb://localhost:27017/twitter-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/api/users', async (req, res) => {
    const { username, email, password, avatar } = req.body;
    const user = new User({ username, email, password, avatar });
    await user.save();
    res.send({ token: user.id });
});

app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
        res.send({ token: user.id });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

app.get('/api/tweets', async (req, res) => {
    const tweets = await Tweet.find().populate('user').populate('comments.user');
    res.send(tweets);
});

app.post('/api/tweets', async (req, res) => {
    const { content, code } = req.body;
    const token = req.header('x-auth-token');
    const userId = token; // Replace with actual user ID from token

    const tweet = new Tweet({ content, code, user: userId });
    await tweet.save();
    res.send(tweet);
});

app.delete('/api/tweets/:id', async (req, res) => {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    res.send('Tweet deleted successfully');
});

app.post('/api/tweets/:id/like', async (req, res) => {
    const { id } = req.params;
    const token = req.header('x-auth-token');
    const userId = token; // Replace with actual user ID from token

    const tweet = await Tweet.findById(id);
    if (tweet.likes.includes(userId)) {
        tweet.likes.pull(userId);
    } else {
        tweet.likes.push(userId);
    }
    await tweet.save();
    res.send(tweet);
});

app.post('/api/tweets/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const token = req.header('x-auth-token');
    const userId = token; // Replace with actual user ID from token

    const tweet = await Tweet.findById(id);
    tweet.comments.push({ user: userId, content });
    await tweet.save();
    res.send(tweet);
});

app.get('/api/tweets/my-tweets', async (req, res) => {
    console.log("/api/tweets/my-tweets" + req.body);
    const token = req.header('x-auth-token');
    const userId = token; // Replace with actual user ID from token

    const tweets = await Tweet.find({ user: userId }).populate('user').populate('comments.user');
    res.send(tweets);
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
