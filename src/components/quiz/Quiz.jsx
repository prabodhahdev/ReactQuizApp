import React from 'react'
import './Quiz.css'
import { Questions } from '../../Data'

const Quiz = () => {
  console.log(Questions);

  return (
    <div className='quiz-container'>
      <h1>Quiz App</h1>
        <hr />  
    <div className="questions">
        <h2>1. Question</h2>
        <ul>
            <li>An1</li>
            <li>An1</li>
            <li>An1</li>
            <li>An1</li>
        </ul>
        <button>Next</button>
        <p>1 of 5 questions</p>
    </div>

    
    
    
    </div>
  );
}

export default Quiz;
