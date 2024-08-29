import { create } from "zustand";

export const useLoggedUserState = create((set) => ({
  id: localStorage.getItem("id"),
  username: localStorage.getItem("username"),
  token: localStorage.getItem("token"),
  setUser: (obj: object) => set(() => ({ ...obj })),
}));
