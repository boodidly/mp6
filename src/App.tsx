import React, { useState, useCallback } from 'react';
import { Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import MainContent from './components/MainContent';
import ColorSettings from './components/ColorSettings';
import { Track, Library } from './types';

function App() {
  const [library, setLibrary] = useState<Library>({
    tracks: [],
    playlists: [],
    categories: new Set()
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [accentColor, setAccentColor] = useState('#22c55e');
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const handleFolderSelect = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    const audioFiles = fileArray.filter(file => 
      file.type.startsWith('audio/') || 
      file.name.match(/\.(mp3|wav|ogg|m4a|flac)$/i)
    );

    const newTracks: Track[] = audioFiles.map(file => {
      const category = file.webkitRelativePath.split('/')[1] || 'Uncategorized';
      return {
        id: crypto.randomUUID(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Unknown Artist',
        duration: 0,
        path: file.webkitRelativePath,
        category,
        file
      };
    });

    setLibrary(prev => {
      const newCategories = new Set(prev.categories);
      newTracks.forEach(track => newCategories.add(track.category));

      return {
        ...prev,
        tracks: [...prev.tracks, ...newTracks],
        categories: newCategories
      };
    });
  }, []);

  const handleTrackSelect = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
    
    // Create audio element to get duration
    const audio = new Audio(URL.createObjectURL(track.file));
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          library={library}
          onFolderSelect={handleFolderSelect}
        />
        <div className="flex-1 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <MainContent 
            library={library}
            accentColor={accentColor}
            onTrackSelect={handleTrackSelect}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        </div>
        {showSettings && (
          <ColorSettings
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
      {currentTrack && (
        <MusicPlayer 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          accentColor={accentColor}
          volume={volume}
          setVolume={setVolume}
          currentTrack={currentTrack}
        />
      )}
    </div>
  );
}

export default App;