import { createContext, useContext } from 'react';
import Loading from '../components/Loading';
import { useGetQuestions } from '../services/QuestionService';
import { IQuestions } from '../types/questionnaire';

interface IQuizContext {
  questions: IQuestions | undefined;
}
const QuizContext = createContext<IQuizContext | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {

  const { isLoading, error, data } = useGetQuestions();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  console.log(`data :::`, data);

  return <QuizContext.Provider value={{ questions: data }}>
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
