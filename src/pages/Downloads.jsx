import React from 'react';
import { Clock, Play, Pause, Download, X } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const DownloadsPage = () => {
  const { isPlaying, currentSong, playSong, togglePlay } = useMusic();
  // Mock downloaded songs - in a real app this would come from local storage or IndexedDB
  const downloadedSongs = [
    {
      id: '1',
      title: 'Hello',
      artist: 'Adele',
      albumId: '1',
      coverUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: '4:55',
      downloadDate: '2023-04-15',
      size: '12.4 MB'
    },
    {
      id: '4',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      albumId: '2',
      coverUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      duration: '3:53',
      downloadDate: '2023-04-10',
      size: '9.7 MB'
    },
  ];

  const handlePlaySong = (song) => {
    playSong(song);
  };

  const handleDeleteDownload = (songId) => {
    // In a real app this would remove the song from local storage
    console.log(`Deleting download with ID: ${songId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Downloads</h1>
      
      {downloadedSongs.length > 0 ? (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm"></th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Title</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm hidden md:table-cell">Date Added</th>
                <th className="px-4 py-3 text-center text-gray-400 font-medium text-sm hidden md:table-cell">Size</th>
                <th className="px-4 py-3 text-center text-gray-400 font-medium text-sm">
                  <Clock className="h-4 w-4 inline-block" />
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {downloadedSongs.map((song, index) => {
                const isCurrentSong = currentSong && currentSong.id === song.id;
                
                return (
                  <tr 
                    key={song.id} 
                    className={`hover:bg-gray-700 group ${isCurrentSong ? 'bg-gray-700' : ''}`}
                  >
                    <td className="px-4 py-3 text-gray-300 font-medium w-12">
                      <div className="flex items-center justify-center w-6 h-6">
                        <button 
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
                          <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{song.downloadDate}</td>
                    <td className="px-4 py-3 text-gray-400 text-center hidden md:table-cell">{song.size}</td>
                    <td className="px-4 py-3 text-gray-400 text-center">{song.duration}</td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteDownload(song.id)}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-800 bg-opacity-60 rounded-lg p-10 text-center">
          <Download className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Downloads Yet</h3>
          <p className="text-gray-400 mb-6">Download songs to listen offline</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white"
          >
            Browse Music
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;