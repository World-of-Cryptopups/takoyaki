import { UseEOSProvider } from '@cryptopuppie/useeoschain';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppContainer from './pages/app';
import AuthPage from './pages/auth/page';
import AppProvider from './providers/app';

export default function App() {
  return (
    <UseEOSProvider endpoint="https://waxtestnet.greymass.com">
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppContainer />} />
            <Route path="auth" element={<AuthPage />} />
          </Routes>
        </Router>
      </AppProvider>

      <ToastContainer
        theme="colored"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        className="text-sm"
      />
    </UseEOSProvider>
  );
}
