import { QuizProvider } from '../context/QuizProviders';
import Quiz from './Quiz';

function Entry() {
  return <QuizProvider>
    <Quiz />
  </QuizProvider>;
}
export default Entry;
