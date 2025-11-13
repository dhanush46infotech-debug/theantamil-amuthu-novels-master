import Header from './components/Header';
import BackgroundVowels from './components/BackgroundVowels';
import HeroBanner from './components/HeroBanner';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/App.scss';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app relative min-h-screen bg-dark-bg overflow-hidden">
          {/* Background layer - z-index 0 */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <BackgroundVowels />
          </div>

          {/* Content layers - z-index 10+ */}
          <div className="relative z-10">
            <Header />
            <main className="main-content pt-8">
              <HeroBanner />
            </main>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
