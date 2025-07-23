// Enum pour les modes de transport
export const TransportModeEnum = {
  AIRPORT: "airport",
  TRAIN: "train",
  CAR: "car",
} as const;

export type TransportMode = (typeof TransportModeEnum)[keyof typeof TransportModeEnum];