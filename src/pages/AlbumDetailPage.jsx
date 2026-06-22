import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumById, getSongsByAlbum } from '../data/mockData';
import { useMusic } from '../context/MusicContext';
import { Play, Pause, Clock, Plus } from 'lucide-react';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const { isPlaying, currentSong, playSong, togglePlay, playAllSongs } = useMusic();

  useEffect(() => {
    const albumData = getAlbumById(id);
    const albumSongs = getSongsByAlbum(id);
    
    setAlbum(albumData);
    setSongs(albumSongs);
  }, [id]);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playAllSongs(songs);
    }
  };

  const handlePlaySong = (song) => {
    playSong(song);
  };

  if (!album) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row mb-8">
        <div className="md:w-64 flex-shrink-0 mb-6 md:mb-0">
          <div className="shadow-xl rounded-lg overflow-hidden">
            <img 
              src={album.coverUrl} 
              alt={album.title} 
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="md:ml-8 flex flex-col justify-end">
          <p className="text-pink-500 font-semibold mb-2">ALBUM</p>
          <h1 className="text-4xl font-bold text-white mb-2">{album.title}</h1>
          <div className="flex items-center text-gray-400 mb-6">
            <p>{album.artist} • {album.releaseYear} • {songs.length} songs</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handlePlayAll}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white flex items-center"
            >
              <Play className="h-5 w-5 mr-2" /> Play
            </button>
          </div>
        </div>
      </div>

      {/* Songs Section */}
      <div className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">#</th>
              <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Title</th>
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
                      <div>
                        <p className={`font-medium ${isCurrentSong ? 'text-pink-500' : ''}`}>{song.title}</p>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                    </div>
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
    </div>
  );
};

export default AlbumDetailPage;