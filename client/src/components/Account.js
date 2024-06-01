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
    const [isEditing, setIsEditing] = useState(false);

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
            const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, user, {
                headers: { 'x-auth-token': token }
            });
            setUser(res.data);
            setIsEditing(false);
            alert('Account updated successfully');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container">
            <h1>Account Information</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
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
                    <button type="submit">Update Account</button><br></br>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <div className="profile">
                        <img src={user.avatar} alt="Avatar" width="100" height="100" />
                        <div>
                            <h2>{user.username}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default Account;
