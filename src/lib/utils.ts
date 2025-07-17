import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TravelInfo } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Vérifie si au moins un champ de TravelInfo est rempli
 * Donne la priorité au nom et prénom
 */
export function hasData(travelInfo: TravelInfo): boolean {
  // Vérifier d'abord le nom et prénom (prioritaires)
  if (travelInfo.lastName?.trim() || travelInfo.firstName?.trim()) {
    return true;
  }

  // Vérifier dynamiquement tous les autres champs
  return Object.entries(travelInfo).some(([key, value]) => {
    // Exclure nom/prénom déjà vérifiés
    if (key === "lastName" || key === "firstName") {
      return false;
    }
    return typeof value === "string" && value.trim() !== "";
  });
}
