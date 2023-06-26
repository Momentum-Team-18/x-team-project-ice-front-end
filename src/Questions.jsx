import { useState, useEffect, useRef } from "react";
import React from 'react';
import axios from 'axios';
import IndividualQuestion from './IndividualQuestion';

// import useRef to access dom directly, doesn't change when page reloads
// boxRef to determine where click event is, inside/outside question box
// click outside of box brings back to state
// handleClickOutside event listener


function Questions({ token }) {
    const [questions, setQuestions] = useState([]);
    const [askQuestion, setAskQuestion] = useState('');
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const boxRef = useRef(null);

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
        })
        .catch((error) => console.error(error));
    };

    const handleQuestionBoxClick = (questionId) => {
    setSelectedQuestionId(questionId);
    };

    const handleClickOutside = (e) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
        setSelectedQuestionId(null);
    }
    };

    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

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
                <div className="question-details" ref={boxRef}>
                <IndividualQuestion questionId={question.id} token={token} />
                </div>
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






{/* // 
//             {/* <Answers token={token} selectedQuestionId={selectedQuestionId}/> */}
//                     </div>
//                 ))} */}
//             </div>
//             <input 
//             type="text" 
//             placeholder="Enter your question:"
//             onChange={(e) => setAskQuestion(e.target.value)}
//             >
//             </input>
//             <button
//             onClick={handlePost}>
//                 Post
//             </button>

//             {selectedQuestionId && (
//                 <div>
//                     <IndividualQuestion questionId={selectedQuestionId} />
//                 </div>
//             )}

//         {/* <button onClick={handleLogout}>Logout</button> */}
//     </> 
//     )
// }

// export default Questions