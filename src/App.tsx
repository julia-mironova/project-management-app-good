import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import { MainPage, EditProfile, Page404, BoardsPage, SingleBoardPage } from './components/pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="edit" element={<Navigate to="/edit-profile" replace />} />
        <Route path="boards" element={<BoardsPage />} />
        <Route path="boards/:boardId" element={<SingleBoardPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
