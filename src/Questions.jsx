import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'

function Questions() {

    const [questions, setQuestions] = useState([])
    
    const handleLogout = () => {
        axios.post('https://questionapi.onrender.com/auth/token/logout/')
        .then(() => {})
    }

    useEffect(() => {
        axios
        .get('https://questionapi.onrender.com/questions/')
        .then((response) => setQuestions(response.data))
    }, [])
    console.log(questions)

    return (
    <>

        <div>
        {questions.map((question) => (
            <ul>
                <p>{question.question_title}</p>
                <p>{question.question_text}</p>
            </ul>
        ))}
        </div>

        <div>
            <input type='text'>
            </input>
        </div>
            <input 
            type="text" 
            placeholder="Enter your question:">
            </input>
            <input 
                type='submit' 
                value="Submit">
            </input>

        <button onClick={handleLogout}>Logout</button>
    </>
        // <form onSubmit={handleSubmit}>
        //     <input
        //     type="text"
        //     onChange={handleInputChange}
        //     placeholder="Enter your question here"/>
        //     <button type="Submit your question"> </button>
        // </form>
        
    )
}

export default Questions