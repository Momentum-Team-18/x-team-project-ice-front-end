import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answers from './Answers';

function IndividualQuestion({ questionId, token }) {
const [question, setQuestion] = useState(null);

useEffect(() => {
    axios
    .get(`https://questionapi.onrender.com/questions/${questionId}`)
    .then((response) => setQuestion(response.data))
    .catch((error) => console.error(error));
}, [questionId]);

if (!question) {
    return <div>Loading...</div>;
}

return (
    <div>
    {/* <p>{question.question_text}</p> */}
    <Answers questionId={questionId} token={token} />
    </div>
);
}

export default IndividualQuestion;

