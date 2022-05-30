import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WelcomePage from './components/pages/WelcomePage';
import Login from './components/Login/Login';
import BoardsPage from './components/pages/BoardsPage';
import RequireAuth from './hoc/RequireAuth';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SignUp from './components/Login/SignUp';
import { Backdrop, CircularProgress } from '@mui/material';
import SingleBoardPage from './components/pages/SingleBoardPage';

const Page404 = lazy(() => import('./components/pages/Page404'));
//const SingleBoardPage = lazy(() => import('./components/pages/SingleBoardPage'));
const EditProfile = lazy(() => import('./components/pages/EditProfile'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route
            path="edit-profile"
            element={
              <ErrorBoundary>
                <RequireAuth>
                  <Suspense
                    fallback={
                      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={true}>
                        <CircularProgress color="inherit" />
                      </Backdrop>
                    }
                  >
                    <EditProfile />
                  </Suspense>
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
                  {/*   <Suspense
                    fallback={
                      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={true}>
                        <CircularProgress color="inherit" />
                      </Backdrop>
                    }
                  > */}
                  <SingleBoardPage />
                  {/*   </Suspense> */}
                </RequireAuth>
              </ErrorBoundary>
            }
          />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
