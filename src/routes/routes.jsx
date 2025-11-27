import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import NovelsPage from '../pages/NovelsPage/NovelsPage';
import NovelDetailPage from '../pages/NovelDetailPage/NovelDetailPage';
import ThenmozhiNovelPage from '../pages/ThenmozhiNovelPage/ThenmozhiNovelPage';
import SwethaNovelPage from '../pages/SwethaNovelPage/SwethaNovelPage';
import MohanaNovelPage from '../pages/MohanaNovelPage/MohanaNovelPage';
import ChapterPage from '../pages/ChapterPage/ChapterPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/novels" element={<NovelsPage />} />
      <Route path="/novel/1" element={<ThenmozhiNovelPage />} />
      <Route path="/novel/2" element={<SwethaNovelPage />} />
      <Route path="/novel/3" element={<MohanaNovelPage />} />
      <Route path="/novel/:id" element={<NovelDetailPage />} />
      <Route path="/novel/:novelId/chapter/:chapterId" element={<ChapterPage />} />
    </Routes>
  );
};

export default AppRoutes;
