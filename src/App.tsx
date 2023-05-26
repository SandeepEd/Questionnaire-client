import { lazy, Suspense } from 'react';
import FullScreenLoading from './components/FullScreenLoading';
import { useAuth } from './context/AuthContext';

const QuizComponent = lazy(() => import(`./components/Quiz`));
const LogInComponent = lazy(() => import(`./components/LogIn`));

export default function App() {

  const { user } = useAuth();
  return (
    <>
      <Suspense fallback={<FullScreenLoading />}>
        { user ? <QuizComponent /> : <LogInComponent />}
      </Suspense>
    </>

  );
}
