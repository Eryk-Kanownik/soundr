import { create } from "zustand";

export const usePlaylistState = create((set) => ({
  playlist: null,
  setPlaylist: (playlist: object | null) => set(() => ({ playlist })),
}));
