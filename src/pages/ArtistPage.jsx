import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistById, getSongsByArtist, mockAlbums } from '../data/mockData';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, Clock, Plus } from 'lucide-react';

const ArtistPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { isPlaying, currentSong, playSong, togglePlay, playAllSongs } = useMusic();

  useEffect(() => {
    const artistData = getArtistById(id);
    const artistSongs = getSongsByArtist(id);
    const artistAlbums = mockAlbums.filter(album => album.artistId === id);
    
    setArtist(artistData);
    setSongs(artistSongs);
    setAlbums(artistAlbums);
  }, [id]);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playAllSongs(songs);
    }
  };

  const handlePlaySong = (song) => {
    playSong(song);
  };

  if (!artist) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Artist Header */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(10,10,10,0.8)), url(${artist.coverUrl})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-10">
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src={artist.coverUrl} 
                alt={artist.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">{artist.name}</h1>
              <p className="text-gray-300 mt-2">{artist.genre}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Songs Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Popular Songs</h2>
            <button 
              onClick={handlePlayAll}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white flex items-center"
            >
              <Play className="h-4 w-4 mr-2" /> Play All
            </button>
          </div>

          <div className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">#</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Title</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm hidden md:table-cell">Album</th>
                  <th className="px-4 py-3 text-center text-gray-400 font-medium text-sm">
                    <Clock className="h-4 w-4 inline-block" />
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => {
                  const isCurrentSong = currentSong && currentSong.id === song.id;
                  
                  return (
                    <tr 
                      key={song.id} 
                      className={`hover:bg-gray-700 group ${isCurrentSong ? 'bg-gray-700' : ''}`}
                    >
                      <td className="px-4 py-3 text-gray-300 font-medium w-12">
                        <div className="flex items-center justify-center w-6 h-6">
                          <span className="group-hover:hidden block">{index + 1}</span>
                          <button 
                            className="group-hover:block hidden"
                            onClick={() => handlePlaySong(song)}
                          >
                            {isCurrentSong && isPlaying ? (
                              <Pause className="h-4 w-4 text-pink-500" />
                            ) : (
                              <Play className="h-4 w-4 text-white" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white">
                        <div className="flex items-center">
                          <img 
                            src={song.coverUrl} 
                            alt={song.title} 
                            className="h-10 w-10 rounded object-cover mr-3"
                          />
                          <div>
                            <p className={`font-medium ${isCurrentSong ? 'text-pink-500' : ''}`}>{song.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                        {albums.find(album => album.id === song.albumId)?.title || 'Unknown Album'}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-center">{song.duration}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Albums Section */}
        {albums.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {albums.map(album => (
                <div 
                  key={album.id}
                  className="bg-gray-800 bg-opacity-60 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => window.location.href = `/album/${album.id}`}
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
                    <p className="text-gray-400 text-sm">{album.releaseYear}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;