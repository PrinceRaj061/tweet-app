import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles.css';

function Account({ token }) {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        avatar: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/me', {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/users/${token}`, user, {
                headers: { 'x-auth-token': token }
            });
            alert('Account updated successfully');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container">
            <h1>Account Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user?.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Avatar URL</label>
                    <input
                        type="text"
                        name="avatar"
                        value={user.avatar}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Account</button>
            </form>
        </div>
    );
}

export default Account;
