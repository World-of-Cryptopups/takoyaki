import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppContainer from './pages/app';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContainer />} />
      </Routes>
    </Router>
  );
}
