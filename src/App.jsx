import Header from './components/Header';
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
      <Header />
      <div className="relative z-10">
        <main className="main-content" style={{ margin: 0, padding: 0, width: '100%' }}>
          <HeroBanner />
          <ContinueReading />
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
