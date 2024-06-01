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

const tweetSchema = new mongoose.Schema({
    content: String,
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userEmail: String,
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
    res.send({ token: email });
});

app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
        res.send({ token: email });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

app.get('/api/tweets', async (req, res) => {
    const tweets = await Tweet.find().populate('userEmail');
    res.send(tweets);
});

app.post('/api/tweets', async (req, res) => {
    const { content } = req.body;
    const token = req.header('x-auth-token');
    // Here, you should authenticate the user based on the token.
    // For demonstration purposes, we'll assume the user is already authenticated.

    // For the actual application, you should replace the next line with code to
    // retrieve the user ID from the token and create the tweet with that user ID.
    const userEmail = token;

    const tweet = new Tweet({ content, userEmail: userEmail });
    await tweet.save();
    res.send(tweet);
});

app.delete('/api/tweets/:id', async (req, res) => {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    res.send('Tweet deleted successfully');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

