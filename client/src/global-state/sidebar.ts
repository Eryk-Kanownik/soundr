import { create } from "zustand";

export const useSidebarState = create((set) => ({
  sidebarFolded: true,
  setSidebarFolded: () =>
    set((state: any) => ({ sidebarFolded: !state.sidebarFolded })),
  sidebarPlaylists: null,
  setSidebarPlaylists: (playlists: Array<object>) =>
    set(() => ({ sidebarPlaylists: playlists })),
  addPlaylist: (playlist: object) =>
    set((state: any) => ({
      sidebarPlaylists: [...state.sidebarPlaylists, playlist],
    })),
  overwriteSidebarPlaylist: (playlist: any) =>
    set((state: any) => {
      let newState = state.sidebarPlaylists;
      let index = newState.map((p: any) => p.id).indexOf(playlist.id);
      newState[index] = playlist;
      return { sidebarPlaylists: newState };
    }),
}));
