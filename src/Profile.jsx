import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'

function Profile() {

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
        <h1>Your Profile Page</h1>
        <div>
        {questions.map((question) => (
            <ul>
                <p>{question.question_title}</p>
                <p>{question.question_text}</p>
            </ul>
        ))}
        </div>

        <button onClick={handleLogout}>Logout</button>
    </>       
    )
}

export default Profile