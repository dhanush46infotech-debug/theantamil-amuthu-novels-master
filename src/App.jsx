import { AuthProvider } from './context/AuthContext';
import Footer from './components/layout/Footer/Footer';
import AppRoutes from './routes/routes';
import './styles/App.scss';

function App() {
  return (
    <AuthProvider>
      <div className="app relative min-h-screen overflow-hidden" style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', background: '#0B1A2D' }}>
        <div className="relative z-10" style={{ margin: 0, padding: 0, flex: 1 }}>
          <AppRoutes />
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
