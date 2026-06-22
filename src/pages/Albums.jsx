import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAlbums } from '../data/mockData';
import { Play } from 'lucide-react';

const AlbumsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Albums</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockAlbums.map(album => (
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
              <h3 className="font-bold text-lg mb-1 group-hover:text-pink-400 transition-colors truncate">{album.title}</h3>
              <p className="text-gray-400 text-sm">{album.artist} • {album.releaseYear}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;