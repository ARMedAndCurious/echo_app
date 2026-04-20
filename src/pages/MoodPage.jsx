import { useState, useEffect } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import SpotifyEmbed from '../components/SpotifyEmbed';

const defaultMoods = [
  { id: '1', name: 'Happy', color: 'from-yellow-400 to-orange-500', link: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC', image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600&h=600&auto=format&fit=crop' },
  { id: '2', name: 'Sad', color: 'from-blue-600 to-blue-900', link: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0', image: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=600&h=600&auto=format&fit=crop' },
  { id: '3', name: 'Focused', color: 'from-teal-400 to-emerald-600', link: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=600&auto=format&fit=crop' },
  { id: '4', name: 'Nostalgic', color: 'from-purple-500 to-pink-600', link: 'https://open.spotify.com/playlist/37i9dQZF1DWTx0ygoVsxwL', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600&h=600&auto=format&fit=crop' },
  { id: '5', name: 'Calm', color: 'from-cyan-400 to-blue-500', link: 'https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&auto=format&fit=crop' },
  { id: '6', name: 'Energetic', color: 'from-red-500 to-pink-600', link: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP', image: 'https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?w=600&h=600&auto=format&fit=crop' },
];

const gradientOptions = [
  'from-yellow-400 to-orange-500',
  'from-blue-400 to-blue-700',
  'from-teal-400 to-emerald-600',
  'from-purple-500 to-indigo-600',
  'from-pink-500 to-rose-600',
  'from-green-400 to-cyan-500',
  'from-orange-400 to-red-500',
  'from-fuchsia-500 to-purple-600'
];

const MoodPage = () => {
  const [moods, setMoods] = useState(defaultMoods);
  const [activeMood, setActiveMood] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // Custom form state
  const [newMoodName, setNewMoodName] = useState('');
  const [newMoodColor, setNewMoodColor] = useState(gradientOptions[0]);
  const [newMoodLink, setNewMoodLink] = useState('');

  // Load custom moods from local storage
  useEffect(() => {
    const savedMoods = localStorage.getItem('echo_moods');
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods));
    }
  }, []);

  const handleAddMood = (e) => {
    e.preventDefault();
    if (!newMoodName || !newMoodLink) return;

    const newMood = {
      id: Date.now().toString(),
      name: newMoodName,
      color: newMoodColor,
      link: newMoodLink
    };

    const updatedMoods = [...moods, newMood];
    setMoods(updatedMoods);
    localStorage.setItem('echo_moods', JSON.stringify(updatedMoods));
    
    // Reset form
    setNewMoodName('');
    setNewMoodLink('');
    setShowForm(false);
  };

  const handleDeleteMood = (e, id) => {
    e.stopPropagation();
    const updatedMoods = moods.filter(m => m.id !== id);
    setMoods(updatedMoods);
    localStorage.setItem('echo_moods', JSON.stringify(updatedMoods));
  };

  // Full Screen Vibe View
  if (activeMood) {
    return (
      <div className={`fixed inset-0 z-50 bg-gradient-to-br ${activeMood.color} flex flex-col justify-center items-center p-6 animate-in fade-in duration-500 backdrop-blur-3xl`}>
        <button 
          onClick={() => setActiveMood(null)}
          className="absolute top-6 right-6 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all backdrop-blur-md"
        >
          <X size={28} />
        </button>
        
        <div className="w-full max-w-2xl bg-black/20 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 text-center transform scale-100 transition-all hover:scale-[1.02]">
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight drop-shadow-md">
            Feeling {activeMood.name}
          </h1>
          <SpotifyEmbed link={activeMood.link} />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">How are you feeling?</h1>
          <p className="text-slate-400">Select a mood to find your vibe.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-all backdrop-blur-sm"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Cancel' : 'Add Mood'}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold mb-4">Create Custom Mood</h2>
          <form onSubmit={handleAddMood} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Mood Name</label>
                <input 
                  type="text" 
                  value={newMoodName}
                  onChange={(e) => setNewMoodName(e.target.value)}
                  placeholder="e.g. Sleepy, Gym, Coding" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Spotify Playlist URL</label>
                <input 
                  type="url" 
                  value={newMoodLink}
                  onChange={(e) => setNewMoodLink(e.target.value)}
                  placeholder="https://open.spotify.com/playlist/..." 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Color Theme</label>
              <div className="flex flex-wrap gap-3">
                {gradientOptions.map(gradient => (
                  <button
                    key={gradient}
                    type="button"
                    onClick={() => setNewMoodColor(gradient)}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} transform transition-all ${newMoodColor === gradient ? 'scale-110 ring-4 ring-white shadow-lg' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="mt-4 w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
              Save Mood
            </button>
          </form>
        </div>
      )}

      {/* Pinterest-style grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {moods.map((mood) => {
          // Randomize heights slightly for Pinterest effect if desired, but here we just use aspect ratios
          const heightClass = mood.id % 2 === 0 ? 'aspect-square' : 'aspect-[3/4]';
          return (
            <div 
              key={mood.id}
              onClick={() => setActiveMood(mood)}
              className={`break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br ${mood.color} ${heightClass}`}
            >
              {mood.image && (
                <img src={mood.image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-500" alt="" />
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>
              
              {/* Delete button ONLY for custom moods (id length > 5 indicates Date.now string) */}
              {mood.id.length > 5 && (
                <button 
                  onClick={(e) => handleDeleteMood(e, mood.id)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-slate-300 hover:text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                <h3 className="text-2xl font-bold text-white drop-shadow-md group-hover:scale-105 transition-transform tracking-wide transform origin-bottom-left">
                  {mood.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodPage;
