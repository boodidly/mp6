export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  path: string;
  category: string;
  file: File;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

export interface Library {
  tracks: Track[];
  playlists: Playlist[];
  categories: Set<string>;
}