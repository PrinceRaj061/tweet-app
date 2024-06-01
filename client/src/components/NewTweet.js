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
        </div>
    );
}

export default Tweets;
