import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles.css';

function Tweets({ token }) {
    const [content, setContent] = useState('');
    const [code, setCode] = useState('');
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
                { content, code },
                { headers: { 'x-auth-token': token } }
            );
            setTweets([res.data, ...tweets]);
            setContent('');
            setCode('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleLike = async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/api/tweets/${id}/like`,
                {},
                { headers: { 'x-auth-token': token } }
            );
            setTweets(tweets.map(tweet => (tweet._id === id ? res.data : tweet)));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleComment = async (id, comment) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/api/tweets/${id}/comments`,
                { content: comment },
                { headers: { 'x-auth-token': token } }
            );
            setTweets(tweets.map(tweet => (tweet._id === id ? res.data : tweet)));
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
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code block (optional)"
                    rows="4"
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
                        <p>{tweet?.content}</p>
                        {tweet.code && <pre><code>{tweet?.code}</code></pre>}
                        <div>
                            <button onClick={() => handleLike(tweet?._id)}>
                                {tweet?.likes.includes('user_id_from_token') ? 'Unlike' : 'Like'} ({tweet?.likes?.length})
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(tweet?._id)}>
                                Delete
                            </button>
                        </div>
                        <ul>
                            {tweet?.comments?.map(comment => (
                                <li key={comment?._id}>
                                    <strong>{comment?.user?.username}</strong>: {comment?.content}
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleComment(tweet._id, e.target.comment.value);
                            e.target.comment.value = '';
                        }}>
                            <input type="text" name="comment" placeholder="Add a comment..." />
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tweets;
