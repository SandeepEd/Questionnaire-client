import { createContext, useContext, useState } from 'react';
import Loading from '../components/Loading';
import { useGetQuestions } from '../services/AssignmentService';
import { IQuestion } from '../types/questionnaire';

interface IQuizContext {
  questions: IQuestion[] | undefined;
  currentQuestionIndex: number;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  goToQuestion: (questionIndex: number) => void;
}
const QuizContext = createContext<IQuizContext | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {

  const { isLoading, error, data } = useGetQuestions();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);

  function goToNextQuestion() {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  }

  function goToPreviousQuestion() {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  }

  function goToQuestion(questionIndex: number) {
    setCurrentQuestionIndex(() => questionIndex);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return <QuizContext.Provider value={{
    questions: data,
    currentQuestionIndex,
    goToNextQuestion,
    goToPreviousQuestion,
    goToQuestion
  }}>
    {children}
  </QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === null) {
    throw new Error(`useQuiz must be used within a QuizProvider`);
  }
  return context;
}
