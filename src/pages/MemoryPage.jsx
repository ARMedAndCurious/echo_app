import { useState, useEffect } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import SpotifyEmbed from '../components/SpotifyEmbed';

const MemoryPage = () => {
  const [memories, setMemories] = useState([]);
  
  // Form State
  const [image, setImage] = useState('');
  const [mood, setMood] = useState('Happy');
  const [note, setNote] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');

  // Load memories from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('echo_memories');
    if (saved) {
      setMemories(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!image || !note) return;

    const newMemory = {
      id: Date.now().toString(),
      image,
      mood,
      note,
      spotifyLink,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updatedMemories = [newMemory, ...memories];
    setMemories(updatedMemories);
    localStorage.setItem('echo_memories', JSON.stringify(updatedMemories));

    // Reset Form
    setImage('');
    setMood('Happy');
    setNote('');
    setSpotifyLink('');
  };

  const handleDeleteMemory = (id) => {
    const updatedMemories = memories.filter(m => m.id !== id);
    setMemories(updatedMemories);
    localStorage.setItem('echo_memories', JSON.stringify(updatedMemories));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Memory Lane</h1>
        <p className="text-slate-400">Save moments linked to emotions and music.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Memory Form */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl sticky top-24">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Upload size={20} className="text-purple-400" />
              Add a Memory
            </h2>
            <form onSubmit={handleAddMemory} className="space-y-5">
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Photo Moment</label>
                <div className="relative border-2 border-dashed border-slate-600 rounded-xl hover:border-purple-500 transition-colors bg-slate-900/50 overflow-hidden group">
                  {image ? (
                    <img src={image} alt="Memory Preview" className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-slate-400 cursor-pointer">
                      <Upload size={24} className="mb-2" />
                      <span className="text-sm">Click to Upload Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required={!image} />
                </div>
              </div>

              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">How did you feel?</label>
                <select 
                  value={mood} 
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="Happy">Happy</option>
                  <option value="Sad">Sad</option>
                  <option value="Focused">Focused</option>
                  <option value="Nostalgic">Nostalgic</option>
                  <option value="Calm">Calm</option>
                  <option value="Energetic">Energetic</option>
                  <option value="Loved">Loved</option>
                </select>
              </div>

              {/* Memory Note */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Short Note</label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What made this moment special?"
                  rows="3"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  required
                />
              </div>

              {/* Spotify Link */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Song of the Moment</label>
                <input 
                  type="url" 
                  value={spotifyLink}
                  onChange={(e) => setSpotifyLink(e.target.value)}
                  placeholder="Spotify Track/Playlist URL" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl shadow-lg transition-all">
                Save Memory
              </button>
            </form>
          </div>
        </div>

        {/* Display Memories */}
        <div className="lg:col-span-2">
          {memories.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-slate-500 bg-slate-800/20 border border-slate-700/30 rounded-2xl border-dashed">
              <Upload size={48} className="mb-4 opacity-50 text-slate-600" />
              <p className="text-lg">No memories saved yet.</p>
              <p className="text-sm">Upload a photo to start your memory lane.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {memories.map((mem) => (
                <div key={mem.id} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:bg-slate-800/50 flex flex-col sm:flex-row group">
                  {/* Image Section */}
                  <div className="sm:w-2/5 overflow-hidden">
                    <img 
                      src={mem.image} 
                      alt="Memory" 
                      className="w-full h-48 sm:h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 sm:w-3/5 flex flex-col relative">
                    <button 
                      onClick={() => handleDeleteMemory(mem.id)}
                      className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      title="Delete Memory"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="flex flex-col items-start mb-2 pr-8">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30 mb-2">
                        {mem.mood}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {mem.date}
                      </span>
                    </div>
                    
                    <p className="text-slate-200 mt-2 mb-4 italic leading-relaxed">
                      "{mem.note}"
                    </p>
                    
                    {mem.spotifyLink && (
                      <div className="mt-auto transform scale-95 origin-left opacity-90 group-hover:opacity-100 transition-opacity">
                        <SpotifyEmbed link={mem.spotifyLink} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryPage;
