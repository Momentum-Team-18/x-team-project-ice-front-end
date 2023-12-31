import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import './App.css';
import { Link } from "react-router-dom";

function Home({ updateToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
    updateToken(storedToken);
    setToken(storedToken);
    }
    }, []);

    const handleUsername = (event) => {
    setUsername(event.target.value);
    };

    const handleEmail = (event) => {
    setEmail(event.target.value);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    axios
        .post('https://questionapi.onrender.com/auth/token/login/', {
        username: username,
        password: password,
        })
        .then((res) => {
        updateToken(res.data.auth_token);
        localStorage.setItem('token', res.data.auth_token);
        });
    };

    const handleLogout = () => {
    axios
        .post(
        'https://questionapi.onrender.com/auth/token/logout/',
        {},
        {
        headers: {
            Authorization: `token ${token}`,
        },
        }
        )
        .then(() => {
        setToken(null);
        setLogoutMessage('Logged out successfully.');
        localStorage.removeItem('token');
        });
    };

    const handleRegister = (e) => {
    e.preventDefault();
    axios
        .post('https://questionapi.onrender.com/auth/users/', {
        username: username,
        password: password,
        email: email,
        })
        .then((res) => {
        updateToken(res.data.auth_token);
        localStorage.setItem('token', res.data.auth_token);
        });
    };

    const toggleRegistrationForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
    };

    const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    };

    return (
    <div>
        <button className="button registration-button" onClick={toggleRegistrationForm}>
        {showRegistrationForm ? 'Hide Registration Form' : 'Click For New Account 📝'}
        </button>
        {showRegistrationForm && (
        <form className="form" onSubmit={handleRegister}>
            <div>💻. New User Sign Up 💻</div>
            <div>
            <label>Email: </label>
            <input
                type="text"
                name="name"
                id="name"
                value={email}
                placeholder="Enter Your Email..."
                onChange={handleEmail}
                required
            />
            </div>
            <div>
            <label>Username: </label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Choose a Username..."
                value={username}
                onChange={handleUsername}
                required
            />
            </div>
            <div>
            <label>Password: </label>
            <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a Password..."
                required
            />
            </div>
            <div>
            <input type="submit" className="button" value="Register" />
            </div>
        </form>
        )}

        <button className="button login-button" onClick={toggleLoginForm}>
        {showLoginForm ? 'Hide Login Form' : 'Show Login Form'}
        </button>
        {showLoginForm && (
        <form className="form" onSubmit={handleSubmit}>
            <div>
            <label>Username: </label>
            <input
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={handleUsername}
            required
            />
        </div>
        <div>
            <label>Password: </label>
            <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <div>
            <input type="submit" className="button" value="Login" />
        </div>
        </form>
    )}

    <button className="button" onClick={handleLogout}>
        Logout ✌🏽
    </button>
    {logoutMessage && <div>{logoutMessage}</div>}
    </div>
);
}

// Home.propTypes = {
// updateToken: PropTypes.func.isRequired,
// };

export default Home;
