import { create } from "zustand";
import { initialTravelInfo, type TravelInfo } from "./types";

export interface GridConfig {
  rows: number;
  cols: number;
}

interface TravelTagStore {
  // État
  travelInfo: TravelInfo;
  qrCodeSize: number;
  gridConfig: GridConfig;

  // Actions
  updateTravelInfo: (info: Partial<TravelInfo>) => void;
  resetTravelInfo: () => void;
  setQrCodeSize: (size: number) => void;
  setGridConfig: (config: Partial<GridConfig>) => void;
}

export const useTravelTagStore = create<TravelTagStore>((set) => ({
  // État initial
  travelInfo: initialTravelInfo,
  qrCodeSize: 200,
  gridConfig: { rows: 3, cols: 2 },

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
    
  setGridConfig: (config) =>
    set((state) => ({
      gridConfig: { ...state.gridConfig, ...config },
    })),
}));
