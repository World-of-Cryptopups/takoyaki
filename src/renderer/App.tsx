import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppContainer from './pages/app';
import AppProvider from './providers/app';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContainer />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}