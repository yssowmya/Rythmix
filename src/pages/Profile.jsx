import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockPlaylists } from '../data/mockData';
import { Play, LogOut, Music, Heart, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  if (!currentUser) {
    navigate('/signin');
    return null;
  }

  // Stats for demo purposes
  const stats = {
    songsPlayed: 246,
    minutesListened: 827,
    favoriteSongs: 35,
    playlists: mockPlaylists.length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-gray-800 bg-opacity-60 rounded-lg p-6 text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-pink-500">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{currentUser.name}</h2>
            <p className="text-gray-400 mb-4">{currentUser.email}</p>
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white flex items-center justify-center mx-auto"
            >
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </button>
          </div>

          <div className="bg-gray-800 bg-opacity-60 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Listening Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 bg-opacity-60 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Music className="text-pink-500 h-6 w-6" />
                </div>
                <p className="text-2xl font-bold text-white text-center">{stats.songsPlayed}</p>
                <p className="text-sm text-gray-400 text-center">Songs Played</p>
              </div>
              <div className="bg-gray-700 bg-opacity-60 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-pink-500 h-6 w-6" />
                </div>
                <p className="text-2xl font-bold text-white text-center">{stats.minutesListened}</p>
                <p className="text-sm text-gray-400 text-center">Minutes Listened</p>
              </div>
              <div className="bg-gray-700 bg-opacity-60 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="text-pink-500 h-6 w-6" />
                </div>
                <p className="text-2xl font-bold text-white text-center">{stats.favoriteSongs}</p>
                <p className="text-sm text-gray-400 text-center">Favorite Songs</p>
              </div>
              <div className="bg-gray-700 bg-opacity-60 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Music className="text-pink-500 h-6 w-6" />
                </div>
                <p className="text-2xl font-bold text-white text-center">{stats.playlists}</p>
                <p className="text-sm text-gray-400 text-center">Playlists</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="bg-gray-800 bg-opacity-60 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Your Playlists</h3>
              <button 
                onClick={() => navigate('/playlists')}
                className="text-pink-400 hover:text-pink-300 text-sm"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockPlaylists.map(playlist => (
                <div 
                  key={playlist.id}
                  className="bg-gray-700 bg-opacity-60 rounded-lg overflow-hidden flex cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => navigate('/playlists')}
                >
                  <img 
                    src={playlist.coverUrl} 
                    alt={playlist.title} 
                    className="w-20 h-20 object-cover"
                  />
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-white">{playlist.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{playlist.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {playlist.songs.length} songs
                      </span>
                      <button className="bg-pink-600 hover:bg-pink-700 p-1.5 rounded-full">
                        <Play className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-60 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser.email}
                  readOnly
                  className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                  className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="pt-2">
                <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md text-white">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;