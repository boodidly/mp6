import React from 'react';
import { Play, Clock3, ChevronRight } from 'lucide-react';
import { Library, Track } from '../types';

interface MainContentProps {
  library: Library;
  accentColor: string;
  onTrackSelect: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

const MainContent = ({ 
  library,
  accentColor,
  onTrackSelect,
  currentTrack,
  isPlaying 
}: MainContentProps) => {
  if (library.tracks.length === 0) {
    return (
      <main className="flex-1 overflow-auto p-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-2xl font-bold mb-4">Your Library is Empty</h1>
          <p className="text-gray-400 mb-8">Add music by clicking the folder icon in the sidebar</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="space-y-6">
        {Array.from(library.categories).map(category => (
          <div key={category}>
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="bg-zinc-900/30 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800/50">
                    <th className="px-4 py-2 text-left font-medium">#</th>
                    <th className="px-4 py-2 text-left font-medium">Title</th>
                    <th className="px-4 py-2 text-left font-medium">Path</th>
                    <th className="px-4 py-2 text-left font-medium">
                      <Clock3 className="w-4 h-4" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {library.tracks
                    .filter(track => track.category === category)
                    .map((track, index) => (
                      <tr 
                        key={track.id}
                        className={`hover:bg-zinc-800/30 group/row cursor-pointer
                          ${currentTrack?.id === track.id ? 'bg-zinc-800/50' : ''}`}
                        onClick={() => onTrackSelect(track)}
                      >
                        <td className="px-4 py-3 text-sm">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                              {currentTrack?.id === track.id && isPlaying ? (
                                <div className="w-4 h-4" style={{ backgroundColor: accentColor }} />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{track.title}</div>
                              <div className="text-sm text-gray-400">{track.artist}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">{track.path}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {track.duration ? 
                            `${Math.floor(track.duration / 60)}:${String(Math.floor(track.duration % 60)).padStart(2, '0')}` :
                            '--:--'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;