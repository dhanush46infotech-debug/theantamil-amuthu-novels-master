import Header from './components/Header';
import BackgroundVowels from './components/BackgroundVowels';
import HeroBanner from './components/HeroBanner';
import ContinueReading from './components/ContinueReading';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/App.scss';

function AppContent() {
  const { isAdmin, logout } = useAuth();

  if (isAdmin) {
    return <AdminDashboard onLogout={logout} />;
  }

  return (
    <div className="app relative min-h-screen bg-dark-bg overflow-hidden" style={{ margin: 0, padding: 0 }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundVowels />
        </div>
      </div>
      <div className="relative z-10">
        <Header />
        <main className="main-content" style={{ marginTop: '0', paddingTop: '0', width: '100%', margin: '0', padding: '0' }}>
          <HeroBanner />
          {/* Add spacing between banner and continue reading */}
          <div style={{ height: '5cm', background: 'transparent' }}></div>
          <ContinueReading />
          {/* 20cm gap between sections */}
          <div style={{ height: '20cm', background: 'transparent' }}></div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
