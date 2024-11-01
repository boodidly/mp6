# Modern Music Player

A sleek, minimalist music player built with React and TypeScript, designed for Arch Linux.

![Screenshot](https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- 🎨 Customizable accent colors
- 🎵 Support for all major audio formats
- 📹 Video playback support
- 🎼 Gapless playback
- 📱 Responsive design
- 🌓 Modern UI with blur effects
- 🎯 Low latency playback

## System Requirements

- Arch Linux
- Node.js 18+
- npm 9+
- System audio/video codecs

## Installation

### 1. System Dependencies

First, install required system packages:

```bash
# Install basic audio support
sudo pacman -S pulseaudio pulseaudio-alsa alsa-utils

# Install media codecs
sudo pacman -S gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav

# Install ffmpeg for broad format support
sudo pacman -S ffmpeg

# Install additional codec support
sudo pacman -S a52dec faac faad2 flac jasper lame libdca libdv libmad libmpeg2 libtheora libvorbis libxv wavpack x264 xvidcore
```

### 2. Application Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/modern-music-player
cd modern-music-player

# Install dependencies
npm install

# Start the development server
npm run dev

# For production build
npm run build
```

## Supported Formats

### Audio
- MP3
- FLAC
- WAV
- AAC
- OGG
- OPUS
- WMA
- ALAC
- AIFF
- DSD

### Video
- MP4
- WebM
- MKV
- AVI
- MOV
- FLV
- WMV

## Usage

1. **Library Management**
   - Click the "+" button in the sidebar to add music
   - Supports folder imports and individual files
   - Automatic metadata extraction

2. **Playback Controls**
   - Space: Play/Pause
   - Left/Right arrows: Previous/Next track
   - Up/Down arrows: Volume control
   - M: Mute/Unmute

3. **Customization**
   - Click the settings icon (⚙️) to open color settings
   - Choose from predefined accent colors
   - UI automatically adapts to your selection

4. **Playlists**
   - Create playlists from the sidebar
   - Drag and drop tracks to organize
   - Smart playlists based on play count, genre, or mood

## Troubleshooting

### Audio Issues
```bash
# Check if PulseAudio is running
pulseaudio --check
# If not running, start it
pulseaudio --start

# Verify ALSA setup
aplay -l
```

### Codec Issues
```bash
# Verify codec installation
pacman -Qs gst-plugins
pacman -Qs ffmpeg

# Test specific format playback
ffplay path/to/your/file.mp3
```

### Permission Issues
```bash
# Fix audio group permissions
sudo usermod -aG audio $USER
# Log out and back in for changes to take effect
```

## Development

```bash
# Install development dependencies
npm install --save-dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI inspiration from modern music players
- Community contributions and feedback

## Security

Report security vulnerabilities to security@yourproject.com

## Support

- GitHub Issues for bug reports and feature requests
- Discord community for general discussion
- Stack Overflow tag: `modern-music-player`