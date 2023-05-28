import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizProviders';
import Pagination from './Pagination';
import Question from './Question';
import Summary from './Summary';

function Quiz() {
  const { questions, currentQuestionIndex, goToQuestion } = useQuiz();
  const { user } = useAuth();
  const question = questions && questions[currentQuestionIndex];

  const handleQuestionChange = (questionIndex: number) => {
    goToQuestion(questionIndex);
  };

  if (!question) {
    return <div>No question to display</div>;
  }

  return (
    <>
      {user?.assignment_submitted ?
        <Summary />
        :
        <>
          <Question
            question={question}
            callback={() => { }}
            button_text={currentQuestionIndex === questions.length - 1 ? `Submit` :
              user?.assignment_submitted ? `Next` : `Save Answer and Continue`}
          />
          <Pagination
            totalCount={questions?.length || 0}
            currentPage={currentQuestionIndex}
            handlePageChange={handleQuestionChange}
          />
        </>
      }
    </>
  );
}

export default Quiz;
