import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Inspection from './pages/Inspection.jsx';
import Analytics from './pages/Analytics.jsx';
import Demo from './pages/Demo.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/inspect/:id" element={<Inspection />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}
