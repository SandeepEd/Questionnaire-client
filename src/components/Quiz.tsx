// import React from 'react'

import { QuizProvider } from '../context/QuizProviders';
import Question from './Question';

const questions = [
  {
    question: `What is the capital of France?`,
    options: [
      { text: `Paris`, correct: true },
      { text: `New York`, correct: false },
      { text: `London`, correct: false },
      { text: `Dublin`, correct: false },
    ],
  },
  {
    question: `Who is CEO of Tesla?`,
    options: [
      { text: `Jeff Bezos`, correct: false },
      { text: `Elon Musk`, correct: true },
      { text: `Bill Gates`, correct: false },
      { text: `Tony Stark`, correct: false },
    ],
  },
  {
    question: `The iPhone was created by which company?`,
    options: [
      { text: `Apple`, correct: true },
      { text: `Intel`, correct: false },
      { text: `Amazon`, correct: false },
      { text: `Microsoft`, correct: false },
    ],
  },
  {
    question: `How many Harry Potter books are there?`,
    options: [
      { text: `1`, correct: false },
      { text: `4`, correct: false },
      { text: `6`, correct: false },
      { text: `7`, correct: true },
    ],
  }
];
function Quiz() {
  return (
    <QuizProvider>
      <Question
        question={questions[0].question}
        options={questions[0].options}
        callback={() => { }}
      />
    </QuizProvider>
  );
}

export default Quiz;
