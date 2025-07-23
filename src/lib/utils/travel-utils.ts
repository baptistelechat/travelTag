import { initialTravelInfo } from "../types/initial-travel-info.const";
import type { TravelInfo } from "../types/travel-info.schema";

/**
 * Vérifie si au moins un champ de TravelInfo est rempli
 * Compare avec les valeurs initiales pour s'assurer qu'il y a vraiment des données
 */
export function hasData(travelInfo: TravelInfo): boolean {
  // Vérifier d'abord le nom et prénom (prioritaires)
  if (travelInfo.lastName?.trim() || travelInfo.firstName?.trim()) {
    return true;
  }

  // Vérifier dynamiquement tous les autres champs en comparant avec les valeurs initiales
  return Object.entries(travelInfo).some(([key, value]) => {
    // Exclure nom/prénom déjà vérifiés
    if (key === "lastName" || key === "firstName") {
      return false;
    }

    const initialValue = initialTravelInfo[key as keyof TravelInfo];

    // Vérifier les tableaux
    if (Array.isArray(value) && Array.isArray(initialValue)) {
      return (
        value.length > initialValue.length ||
        JSON.stringify(value) !== JSON.stringify(initialValue)
      );
    }

    // Vérifier les chaînes de caractères
    if (typeof value === "string" && typeof initialValue === "string") {
      return value.trim() !== "" && value !== initialValue;
    }

    // Vérifier les booléens
    if (typeof value === "boolean" && typeof initialValue === "boolean") {
      return value !== initialValue;
    }

    return false;
  });
}
