import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'

function Answers ({token}) {

    const [ answer, setAnswer ] = useState(null)

    useEffect(() => {
        axios
        .get('https://questionapi.onrender.com/questions/answer/',
        {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then((response) => setAnswer(response.data))
    }, [])

    return (
    <>
        <div className="answer-container">
        {answer && (
            <div key={answer.id} className="answer-box">
                <p className="answer-text">{answer.answer_text}</p>
                <p className="answer-author">{answer.answer_author}</p>
                <p className="related-question">{answer.related_question}</p>
            </div>
        )}
    </div>
    </>
    )
}

export default Answers