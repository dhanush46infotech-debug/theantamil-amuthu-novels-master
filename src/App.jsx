import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import './styles/App.scss';
import logo from './assets/images/brand/TTM NOVRLS.png';

function App() {
  return (
    <div className="app relative min-h-screen bg-dark-bg overflow-hidden" style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Logo in top-left corner */}
      <div className="app-logo">
        <img
          src={logo}
          alt="TTM Novels Logo"
        />
      </div>

      <div className="relative z-10" style={{ margin: 0, padding: 0, flex: 1 }}>
        <Home />
      </div>

      <Footer />
    </div>
  );
}

export default App;
