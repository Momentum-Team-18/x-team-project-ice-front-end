import { useState } from "react";
import React from 'react'

function Home () {
    const Login = () => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
    }
    return (
        <form>
            <div>
                Login
            </div>
            <div>
                <label>Username: </label>
                <input type="text"></input>
            </div>
            <div>
                <label>Password: </label>
                <input type="password"></input>
            </div>
            <div>
                <input type='submit' value="Login"></input>
            </div>
        </form>
    )
}

export default Home