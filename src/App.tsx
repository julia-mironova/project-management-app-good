import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WelcomePage from './components/pages/WelcomePage';
import Login from './components/Login/Login';
import BoardsPage from './components/pages/BoardsPage';
import RequireAuth from './hoc/RequireAuth';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const Page404 = lazy(() => import('./components/pages/Page404'));
const SingleBoardPage = lazy(() => import('./components/pages/SingleBoardPage'));
const EditProfile = lazy(() => import('./components/pages/EditProfile'));
const SignUp = lazy(() => import('./components/Login/SignUp'));

function App() {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route
              path="edit-profile"
              element={
                <ErrorBoundary>
                  <RequireAuth>
                    <EditProfile />
                  </RequireAuth>
                </ErrorBoundary>
              }
            />
            <Route
              path="boards"
              element={
                <ErrorBoundary>
                  <RequireAuth>
                    <BoardsPage />
                  </RequireAuth>
                </ErrorBoundary>
              }
            />
            <Route
              path="boards/:boardId"
              element={
                <ErrorBoundary>
                  <RequireAuth>
                    <SingleBoardPage />
                  </RequireAuth>
                </ErrorBoundary>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
