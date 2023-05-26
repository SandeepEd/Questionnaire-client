import { useAuth } from 'context/AuthContext';
import LogIn from './components/LogIn';
import Quiz from './components/Quiz';

export default function App() {

  const { user } = useAuth();
  return (
    <>
      { user ? <LogIn /> : <Quiz />}
    </>

  );
}
