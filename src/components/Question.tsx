import React from 'react';
import { IQuestion } from 'types/questionnaire';
import { useQuestionData } from '../hooks/useQuestionData';
import { useAuth } from '../context/AuthContext';

interface Props {
  question: IQuestion;
  button_text: string;
  callback: (e: React.FormEvent<EventTarget>, userAnswer: string) => void;
}

const Question: React.FC<Props> = ({ question, button_text }) => {

  const { user } = useAuth();

  const { handleSubmit, handleSelect, selectedOption } = useQuestionData(question);
  const options = question?.options;

  return (
    <div className="bg-white h-full rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <h1 className="font-bold text-2xl mb-6">{question?.question_text}</h1>
      <form onSubmit={handleSubmit}>
        {options?.map((option, index) =>
          <button
            className={`min-w-full border-2 rounded border-solid border-gray-200 mb-1 
            px-4 py-2 text-sm font-bold hover:border-blue-700 hover:text-blue-700

            ${selectedOption === option.id ?
      user?.assignment_submitted ? question.isCorrect ? `bg-green-500` : `bg-red-500 text-white`
        : `bg-blue-800 text-white` : `bg-white`} focus:outline-none`}
            disabled={user?.assignment_submitted}
            key={index}
            value={option.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelect(option.id);
            }}
          >
            {option.option_text}
          </button>)}
        {!user?.assignment_submitted ? <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2
        px-4 rounded focus:outline-none focus:shadow-outline float-right"
          disabled={user?.assignment_submitted}
          type="submit"
          value={button_text}
        /> : null}
      </form>
    </div>
  );
};

export default Question;
