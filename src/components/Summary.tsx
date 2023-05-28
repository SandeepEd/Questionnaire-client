import { useQuiz } from '../context/QuizProviders';
import { IOption, IQuestion } from '../types/questionnaire';

function Summary() {
  const { questions } = useQuiz();

  const getOptionText = (options: IOption[], id: number | null) => {
    const option = options.find(option => option.id === id);
    return option ? option.option_text : ``;
  };

  const user_score = questions?.filter(question => question.isCorrect).length;
  const total_score = questions?.length;

  return (
    <div className="p-5 bg-white rounded shadow">
      <div className='flex flex-row items-center justify-between'>
        <h2 className="text-2xl font-bold mb-5">Summary</h2>
        <h2 className="text-2xl font-bold mb-5">{`Your Score: ${user_score || 0} of ${total_score || 0}`}</h2>
      </div>

      {questions?.map((question: IQuestion) =>
        <div key={question.id} className="mb-6 bg-gray-50 p-4 rounded shadow border border-gray-400">
          <h3 className="font-bold mb-2">{question.question_text}</h3>
          <p><span className="font-semibold">Your answer: </span>
            {getOptionText(question.options, question.response_id)}</p>
          <p><span className="font-semibold">Correct answer: </span>
            {getOptionText(question.options, question?.correct_option_id)}</p>
          <p className={question.isCorrect ? `text-green-500 font-bold` : `text-red-500 font-bold`}>
            {question.isCorrect ? `Correct!` : `Incorrect!`}
          </p>
        </div>)}
    </div>
  );
}

export default Summary;
