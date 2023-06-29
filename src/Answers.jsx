import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function Answers({ token, questionId }) {
  const [answers, setAnswers] = useState([]);
  const [createAnswer, setCreateAnswer] = useState('');

  useEffect(() => {
    const headers = token ? { Authorization: `token ${token}` } : {};

    axios
      .get(`https://questionapi.onrender.com/questions/${questionId}/`, { headers })
      .then((response) => setAnswers(response.data.answers))
      .catch((error) => console.error(error));
  }, [questionId, token]);

  const handleCreateAnswer = (e) => {
    e.preventDefault();

    axios
      .post(
        'https://questionapi.onrender.com/questions/answer/',
        {
          answer_text: createAnswer,
          related_question: questionId,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then(() => {
        setCreateAnswer('');
      })
      .catch((error) => console.error(error));
  };

  const handleAcceptAnswer = (answerId) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === answerId ? { ...answer, accepted: true } : answer
      )
    );
  };

    // handleAcceptAnswer function marks answer as accepted... takes answerId as parameter
    // setAnswers function from useState is called to update answer state
    // prevAnswer parameter = previous state of answers list
    // prevAnswers map iterates over all answers makes new list w updates
    // if answerid = answerid that was in as parameter = accepted
    //  if they dont match answer list stays same
    //  {...} spread operator in JS
    // {...answer} puts spread operator w answer obj
    // copies answer/its properties puts into new obj then "accepted: true" is added to new copy of object
    //  spread operator lets us avoid directly changing original object


  return (
    <>
      <div className="answer-container">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.id} className="answer-box">
              <div className="answer-box-inner">
                <p className="answer-author">{answer.answer_author}</p>
                <p className={`answer-text ${answer.accepted ? 'accepted' : ''}`}>
                  {answer.answer_text}
                </p>
                <p className="related-question">
                  {dayjs(answer.answer_date).format('MM/DD/YYYY')}
                </p>
                {!answer.accepted && (
                  <>
                    <button onClick={() => handleAcceptAnswer(answer.id)}>Accept this answer</button>
                  </>
                )}
                {answer.accepted && <span className="accepted-answer">&#10003;</span>}
              </div>
            </div>
          ))
        ) : (
          <p>Login to see answers...</p>
        )}
        <input
          type="text"
          placeholder="Add your answer:"
          onChange={(e) => setCreateAnswer(e.target.value)}
        />
        <button onClick={handleCreateAnswer}>Add Answer</button>
      </div>
    </>
  );
}

export default Answers;