// Submission.js
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    problem: {
        type: mongoose.Schema.ObjectId,
        ref: 'Problem',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: [true, 'Please add the code']
    },
    language: {
        type: String,
        enum: ['javascript', 'python', 'java'],
        default: 'javascript'
    },
    status: {
        type: String,
        enum: ['Accepted', 'Rejected'],
        default: 'Rejected'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
