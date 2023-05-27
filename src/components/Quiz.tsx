import { useQuiz } from '../context/QuizProviders';
import Pagination from './Pagination';
import Question from './Question';

function Quiz() {
  const { questions, currentQuestionIndex, goToQuestion } = useQuiz();
  const question = questions && questions[currentQuestionIndex];

  const handleQuestionChange = (questionIndex: number) => {
    goToQuestion(questionIndex);
  };

  if (!question) {
    return <div>No question to display</div>;
  }

  return (
    <>
      <Question
        question={question}
        callback={() => { }}
        button_text={currentQuestionIndex === questions.length - 1 ? `Submit` : `Save Answer and Continue`}
      />
      <Pagination
        totalCount={questions?.length || 0}
        currentPage={currentQuestionIndex}
        handlePageChange={handleQuestionChange}
      />
    </>
  );
}

export default Quiz;
