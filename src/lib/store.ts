import { create } from "zustand";
import { initialTravelInfo, type TravelInfo } from "./types";

interface TravelTagStore {
  // État
  travelInfo: TravelInfo;
  qrCodeSize: number;

  // Actions
  updateTravelInfo: (info: Partial<TravelInfo>) => void;
  resetTravelInfo: () => void;
  setQrCodeSize: (size: number) => void;
}

export const useTravelTagStore = create<TravelTagStore>((set) => ({
  // État initial
  travelInfo: initialTravelInfo,
  qrCodeSize: 200,

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
}));
