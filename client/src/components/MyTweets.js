import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles.css';

function MyTweets({ token }) {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchMyTweets = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tweets/my-tweets', {
                    headers: { 'x-auth-token': token }
                });
                setTweets(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMyTweets();
    }, [token]);

    return (
        <div className="container">
            <h1>My Tweets</h1>
            <ul>
                {tweets.map(tweet => (
                    <li key={tweet._id}>
                        <div className="profile">
                            <img src={tweet.user.avatar} alt="Avatar" width="40" height="40" />
                            <strong>{tweet.user.username}</strong>
                        </div>
                        <p>{tweet.content}</p>
                        {tweet.code && <pre><code>{tweet.code}</code></pre>}
                        <ul>
                            {tweet.comments.map(comment => (
                                <li key={comment._id}>
                                    <strong>{comment.user.username}</strong>: {comment.content}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyTweets;
