import React, { useState, useRef, useEffect } from 'react';
import { useMusic } from '../../context/MusicContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Download } from 'lucide-react';
import axios from 'axios';

const MusicPlayer = () => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    nextSong, 
    prevSong 
  } = useMusic();
  
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  const toggleVolume = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(0.7);
    }
  };

  const handleDownload = async () => {
    if (!currentSong || downloading) return;

    try {
      setDownloading(true);
      const response = await axios.get(`http://localhost:8080/api/songs/${currentSong.id}/download`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${currentSong.title}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-lg border-t border-gray-800 p-3 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0 w-full md:w-1/3">
          <img 
            src={currentSong.coverUrl} 
            alt={currentSong.title} 
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="ml-3">
            <h4 className="text-sm font-medium truncate">{currentSong.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`ml-4 text-gray-400 hover:text-white transition-colors ${downloading ? 'opacity-50' : ''}`}
            title="Download song"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="flex items-center space-x-4">
            <button onClick={prevSong} className="text-gray-400 hover:text-white">
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              onClick={togglePlay} 
              className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={nextSong} className="text-gray-400 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-2 mt-2">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-grow h-1 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
            />
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-1/3 justify-end mt-2 md:mt-0">
          <button onClick={toggleVolume} className="text-gray-400 hover:text-white">
            {getVolumeIcon()}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
          />
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextSong}
      />
    </div>
  );
};

export default MusicPlayer;