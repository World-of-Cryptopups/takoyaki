import { UseEOSProvider } from '@cryptopuppie/useeoschain';
import { MemoryRouter as Router, Route, Routes } from 'react-router';
import { useSettings } from './modules/settings/provider';
import AppContainer from './pages/app';
import AuthPage from './pages/auth/page';
import AppProvider from './providers/app';

const MainAppContainer = () => {
  const { chain } = useSettings();

  return (
    <UseEOSProvider endpoint={chain}>
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
};

export default MainAppContainer;
