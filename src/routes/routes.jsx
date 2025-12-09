import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load page components
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const NovelsPage = lazy(() => import('../pages/NovelsPage/NovelsPage'));
const NovelDetailPage = lazy(() => import('../pages/NovelDetailPage/NovelDetailPage'));
const ChapterPage = lazy(() => import('../pages/ChapterPage/ChapterPage'));
const ContactPage = lazy(() => import('../pages/ContactPage/ContactPage'));
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage'));

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
        <Route path="/novels" element={<NovelsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* API-based novel routes */}
        <Route path="/novel/:id" element={<NovelDetailPage />} />
        <Route path="/novel/:novelId/chapter/:chapterId" element={<ChapterPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
