import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load page components
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const NovelsPage = lazy(() => import('../pages/NovelsPage/NovelsPage'));
const NovelDetailPage = lazy(() => import('../pages/NovelDetailPage/NovelDetailPage'));
const ThenmozhiNovelPage = lazy(() => import('../pages/ThenmozhiNovelPage/ThenmozhiNovelPage'));
const SwethaNovelPage = lazy(() => import('../pages/SwethaNovelPage/SwethaNovelPage'));
const MohanaNovelPage = lazy(() => import('../pages/MohanaNovelPage/MohanaNovelPage'));
const ChapterPage = lazy(() => import('../pages/ChapterPage/ChapterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'));

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#0B1A2D',
    color: '#fff'
  }}>
    <div>Loading...</div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/novels" element={<NovelsPage />} />
        {/* Specific routes first (for hardcoded novel pages) */}
        <Route path="/novel/1" element={<ThenmozhiNovelPage />} />
        <Route path="/novel/2" element={<SwethaNovelPage />} />
        <Route path="/novel/3" element={<MohanaNovelPage />} />
        {/* Generic routes after specific ones */}
        <Route path="/novel/:id" element={<NovelDetailPage />} />
        <Route path="/novel/:novelId/chapter/:chapterId" element={<ChapterPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
