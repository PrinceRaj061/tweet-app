import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tweets({ token }) {
    const [tweets, setTweets] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tweets');
                setTweets(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchTweets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:5000/api/tweets',
                { content },
                { headers: { 'x-auth-token': token } }
            );
            setTweets([res.data, ...tweets]);
            setContent('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's happening?"
                />
                <button type="submit">Tweet</button>
            </form>
            <ul>
                {tweets.map(tweet => (
                    <li key={tweet._id}>{tweet.content} by {tweet.user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default Tweets;
