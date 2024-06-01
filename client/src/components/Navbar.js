import React from 'react';
import { Link } from 'react-router-dom';
import './../styles.css';

function Navbar({ token, setToken }) {
    const handleLogout = () => {
        setToken('');
    };

    return (
        <nav className="navbar">
            <ul>
                {!token && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                {token && (
                    <>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                        <li>
                            <Link to="/tweets">Tweets</Link>
                        </li>
                        <li>
                            <Link to="/my-tweets">My Tweets</Link>
                        </li>
                        <li>
                            <Link to="/new-tweet">New Tweets</Link>
                        </li>
                        <li>
                            <Link to="/notifications">Notifications</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
