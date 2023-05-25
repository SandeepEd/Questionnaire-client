import React, { useState } from 'react';

interface Props {
  question: string;
  options: Array<{ text: string, correct: boolean }>;
  callback: (e: React.FormEvent<EventTarget>, userAnswer: string) => void;
}

const Question: React.FC<Props> = ({ question, options, callback }) => {
  const [ selectedOption, setSelectedOption ] = useState(``);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    callback(e, selectedOption);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <h1 className="font-bold text-2xl mb-6">{question}</h1>
      <form onSubmit={handleSubmit}>
        {options.map((option, index) =>
          <button
            key={index}
            onClick={() => handleSelect(option.text)}
            className={`min-w-full border-2 rounded border-solid border-gray-200 mb-1 
            px-4 py-2 text-sm font-bold hover:bg-blue-300 hover:scale-105 
            ${selectedOption === option.text ? `bg-green-400 text-white` : `bg-white text-black`} focus:outline-none`}
          >
            {option.text}
          </button>)}
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2
          px-4 rounded focus:outline-none focus:shadow-outline float-right"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Question;
