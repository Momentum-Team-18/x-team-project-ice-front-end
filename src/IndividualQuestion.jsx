import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IndividualQuestion({ questionId }) {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
    axios
        .get(`https://questionapi.onrender.com/questions/${questionId}`)
        .then((response) => setQuestion(response.data));
    }, [questionId]);

    if (!question) {
    return <div>Loading...</div>;
    }
// answers have their own div box
    return (
    <div>
    <p>{question.question_text}</p>

    </div>
);
}

export default IndividualQuestion;
