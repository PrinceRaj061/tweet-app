import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles.css';

function Tweets({ token }) {
    const [content, setContent] = useState('');
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tweets', {
                    headers: { 'x-auth-token': token }
                });
                setTweets(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTweets();
    }, [token]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tweets/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setTweets(tweets.filter(tweet => tweet._id !== id));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container">
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
                    <li key={tweet._id}>
                        <div className="profile">
                            <img src={tweet?.user?.avatar} alt="Avatar" width="40" height="40" />
                            <strong>{tweet?.user?.username}</strong>
                        </div>
                        <p>{tweet.content}</p>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(tweet._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tweets;
