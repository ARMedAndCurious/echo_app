const SpotifyEmbed = ({ link }) => {
  // Extract playlist/track ID from Spotify URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    try {
      // Examples: 
      // https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=xxx
      // https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=xxx
      
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      
      if (pathParts.length >= 2) {
        const type = pathParts[0]; // playlist, track, album
        const id = pathParts[1];
        return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
      }
    } catch (e) {
      console.warn("Invalid Spotify URL", e);
      return null;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(link);

  if (!embedUrl) {
    return (
      <div className="w-full h-[352px] flex items-center justify-center bg-black/40 rounded-[12px] border border-white/10 backdrop-blur-md">
        <p className="text-slate-400 text-sm">Please provide a valid Spotify Playlist or Track link.</p>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-[12px] shadow-2xl border border-white/10"
    ></iframe>
  );
};

export default SpotifyEmbed;
