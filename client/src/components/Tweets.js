import React, { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import './../styles.css';

function Tweets({ token }) {
    const [tweets, setTweets] = useState([]);

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
    
    useEffect(() => {
        

        fetchTweets();
    }, [token]);


    const handleLike = async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/api/tweets/${id}/like`,
                {},
                { headers: { 'x-auth-token': token } }
            );
            fetchTweets();
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
            fetchTweets();
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container">
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
                            <FaThumbsUp /> ({tweet?.likes?.length})
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
