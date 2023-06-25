import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'

function Questions({token}) {

    const [ questions, setQuestions ] = useState([])
    const [ askQuestion, setAskQuestion ] = useState('')
    
    // const handleLogout = () => {
    //     axios.post('https://questionapi.onrender.com/auth/token/logout/')
    //     .then(() => {})
    // }

    useEffect(() => {
        axios
        .get('https://questionapi.onrender.com/questions/')
        .then((response) => setQuestions(response.data))
    }, [])
    
    const handlePost = (e) => {
        e.preventDefault()
        console.log(token)
        axios
            .post('https://questionapi.onrender.com/questions/', 
            {
                question_text: askQuestion,
                question_title: askQuestion,
            },
            {
                headers: {
                    Authorization: `token ${token}`
                }
            }
        )
            .then(() => {
                setAskQuestion('')
            })
        }

    return (
    <>
            <div className="question-container">
                {questions.map((question) => (
                    <div key={question.id} className="question-box">
                        {/* <p className="question-title">{question.question_title}</p> */}
                        <p className="question-text"><a href='#'>{question.question_text}</a></p>
                    </div>
                ))}
            </div>
            <input 
            type="text" 
            placeholder="Enter your question:"
            onChange={(e) => setAskQuestion(e.target.value)}
            >
            </input>
            <button
            onClick={handlePost}>
                Post
            </button>

        {/* <button onClick={handleLogout}>Logout</button> */}
    </> 
    )
}

export default Questions