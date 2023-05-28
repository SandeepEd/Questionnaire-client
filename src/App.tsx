import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import FullScreenLoading from './components/FullScreenLoading';

const EntryComponent = lazy(() => import(`./components/Entry`));
const LogInComponent = lazy(() => import(`./components/LogIn`));

const routes = [
  {
    id: 1,
    default: true,
    path: `/login`,
    component: LogInComponent
  },
  {
    id: 2,
    path: `/questionnaire`,
    component: EntryComponent
  }
];

export default function App() {

  return (
    <>
      <Suspense fallback={<FullScreenLoading />}>
        <Routes>
          {routes.map((route) =>
            <Route key={route.id} path={route.path} Component={route.component} />)}
        </Routes>
      </Suspense>
    </>

  );
}
