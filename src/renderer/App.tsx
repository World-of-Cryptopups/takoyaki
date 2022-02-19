import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainAppContainer from './main';
import SettingsProvider from './modules/settings/provider';

export default function App() {
  return (
    <SettingsProvider>
      <MainAppContainer />

      <ToastContainer
        theme="colored"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        className="text-sm"
      />
    </SettingsProvider>
  );
}
