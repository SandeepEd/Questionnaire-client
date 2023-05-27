// import React from 'react'

import { QuizProvider, useQuiz } from '../context/QuizProviders';
import Question from './Question';

function Quiz() {
  const { questions, currentQuestionIndex } = useQuiz();
  const question = questions && questions[currentQuestionIndex];

  if (!question) {
    return <div>No question to display</div>;
  }

  return (
    <QuizProvider>
      <Question
        question={question}
        callback={() => { }}
      />
    </QuizProvider>
  );
}

export default Quiz;
