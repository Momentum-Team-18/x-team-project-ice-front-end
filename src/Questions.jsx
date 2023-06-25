import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'
import IndividualQuestion from './IndividualQuestion'

function Questions({token}) {

    const [ questions, setQuestions ] = useState([])
    const [ askQuestion, setAskQuestion ] = useState('')
    const [ selectedQuestionId, setSelectedQuestionId] = useState(null)

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
    const handleQuestionBoxClick = (questionId) => {
        setSelectedQuestionId(questionId);
        }
    return (
    <>
        <div className="question-container">
        {questions.map((question) => (
        <div
        key={question.id}
        className={`question-box ${selectedQuestionId === question.id ? 'active' : ''}`} 
                onClick={() => handleQuestionBoxClick(question.id)} 
            >
            <p className="question-title">{question.question_title}</p>
            {selectedQuestionId === question.id && ( 
            <p className="question-text">{question.question_text}</p>
            )}
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

            {selectedQuestionId && (
                <div>
                    <IndividualQuestion questionId={selectedQuestionId} />
                </div>
            )}

        {/* <button onClick={handleLogout}>Logout</button> */}
    </> 
    )
}

export default Questions