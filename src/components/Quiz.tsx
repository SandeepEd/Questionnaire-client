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
    <div className='h-screen'>
      {user?.assignment_submitted ?
        <Summary />
        :
        <>
          <div className='h-4/5'>
            <Question
              question={question}
              callback={() => { }}
              button_text={currentQuestionIndex === questions.length - 1 ? `Submit` :
                user?.assignment_submitted ? `Next` : `Save & Continue`}
            />
          </div>
          <Pagination
            totalCount={questions?.length || 0}
            currentPage={currentQuestionIndex}
            handlePageChange={handleQuestionChange}
          />
        </>
      }
    </div>
  );
}

export default Quiz;
