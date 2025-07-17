import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useHotkeys } from 'react-hotkeys-hook';
import type { TravelInfo } from "./types";
import { useTravelTagStore } from "./store";

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
    `Prenom: ${travelInfo.firstName || "-"}`,
    `Nom: ${travelInfo.lastName || "-"}`,
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

/**
 * Hook personnalisé pour gérer l'impression via Ctrl+P
 * Utilise react-hotkeys-hook pour intercepter Ctrl+P et déclencher le clic sur le bouton d'impression
 */
export function usePrintHandler() {
  // Récupérer les données de voyage depuis le store
  const travelInfo = useTravelTagStore(state => state.travelInfo);
  
  useHotkeys('ctrl+p', (event) => {
    // Annuler l'événement d'impression par défaut
    event.preventDefault();
    
    // Afficher l'overlay avec effet de flou
    const overlay = document.getElementById("print-overlay");
    if (overlay && hasData(travelInfo)) {
      overlay.classList.add("print-overlay-visible");
    }
    
    // Trouver le bouton d'impression et simuler un clic
    const buttons = document.querySelectorAll('button');
    for (const btn of Array.from(buttons)) {
      if (btn.textContent?.includes('Imprimer')) {
        // Simuler un clic sur le bouton d'impression
        btn.click();
        return;
      }
    }
  }, { enableOnFormTags: true, preventDefault: true });
}
