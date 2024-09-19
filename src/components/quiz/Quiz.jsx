import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { Questions } from '../../Data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(Questions[index]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answered, setAnswered] = useState(false); 

  useEffect(() => {
    const listItems = document.querySelectorAll('.questions ul li');
    listItems.forEach(item => {
      item.classList.remove('correct', 'incorrect', 'show-correct');
      item.removeAttribute('disabled'); 
    });
    setAnswered(false); 
  }, [index]);

  const next = () => {
    let newIndex = index + 1;
    if (newIndex < Questions.length) {
      setIndex(newIndex);
      setQuestion(Questions[newIndex]);
    } else {
      setCompleted(true); 
    }
  }

  const checkAnswer = (e, answerText) => {
    if (answered) return; 

    console.log('Selected Answer:', answerText);
    console.log('Correct Answer:', question.CorrectAnswer);

    // Clear previously applied classes
    const listItems = e.target.parentNode.children;
    for (let item of listItems) {
      item.classList.remove("correct", "incorrect", "show-correct");
    }

    // Apply the correct or incorrect class
    if (answerText === question.CorrectAnswer) {
      e.target.classList.add("correct");
      setScore(prevScore => prevScore + 1); 
    } else {
      e.target.classList.add("incorrect");

      // Find the correct answer and highlight it
      for (let item of listItems) {
        if (item.textContent === question.CorrectAnswer) {
          item.classList.add("show-correct");
          break;
        }
      }
    }

    // Disable all answer options
    for (let item of listItems) {
      item.setAttribute('disabled', 'true');
    }

    setAnswered(true); 
  }

  const goFirst = () => {
    setIndex(0); 
    setQuestion(Questions[0]); 
    setScore(0); 
    setCompleted(false);
    setAnswered(false); 
  }

  return (
    <div className='quiz-container'>
      <h1>Quiz App</h1>
      <hr />
      {!completed ? (
        <div className="questions">
          <h2>{index + 1}. {question.Question}</h2>
          <ul>
            <li onClick={(e) => checkAnswer(e, question.Answers.answer1)}>{question.Answers.answer1}</li>
            <li onClick={(e) => checkAnswer(e, question.Answers.answer2)}>{question.Answers.answer2}</li>
            <li onClick={(e) => checkAnswer(e, question.Answers.answer3)}>{question.Answers.answer3}</li>
            <li onClick={(e) => checkAnswer(e, question.Answers.answer4)}>{question.Answers.answer4}</li>
          </ul>
          <button onClick={next} disabled={!answered}>Next</button>
          <p>{index + 1} of {Questions.length} questions</p>
        </div>
      ) : (
        <div className="results">
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {Questions.length}</p>
          <button onClick={goFirst}>Do Again</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
