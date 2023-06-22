import { useState } from "react";
import React from 'react'
import axios from 'axios'

function Home ({setToken}) {

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [email, setEmail] = useState('')

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
    
        // the handle register is not working right now,
        // not exactly sure why, but i think it has something to do with the token
    return (
    <> 
              
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
        </form>
        
        <form onSubmit={handleSubmit}>
            <div>
                Login
            </div>
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
    </>
    )
}

export default Home


// import React, { useState } from 'react';

// function FormButton() {
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   return (
//     <div>
//       <button onClick={toggleFormVisibility}>
//         {isFormVisible ? 'Hide Form' : 'Show Form'}
//       </button>

//       {isFormVisible && (
//         <form>
//           {/* Add your form fields and submit button here */}
//         </form>
//       )}
//     </div>
//   );
// }

// export default FormButton;