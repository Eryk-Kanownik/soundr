import { create } from "zustand";

export const useNotificationState = create((set) => ({
  type: "",
  message: "",
  setNotification: ({ type, message }: any) => set(() => ({ type, message })),
}));
