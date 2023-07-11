import { create } from "zustand";

interface useActivityModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useActivityModal = create<useActivityModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
