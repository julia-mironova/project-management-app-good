import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import {
  MainPage,
  EditProfile,
  Page404,
  BoardsPage,
  SingleBoardPage,
  LoginPage,
} from './components/pages';
import RequireAuth from './hoc/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="edit-profile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route path="edit" element={<Navigate to="/edit-profile" replace />} />
        <Route
          path="boards"
          element={
            <RequireAuth>
              <BoardsPage />
            </RequireAuth>
          }
        />
        <Route path="boards/:boardId" element={<SingleBoardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
