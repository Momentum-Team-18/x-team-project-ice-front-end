import PropTypes from 'prop-types';
import { useState } from "react";
import React from 'react'
import axios from 'axios'



function Home({setToken}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [showRegistrationForm, setShowRegistrationForm] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [logoutMessage, setLogoutMessage] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('https://questionapi.onrender.com/auth/token/login/', {
                username: username,
                password: password,
            })
            .then((res) => setToken(res.data.auth_token))
    }
        
    const handleLogout = () => {
        // send request to log out on the server
        axios
          .post(
            'https://questionapi.onrender.com/auth/token/logout/',
            {},
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          )
          .then(() =>
            // log out in React
            setAuth('', null),
    
          )
      }

    const handleRegister = (e) => {
        e.preventDefault()
        axios
            .post('https://questionapi.onrender.com/auth/users/', {
                username: username,
                password: password,
                email: email,
            })
            .then((res) => setToken(res.data.auth_user))
    }

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm)
    }
        
    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm)
    }
    
    // the handle register is not working right now,
    // not exactly sure why, but i think it has something to do with the token
    // okay do we need to make a new component for login, logout, and signup?
        
    return (
        <div>
            <button onClick={toggleRegistrationForm}>
                {showRegistrationForm ? 'Hide Registration Form' : 'Click For New Account 📝'}</button>
            {showRegistrationForm && (
                <form onSubmit={handleRegister}>
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
                            required></input>
                    </div>
                    <div>
                        <label>Username: </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            // value={username}
                            placeholder="Choose a Username..."
                            value={username}
                            onChange={handleUsername}
                            required></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            type="text"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Choose a Password..."
                            required></input>
                    </div>
            
                    <div>
                        <input
                            type='submit'
                            value="Register">
                        </input>
                    </div>
                </form>)}
                
            <button onClick={toggleLoginForm}>
                {showLoginForm ? 'Hide Login Form' : 'Show Login Form'}
            </button>
            {showLoginForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username: </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={username}
                            onChange={handleUsername}
                            required></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            type="text"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required></input>
                    </div>
            
                    <div>
                        <input
                            type='submit'
                            value="Login">
                        </input>
                        </div>
                        
                    </form>
                    
            )}
        <button onClick={handleLogout}>Logout ✌🏽</button>
            {logoutMessage && <div>{logoutMessage}</div>}
        </div>
    )
}
    
export default Home