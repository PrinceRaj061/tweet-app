const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tweet', TweetSchema);
