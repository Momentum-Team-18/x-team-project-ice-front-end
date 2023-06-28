import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'

function Answers ({ token, questionId }) {

    const [ answers, setAnswers ] = useState([])
    const [ createAnswer, setCreateAnswer ] = useState('')


    useEffect(() => {
        axios
        .get(`https://questionapi.onrender.com/questions/${questionId}/`)
        .then((response) => setAnswers(response.data.answers))
    }, [])
// this get request makes it possible for an unauthenticated use to see answers to specific questions
    useEffect(() => {
        axios
        .get(`https://questionapi.onrender.com/questions/${questionId}/`,
        {
            headers: {
                Authorization: `token ${token}`,
            }
        })
        .then((response) => setAnswers(response.data.answers))
    }, [])
    
    const handleCreateAnswer = (e) => {
        e.preventDefault();
        axios
            .post('https://questionapi.onrender.com/questions/answer/', {
            answer_text: createAnswer,
            related_question: questionId,
            }, {
            headers: {
                Authorization: `token ${token}`
            }
            })
            .then(() => {
            setCreateAnswer('');
            })
            // .catch((error) => console.error(error));
        };

    return (
        
    <>
    <div className="answer-container">
        {answers.length > 0 ? (
            answers.map((answer) => (
                <div key={answer.id} className="answer-box">
                    <p className="answer-text">{answer.answer_text}</p>
                    <p className="answer-author">{answer.answer_author}</p>
                    <p className="related-question">{answer.answer_date}</p>
                </div>
            ))
        ) : (
            <p>Login to see answers...</p>
        )}
            <input
            type="text"
            placeholder="Add your answer:"
            onChange={(e) => setCreateAnswer(e.target.value)}>
            </input>
            <button onClick={handleCreateAnswer}>Add Answer</button>
    </div>
    </>
    )
}

export default Answers