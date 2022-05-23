import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { WelcomePage, SingleBoardPage, BoardsPage } from './components/pages';
import { Login, SignUp } from './components';
import RequireAuth from './hoc/RequireAuth';
import ErrorBoundary from './components/ErrorBoundary';

const EditProfile = lazy(() => import('./components/pages/EditProfile'));
const Page404 = lazy(() => import('./components/pages/Page404'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route
              path="edit-profile"
              element={
                <RequireAuth>
                  <EditProfile />
                </RequireAuth>
              }
            />
            <Route
              path="boards"
              element={
                <RequireAuth>
                  <BoardsPage />
                </RequireAuth>
              }
            />
            <Route path="boards/:boardId" element={<SingleBoardPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
