import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Image as ImageIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming useAuth provides user object

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      isActive 
        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Echo
        </Link>
        <div className="flex gap-2 items-center">
          {user && (
            <>
              <Link to="/" className={getLinkClass('/')}>
                <Home size={18} />
                <span className="hidden sm:block font-medium">Moods</span>
              </Link>
              <Link to="/memory" className={getLinkClass('/memory')}>
                <ImageIcon size={18} />
                <span className="hidden sm:block font-medium">Memories</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-slate-300 hover:bg-red-500/20 hover:text-red-400 ml-2"
              >
                <LogOut size={18} />
                <span className="hidden sm:block font-medium">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
