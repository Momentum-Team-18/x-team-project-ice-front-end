import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Profile( {token} ) {

    const [userQuestions, setUserQuestions] = useState([])
    const [userAnswers, setUserAnswers] = useState([])

    useEffect(() => {
        axios
        .get('https://questionapi.onrender.com/questions/user/',
        {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        .then((response) => setUserQuestions(response.data))
    }, [])

    useEffect(() => {
        axios
        .get('https://questionapi.onrender.com/user/answers/',
        {
            headers: {
                Authorization: `token ${token}`,
            },
        })
        .then((response) => setUserAnswers(response.data))
    }, [])
    return (
    <>
        <h1>Your Profile Page</h1>
        <h2>Questions</h2>
        <div>
        {userQuestions.map((userQuestion) => (
            <ul>
                <p>{userQuestion.question_text}</p>
            </ul>
        ))}
        </div>
        <h2>Answers</h2>
        <div>
        {userAnswers.map((userAnswer) => (
            <ul>
                <p>{userAnswer.answer_text}</p>
            </ul>
        ))}
        </div>

    </>       
    )
}

export default Profile