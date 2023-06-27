import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';

function Answers({ token, questionId }) {
  const [answers, setAnswers] = useState([]);
  const [showInputField, setShowInputField] = useState(false);
  const [createAnswer, setCreateAnswer] = useState('');

  useEffect(() => {
    axios
      .get(`https://questionapi.onrender.com/questions/${questionId}/`, {
        headers: {
          Authorization: `token ${token}`,
        }
      })
      .then((response) => setAnswers(response.data.answers))
      .catch((error) => console.error(error));
  }, [token, questionId]);

  const handleCreateAnswer = () => {
    setShowInputField(true);
  };

  const handleSubmitAnswer = (e) => {
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
        setShowInputField(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="answer-container">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.id} className="answer-box">
              <div className="answer-box-inner">
                <p className="answer-text">{answer.answer_text}</p>
                <p className="answer-author">{answer.answer_author}</p>
                <p className="related-question">{answer.answer_date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Login to see answers...</p>
        )}
        {!showInputField && (
          <button className="button" onClick={handleCreateAnswer}>Add Answer</button>
        )}
        {showInputField && (
          <form onSubmit={handleSubmitAnswer}>
            <input
              type="text"
              placeholder="Add your answer"
              value={createAnswer}
              onChange={(e) => setCreateAnswer(e.target.value)}
            />
            <button className="button" type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Answers;
