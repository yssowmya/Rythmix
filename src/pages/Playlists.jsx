import React, { useState } from 'react';
import { mockPlaylists, getSongsByPlaylist } from '../data/mockData';
import { useMusic } from '../context/MusicContext';
import { Play, Plus, Pause, Clock, MoreHorizontal, X } from 'lucide-react';

const PlaylistsPage = () => {
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { isPlaying, currentSong, playSong, togglePlay, playAllSongs } = useMusic();

  const handleSelectPlaylist = (playlist) => {
    setActivePlaylist(playlist);
    const songs = getSongsByPlaylist(playlist.id);
    setPlaylistSongs(songs);
  };

  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playAllSongs(playlistSongs);
    }
  };

  const handlePlaySong = (song) => {
    playSong(song);
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    // This would be implemented with a backend in a real app
    setShowCreateModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Your Playlists</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> Create Playlist
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Playlists List */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="bg-gray-800 bg-opacity-60 rounded-lg overflow-hidden shadow-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-4">All Playlists</h2>
            <div className="space-y-2">
              {mockPlaylists.map(playlist => (
                <div 
                  key={playlist.id}
                  onClick={() => handleSelectPlaylist(playlist)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    activePlaylist?.id === playlist.id 
                      ? 'bg-pink-900 bg-opacity-40' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <img 
                    src={playlist.coverUrl} 
                    alt={playlist.title} 
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-white">{playlist.title}</h3>
                    <p className="text-xs text-gray-400">{
                      getSongsByPlaylist(playlist.id).length
                    } songs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Playlist Content */}
        <div className="md:w-2/3 lg:w-3/4">
          {activePlaylist ? (
            <div>
              <div className="flex flex-col md:flex-row mb-8">
                <div className="md:w-48 flex-shrink-0 mb-6 md:mb-0">
                  <div className="shadow-xl rounded-lg overflow-hidden">
                    <img 
                      src={activePlaylist.coverUrl} 
                      alt={activePlaylist.title} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="md:ml-8 flex flex-col justify-end">
                  <p className="text-pink-500 font-semibold mb-2">PLAYLIST</p>
                  <h1 className="text-4xl font-bold text-white mb-2">{activePlaylist.title}</h1>
                  <p className="text-gray-400 mb-4">{activePlaylist.description}</p>
                  <div className="flex items-center text-gray-400 mb-6">
                    <p>{playlistSongs.length} songs</p>
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

              {/* Songs Table */}
              {playlistSongs.length > 0 ? (
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
                      {playlistSongs.map((song, index) => {
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
                                  <p className="text-sm text-gray-400">{song.artist}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                              Album Name
                            </td>
                            <td className="px-4 py-3 text-gray-400 text-center">{song.duration}</td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 text-center">
                  <p className="text-gray-400">This playlist is empty. Add some songs to get started!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 bg-opacity-60 rounded-lg p-8 text-center">
              <p className="text-gray-400">Select a playlist to view its content</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Create New Playlist</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleCreatePlaylist}>
              <div className="mb-4">
                <label htmlFor="playlistName" className="block text-sm font-medium text-gray-400 mb-2">
                  Playlist Name
                </label>
                <input 
                  type="text" 
                  id="playlistName" 
                  className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="My Awesome Playlist"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="playlistDescription" className="block text-sm font-medium text-gray-400 mb-2">
                  Description (optional)
                </label>
                <textarea 
                  id="playlistDescription" 
                  className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="What's this playlist about?"
                  rows="3"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;