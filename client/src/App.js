import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Tweets from './components/Tweets';
import './styles.css';

function App() {
    const [token, setToken] = useState('');

    if (!token) {
        return (
            <div>
                <h1>Login</h1>
                <Login setToken={setToken} />
                <h1>Register</h1>
                <Register setToken={setToken} />
            </div>
        );
    }

    return <Tweets token={token} />;
}

export default App;
