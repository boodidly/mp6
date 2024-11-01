import React, { useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  accentColor: string;
  volume: number;
  setVolume: (volume: number) => void;
  currentTrack: {
    title: string;
    artist: string;
    coverUrl: string;
  };
}

const MusicPlayer = ({ 
  isPlaying, 
  setIsPlaying, 
  currentTime, 
  setCurrentTime, 
  duration,
  accentColor,
  volume,
  setVolume,
  currentTrack
}: MusicPlayerProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimeSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
  }, [duration, setCurrentTime]);

  const handleVolumeChange = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setVolume(Math.max(0, Math.min(100, percentage)));
  }, [setVolume]);

  return (
    <div className="h-20 bg-zinc-900/90 border-t border-zinc-800/50 px-4 flex items-center justify-between backdrop-blur-lg">
      <div className="flex items-center gap-4 w-1/4">
        <img 
          src={currentTrack.coverUrl}
          alt="Current track"
          className="w-12 h-12 rounded"
        />
        <div>
          <h4 className="font-medium">{currentTrack.title}</h4>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex items-center gap-4">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setCurrentTime(Math.max(0, currentTime - 30))}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ backgroundColor: accentColor }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-black" />
            ) : (
              <Play className="w-4 h-4 text-black" />
            )}
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setCurrentTime(Math.min(duration, currentTime + 30))}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-gray-800 rounded-full cursor-pointer group"
            onClick={handleTimeSeek}
          >
            <div 
              className="h-full rounded-full relative transition-all"
              style={{ width: `${(currentTime / duration) * 100}%`, backgroundColor: accentColor }}
            >
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </div>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-1/4 justify-end">
        <button
          onClick={() => setVolume(volume === 0 ? 75 : 0)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
        <div 
          className="w-20 h-1 bg-gray-800 rounded-full cursor-pointer group"
          onClick={handleVolumeChange}
        >
          <div 
            className="h-full rounded-full relative transition-all"
            style={{ width: `${volume}%`, backgroundColor: accentColor }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;