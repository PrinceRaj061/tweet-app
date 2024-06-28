import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import './../styles.css';

function MyTweets({ token }) {
    const [tweets, setTweets] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

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
                        <button onClick={() => setIsEditing(true)}>< FaEdit /></button>
                        <button className="delete-button" onClick={() => handleDelete(tweet?._id)}>
                                < FaTrashAlt />
                            </button>
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
