import { UseEOSProvider } from '@cryptopuppie/useeoschain';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
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
    </UseEOSProvider>
  );
}
