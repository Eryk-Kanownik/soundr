import { create } from "zustand";

export const usePlayerState = create((set) => ({
  currentSong: null,
  currentSongId: null,
  currentPlaylistId: null,
  currentPlaylist: null,

  setCurrentSong: (song: object) => set(() => ({ currentSong: song })),
  setCurrentPlaylist: (playlist: Array<object>) =>
    set(() => ({ currentPlaylist: playlist })),
  setCurrentPlaylistByIds: (playlistId: string, songId: string) =>
    set(() => ({
      currentSongId: songId,
      currentPlaylistId: playlistId,
    })),
  setCurrentSongId: (songId: string) =>
    set(() => ({
      currentSongId: songId,
    })),

  //controls
  isPlaying: false,
  repeat: false,
  volume: 100,

  setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
  setRepeat: (isOnRepeat: boolean) => set(() => ({ repeat: isOnRepeat })),
  setVolume: (val: number) => set(() => ({ volume: val })),

  //additional and static
  latest10Songs: null,
  setLatest10Songs: (playlist: Array<object>) =>
    set(() => ({ latest10Songs: playlist })),
  setLatest10AsPlaylist: () =>
    set((state: any) => ({ currentPlaylist: state.latest10Songs })),
}));
