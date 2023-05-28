import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QuizProvider } from './context/QuizProviders';
import FullScreenLoading from './components/FullScreenLoading';
import { useAuth } from './context/AuthContext';

const EntryComponent = lazy(() => import(`./components/Entry`));
const LogInComponent = lazy(() => import(`./components/LogIn`));

const routes = [{
  id: 1,
  path: `/questionnaire`,
  component: EntryComponent
}];

export default function App() {

  const { user } = useAuth();
  return (
    <>
      <Suspense fallback={<FullScreenLoading />}>
        { user ?
          <QuizProvider>
            <Routes>
              {routes.map((route) =>
                <Route key={route.id} path={route.path} Component={route.component} />)}
            </Routes>
          </QuizProvider> :
          <LogInComponent />}
      </Suspense>
    </>

  );
}
