import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import NovelsPage from '../pages/NovelsPage/NovelsPage';
import NovelDetailPage from '../pages/NovelDetailPage/NovelDetailPage';
import ChapterPage from '../pages/ChapterPage/ChapterPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/novels" element={<NovelsPage />} />
      <Route path="/novel/:id" element={<NovelDetailPage />} />
      <Route path="/novel/:novelId/chapter/:chapterId" element={<ChapterPage />} />
    </Routes>
  );
};

export default AppRoutes;
