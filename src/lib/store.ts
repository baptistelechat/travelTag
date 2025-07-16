import { create } from "zustand";
import { initialTravelInfo, type TravelInfo } from "./types";

interface TravelTagStore {
  // État
  travelInfo: TravelInfo;
  qrCodeSize: number;
  downloadMode: "single" | "grid";

  // Actions
  updateTravelInfo: (info: Partial<TravelInfo>) => void;
  resetTravelInfo: () => void;
  setQrCodeSize: (size: number) => void;
  setDownloadMode: (mode: "single" | "grid") => void;
}

export const useTravelTagStore = create<TravelTagStore>((set) => ({
  // État initial
  travelInfo: initialTravelInfo,
  qrCodeSize: 200,
  downloadMode: "single",

  // Actions
  updateTravelInfo: (info) =>
    set((state) => ({
      travelInfo: { ...state.travelInfo, ...info },
    })),

  resetTravelInfo: () =>
    set({
      travelInfo: initialTravelInfo,
    }),

  setQrCodeSize: (size) =>
    set({
      qrCodeSize: size,
    }),

  setDownloadMode: (mode) =>
    set({
      downloadMode: mode,
    }),
}));
