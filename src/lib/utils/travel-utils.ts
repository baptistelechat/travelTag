import type { TravelInfo } from "../types/travel-info.schema";

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