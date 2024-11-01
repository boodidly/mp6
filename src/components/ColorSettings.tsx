import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface ColorSettingsProps {
  accentColor: string;
  setAccentColor: (color: string) => void;
  onClose: () => void;
}

const ColorSettings = ({ accentColor, setAccentColor, onClose }: ColorSettingsProps) => {
  const [customColor, setCustomColor] = useState(accentColor);
  const [showCustom, setShowCustom] = useState(false);

  const presetColors = [
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Orange', value: '#f97316' },
  ];

  const handleCustomColorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccentColor(customColor);
  };

  return (
    <div className="absolute right-0 top-16 mr-4 w-72 bg-zinc-900 rounded-lg shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Accent Color</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {presetColors.map((color) => (
          <button
            key={color.value}
            onClick={() => setAccentColor(color.value)}
            className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color.value }}
            />
            <span>{color.name}</span>
            {accentColor === color.value && (
              <span className="ml-auto text-sm">✓</span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowCustom(!showCustom)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
      >
        <Plus className="w-4 h-4" />
        Custom Color
      </button>

      {showCustom && (
        <form onSubmit={handleCustomColorSubmit} className="space-y-3">
          <div>
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            pattern="^#([A-Fa-f0-9]{6})$"
            className="w-full bg-zinc-800 rounded px-2 py-1 text-sm"
            placeholder="#RRGGBB"
          />
          <button
            type="submit"
            className="w-full py-2 rounded font-medium transition-colors"
            style={{ backgroundColor: customColor }}
          >
            Apply Color
          </button>
        </form>
      )}
    </div>
  );
};

export default ColorSettings;