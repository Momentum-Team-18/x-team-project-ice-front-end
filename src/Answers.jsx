import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'

function Answers ({ token, questionId }) {

    const [ answers, setAnswers ] = useState([])

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
    console.log(questionId)

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
</div>
    </>
    )
}

export default Answers