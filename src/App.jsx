import Footer from './components/Footer';
import './styles/App.scss';
import logo from './assets/TTM NOVRLS.png';

function App() {
  return (
    <div className="app relative min-h-screen bg-dark-bg overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Logo in top-left corner */}
      <div style={{
        position: 'fixed',
        top: '30px',
        left: '30px',
        zIndex: 9999,
        width: '200px',
        height: 'auto'
      }}>
        <img
          src={logo}
          alt="TTM Novels Logo"
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.7))'
          }}
        />
      </div>

      <div className="relative z-10" style={{ margin: 0, padding: 0 }}>
        {/* Content will go here */}
      </div>

      <Footer />
    </div>
  );
}

export default App;
