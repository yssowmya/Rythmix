import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockArtists, mockAlbums } from '../data/mockData';
import { Play } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const goToArtist = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Featured Artists</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockArtists.slice(0, 10).map(artist => (
            <div 
              key={artist.id} 
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => goToArtist(artist.id)}
            >
              <div className="relative mb-3">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all duration-300">
                  <img 
                    src={artist.coverUrl} 
                    alt={artist.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-pink-600 rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Play className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <h3 className="text-center font-medium text-white group-hover:text-pink-400 transition-colors">{artist.name}</h3>
              <p className="text-sm text-gray-400">{artist.genre}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Popular Albums</h2>
          <button 
            onClick={() => navigate('/albums')}
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockAlbums.slice(0, 8).map(album => (
            <div 
              key={album.id} 
              className="bg-gray-800 bg-opacity-60 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => navigate(`/album/${album.id}`)}
            >
              <div className="relative">
                <img 
                  src={album.coverUrl} 
                  alt={album.title} 
                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-pink-600 rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-pink-400 transition-colors">{album.title}</h3>
                <p className="text-gray-400 text-sm">{album.artist} • {album.releaseYear}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;