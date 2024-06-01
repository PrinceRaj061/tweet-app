import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tweets from './components/Tweets';
import Navbar from './components/Navbar';
import Account from './components/Account';
import MyTweets from './components/MyTweets';
import NewTweet from './components/NewTweet';
import Notifications from './components/Notifications';
import './styles.css';

function App() {
    const [token, setToken] = useState('');

    return (
        <Router>
            <Navbar token={token} setToken={setToken} />
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register setToken={setToken} />} />
                <Route path="/account" element={<Account token={token} />} />
                <Route path="/tweets" element={<Tweets token={token} />} />
                <Route path="/my-tweets" element={<MyTweets token={token} />} />
                <Route path="/new-tweet" element={<NewTweet token={token} />} />
                <Route path="/notifications" element={<Notifications token={token} />} />
            </Routes>
        </Router>
    );
}

export default App;
