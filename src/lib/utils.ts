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

/**
 * Formate les données de voyage pour le QR code
 * Cette fonction centralise la logique de formatage des données pour les QR codes
 * afin d'éviter la duplication de code et les incohérences
 */
export function formatQRCodeData(travelInfo: TravelInfo): string[] {
  // Création du contenu formaté pour le QR code sans accents dans les libellés
  const qrCodeData = [
    `Nom: ${travelInfo.lastName || "-"}`,
    `Prenom: ${travelInfo.firstName || "-"}`,
    `Telephone: ${travelInfo.phone || "-"}`,
    `Depart: ${travelInfo.departureLocation || "-"}`,
    `Arrivee: ${travelInfo.arrivalLocation || "-"}`,
  ];

  // Ajouter les informations optionnelles seulement si elles sont présentes
  // Utiliser la même logique que dans les composants originaux
  if (travelInfo.healthInfo) {
    qrCodeData.push(`Sante: ${travelInfo.healthInfo}`);
  }

  if (travelInfo.additionalInfo) {
    qrCodeData.push(`Infos: ${travelInfo.additionalInfo}`);
  }

  return qrCodeData;
}
