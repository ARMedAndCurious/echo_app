import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MoodPage from './pages/MoodPage';
import MemoryPage from './pages/MemoryPage';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><MoodPage /></ProtectedRoute>} />
            <Route path="/memory" element={<ProtectedRoute><MemoryPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
