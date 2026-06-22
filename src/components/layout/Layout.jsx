import React from 'react';
import Navbar from './Navbar';
import MusicPlayer from '../player/MusicPlayer';
import { useMusic } from '../../context/MusicContext';

const Layout = ({ children }) => {
  const { currentSong } = useMusic();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <main className="pt-20 pb-28">{children}</main>
      {currentSong && <MusicPlayer />}
    </div>
  );
};

export default Layout;