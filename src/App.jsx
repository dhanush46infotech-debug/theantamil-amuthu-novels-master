import Header from './components/Header';
import BackgroundVowels from './components/BackgroundVowels';
import HeroBanner from './components/HeroBanner';
import BookCategories from './components/BookCategories';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/App.scss';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app relative min-h-screen bg-dark-bg overflow-hidden">
          <div className="fixed inset-0 z-0 pointer-events-none">
            <BackgroundVowels />
          </div>
          <div className="relative z-10">
            <Header />
            <main className="main-content" style={{ marginTop: '0', paddingTop: '0' }}>
              <HeroBanner />
              <BookCategories />
            </main>
            <Footer />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
