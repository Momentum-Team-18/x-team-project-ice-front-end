import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion';

function Questions({ token }) {
const [questions, setQuestions] = useState([]);
const [askQuestion, setAskQuestion] = useState('');
const [selectedQuestionId, setSelectedQuestionId] = useState(null);

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

const handleDelete = (questionId) => {
    axios
    .delete(`https://questionapi.onrender.com/questions/delete/${questionId}/`, {
        headers: {
        Authorization: `token ${token}`
        }
    })
    .then(() => {
        setQuestions(questions.filter((question) => question.id !== questionId));
        setSelectedQuestionId(null);
    })
    .catch((error) => console.error(error));
};

const handleCloseQuestionBox = (e, questionId) => {
    e.stopPropagation(); 
    setSelectedQuestionId(selectedQuestionId === questionId ? null : questionId);
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
            {selectedQuestionId === question.id && (
            <>
                <button className="close-button" onClick={(e) => handleCloseQuestionBox(e, question.id)}>
                I'm Outtie!
                </button>
                <p className="question-text">{question.question_text}</p>
                <div className="question-details">
                <IndividualQuestion questionId={question.id} token={token} />
                </div>
                <button className="delete-button" onClick={() => handleDelete(question.id)}>
                Delete
                </button>
            </>
            )}
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







// Code below working but no accepy answer

// import { useState, useEffect } from "react";
// import React from 'react';
// import axios from 'axios';
// import IndividualQuestion from './IndividualQuestion';

// function Questions({ token, questionId }) {
//   const [questions, setQuestions] = useState([]);
//   const [askQuestion, setAskQuestion] = useState('');
//   const [selectedQuestionId, setSelectedQuestionId] = useState(null);
//   const [deleteQuestion, setDeleteQuestion] = useState('');

//     useEffect(() => {
//     axios
//         .get('https://questionapi.onrender.com/questions/')
//         .then((response) => setQuestions(response.data))
//         .catch((error) => console.error(error));
//     }, []);

//     const handlePost = (e) => {
//     e.preventDefault();
//     axios
//         .post('https://questionapi.onrender.com/questions/', {
//         question_text: askQuestion,
//         question_title: askQuestion,
//         }, {
//         headers: {
//             Authorization: `token ${token}`
//         }
//         })
//         .then(() => {
//         setAskQuestion('');
//         axios
//             .get('https://questionapi.onrender.com/questions/')
//             .then((response) => setQuestions(response.data))
//         })
//         .catch((error) => console.error(error));
//     };

//     const handleQuestionBoxClick = (questionId) => {
//         setSelectedQuestionId(questionId);
//     };

//   const handleDelete = (e) => {
//     e.preventDefault();
//     axios
//         .delete(`https://questionapi.onrender.com/questions/delete/${questionId}/`,
//         {
//             detail: questionId,
//         },
//         {
//         headers: {
//             Authorization: `token ${token}`
//         }
//         })
//         .then(() => {
//         setDeleteQuestion('');
//         })
//     };

//   return (
//     <>
//         <div className="question-container">
//         {questions.map((question) => (
//             <div
//             key={question.id}
//             className={`question-box ${selectedQuestionId === question.id ? 'active' : ''}`}
//             onClick={() => handleQuestionBoxClick(question.id)}
//             >
//             <p className="question-title">{question.question_title}</p>
//             <button className={`close-button ${selectedQuestionId === question.id ? 'show' : ''}`} onClick={handleQuestionBoxClick}>
//               I'm Outtie!
//             </button>
//             <p className="question-text">{question.question_text}</p>
//             {selectedQuestionId === question.id && (
//               <div className="question-details">
//                 <IndividualQuestion questionId={question.id} token={token} />
//                 </div>
//             )}
//             <button onClick={handleDelete}>Delete</button>
//           </div>
//         ))}
//         </div>
//         <input
//         type="text"
//         placeholder="Enter your question:"
//         onChange={(e) => setAskQuestion(e.target.value)}
//         />
//         <button onClick={handlePost}>Post</button>
//     </>
//     );
// }

// export default Questions;