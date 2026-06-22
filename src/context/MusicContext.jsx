import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockSongs } from '../data/mockData';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState(mockSongs);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playAllSongs = (songsList, startIndex = 0) => {
    if (songsList && songsList.length > 0) {
      setQueue(songsList);
      setCurrentSongIndex(startIndex);
      setCurrentSong(songsList[startIndex]);
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (queue.length === 0) return;
    const newIndex = (currentSongIndex + 1) % queue.length;
    setCurrentSongIndex(newIndex);
    setCurrentSong(queue[newIndex]);
  };

  const prevSong = () => {
    if (queue.length === 0) return;
    const newIndex = (currentSongIndex - 1 + queue.length) % queue.length;
    setCurrentSongIndex(newIndex);
    setCurrentSong(queue[newIndex]);
  };

  const addToQueue = (song) => {
    setQueue(prev => [...prev, song]);
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrentSong(null);
    setIsPlaying(false);
  };

  const addToPlaylist = (playlistId, songId) => {
    // This would connect to a backend in a real app
    console.log(`Added song ${songId} to playlist ${playlistId}`);
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        currentSong,
        isPlaying,
        queue,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        playAllSongs,
        addToQueue,
        clearQueue,
        addToPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};