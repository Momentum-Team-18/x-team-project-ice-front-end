import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion';

function Questions({ token, questionId }) {
  const [questions, setQuestions] = useState([]);
  const [askQuestion, setAskQuestion] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [deleteQuestion, setDeleteQuestion] = useState('');

    useEffect(() => {
    axios
        .get('https://questionapi.onrender.com/questions/')
        .then((response) => setQuestions(response.data))
        .catch((error) => console.error(error));
    }, []);

    const handlePost = (e) => {
    e.preventDefault();
    axios
        .post('https://questionapi.onrender.com/questions/', {
        question_text: askQuestion,
        question_title: askQuestion,
        }, {
        headers: {
            Authorization: `token ${token}`
        }
        })
        .then(() => {
        setAskQuestion('');
        axios
            .get('https://questionapi.onrender.com/questions/')
            .then((response) => setQuestions(response.data))
        })
        .catch((error) => console.error(error));
    };

    const handleQuestionBoxClick = (questionId) => {
        setSelectedQuestionId(questionId);
    };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
        .delete(`https://questionapi.onrender.com/questions/delete/${questionId}/`,
        {
            detail: questionId,
        },
        {
        headers: {
            Authorization: `token ${token}`
        }
        })
        .then(() => {
        setDeleteQuestion('');
        axios
            .then((response) => setDeleteQuestion(response.data))
        })
    };

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
            <button className={`close-button ${selectedQuestionId === question.id ? 'show' : ''}`} onClick={handleQuestionBoxClose}>
              I'm Outtie!
            </button>
            <p className="question-text">{question.question_text}</p>
            {selectedQuestionId === question.id && (
              <div className="question-details">
                <IndividualQuestion questionId={question.id} token={token} />
                </div>
            )}
            <button onClick={handleDelete}>Delete</button>
          </div>
        ))}
        </div>
        <input
        type="text"
        placeholder="Enter your question:"
        onChange={(e) => setAskQuestion(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
    </>
    );
}

export default Questions;