import { getCountryName } from "@/components/ui/country/country-utils";

import { clsx, type ClassValue } from "clsx";
import { useHotkeys } from "react-hotkeys-hook";
import type { Country } from "react-phone-number-input";
import { twMerge } from "tailwind-merge";
import { getAirportByIATA } from "./data/airports";
import { getCityByCode } from "./data/cities";
import { getStationByCode } from "./data/stations";
import { getAllergyById } from "./data/allergies";
import { getBloodGroupById } from "./data/blood-groups";
import { getRelationshipLabel } from "./data/relationship-labels";
import { useTravelTagStore } from "./store";
import type { TravelInfo } from "./types";
import { TransportModeEnum } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalise une chaîne de caractères en remplaçant les caractères accentués
 * par leurs équivalents sans accent pour une meilleure compatibilité avec les lecteurs de QR code
 */
export function normalizeString(str: string): string {
  if (!str) return str;

  // Utilisation de la normalisation Unicode pour décomposer les caractères accentués
  // puis suppression des marques diacritiques (accents, cédilles, etc.)
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les marques diacritiques
    .replace(/[œŒ]/g, "oe") // Remplace œ par oe
    .replace(/[æÆ]/g, "ae") // Remplace æ par ae
    .replace(/[ÿŸ]/g, "y") // Remplace ÿ par y
    .replace(/[\u2018\u2019]/g, "'") // Remplace les guillemets courbes par des apostrophes droites
    .replace(/[\u201C\u201D]/g, '"'); // Remplace les guillemets courbes par des guillemets droits
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
    `Prenom : ${normalizeString(travelInfo.firstName) || "-"}`,
    `Nom : ${normalizeString(travelInfo.lastName) || "-"}`,
    `Nationalite : ${
      travelInfo.nationality
        ? `${normalizeString(
            getCountryName(travelInfo.nationality as Country)
          )} (${travelInfo.nationality})`
        : "-"
    }`,
  ];

  // Ajouter l'adresse postale si au moins un champ est rempli
  if (
    travelInfo.street ||
    travelInfo.addressDetails ||
    travelInfo.city ||
    travelInfo.postalCode ||
    travelInfo.country
  ) {
    const addressParts = [];
    if (travelInfo.street)
      addressParts.push(normalizeString(travelInfo.street));
    if (travelInfo.addressDetails)
      addressParts.push(normalizeString(travelInfo.addressDetails));
    if (travelInfo.postalCode || travelInfo.city) {
      addressParts.push(
        `${normalizeString(travelInfo.postalCode || "")} ${normalizeString(
          travelInfo.city || ""
        )}`.trim()
      );
    }
    if (travelInfo.country && travelInfo.country !== travelInfo.nationality) {
      addressParts.push(
        normalizeString(getCountryName(travelInfo.country as Country))
      );
    }
    qrCodeData.push(`Adresse : ${addressParts.join(", ") || "-"}`);
  }

  // Ajouter les autres informations
  qrCodeData.push(
    `Telephone : ${normalizeString(travelInfo.phone) || "-"}`,
    `Email : ${normalizeString(travelInfo.email) || "-"}`
  );

  // Formater les lieux de départ et d'arrivée en fonction du mode de transport
  if (travelInfo.departureLocation) {
    if (travelInfo.transportMode === TransportModeEnum.AIRPORT) {
      // Mode aéroport
      const departureAirport = getAirportByIATA(travelInfo.departureLocation);
      if (departureAirport) {
        qrCodeData.push(
          `Depart : ${normalizeString(departureAirport.name)} (${
            departureAirport.iata
          })`
        );
      } else {
        qrCodeData.push(
          `Depart : ${normalizeString(travelInfo.departureLocation) || "-"}`
        );
      }
    } else if (travelInfo.transportMode === TransportModeEnum.TRAIN) {
      // Mode train
      const departureStation = getStationByCode(travelInfo.departureLocation);
      if (departureStation) {
        const departmentInfo = departureStation.department
          ? departureStation.department
          : "";

        qrCodeData.push(
          `Depart : ${normalizeString(
            departureStation.name
          )} - ${departmentInfo} (${departureStation.code})`
        );
      } else {
        qrCodeData.push(
          `Depart : ${normalizeString(travelInfo.departureLocation) || "-"}`
        );
      }
    } else if (travelInfo.transportMode === TransportModeEnum.CAR) {
      // Mode voiture/covoiturage
      const departureCity = getCityByCode(travelInfo.departureLocation);
      if (departureCity) {
        qrCodeData.push(
          `Depart : ${normalizeString(departureCity.name)} (${
            departureCity.code_postal
          })`
        );
      } else {
        qrCodeData.push(
          `Depart : ${normalizeString(travelInfo.departureLocation) || "-"}`
        );
      }
    }
  } else {
    qrCodeData.push(`Depart : -`);
  }

  if (travelInfo.arrivalLocation) {
    if (travelInfo.transportMode === TransportModeEnum.AIRPORT) {
      // Mode aéroport
      const arrivalAirport = getAirportByIATA(travelInfo.arrivalLocation);
      if (arrivalAirport) {
        qrCodeData.push(
          `Arrivee : ${normalizeString(arrivalAirport.name)} (${
            arrivalAirport.iata
          })`
        );
      } else {
        qrCodeData.push(
          `Arrivee : ${normalizeString(travelInfo.arrivalLocation) || "-"}`
        );
      }
    } else if (travelInfo.transportMode === TransportModeEnum.TRAIN) {
      // Mode train
      const arrivalStation = getStationByCode(travelInfo.arrivalLocation);
      if (arrivalStation) {
        const departmentInfo = arrivalStation.department
          ? arrivalStation.department
          : "";
        qrCodeData.push(
          `Arrivee : ${normalizeString(
            arrivalStation.name
          )} - ${departmentInfo} (${arrivalStation.code})`
        );
      } else {
        qrCodeData.push(
          `Arrivee : ${normalizeString(travelInfo.arrivalLocation) || "-"}`
        );
      }
    } else if (travelInfo.transportMode === TransportModeEnum.CAR) {
      // Mode voiture/covoiturage
      const arrivalCity = getCityByCode(travelInfo.arrivalLocation);
      if (arrivalCity) {
        qrCodeData.push(
          `Arrivee : ${normalizeString(arrivalCity.name)} (${
            arrivalCity.code_postal
          })`
        );
      } else {
        qrCodeData.push(
          `Arrivee : ${normalizeString(travelInfo.arrivalLocation) || "-"}`
        );
      }
    }
  } else {
    qrCodeData.push(`Arrivee : -`);
  }

  // Ajouter les informations optionnelles seulement si elles sont présentes
  // Utiliser la même logique que dans les composants originaux

  // Ajouter les allergies si présentes
  if (travelInfo.allergies && travelInfo.allergies.length > 0) {
    // Convertir les IDs d'allergies en noms
    const allergiesText = travelInfo.allergies
      .map(id => {
        const allergy = getAllergyById(id);
        return allergy ? normalizeString(allergy.name) : id;
      })
      .join(", ");
    qrCodeData.push(`Allergies : ${allergiesText}`);
  }

  // Ajouter le groupe sanguin s'il est présent
  if (travelInfo.bloodGroup) {
    const bloodGroup = getBloodGroupById(travelInfo.bloodGroup);
    qrCodeData.push(`Groupe sanguin : ${bloodGroup ? bloodGroup.name : travelInfo.bloodGroup}`);
  }

  if (travelInfo.healthInfo) {
    qrCodeData.push(`Sante : ${normalizeString(travelInfo.healthInfo)}`);
  }

  if (travelInfo.additionalInfo) {
    qrCodeData.push(`Infos : ${normalizeString(travelInfo.additionalInfo)}`);
  }

  // Ajouter les contacts de confiance s'ils sont présents
  if (travelInfo.trustContacts && travelInfo.trustContacts.length > 0) {
    qrCodeData.push(`Contacts de confiance :`);
    travelInfo.trustContacts.forEach((contact, index) => {
      // Utilisation de la fonction getRelationshipLabel pour obtenir le libellé de la relation
      const relationship = getRelationshipLabel(contact.relationship);
      qrCodeData.push(
        `  ${index + 1}. ${normalizeString(contact.firstName)} ${normalizeString(contact.lastName)} - ${normalizeString(contact.phone)} (${normalizeString(relationship)})`
      );
    });
  }

  return qrCodeData;
}

/**
 * Hook personnalisé pour gérer l'impression via Ctrl+P
 * Utilise react-hotkeys-hook pour intercepter Ctrl+P et déclencher le clic sur le bouton d'impression
 */
export function usePrintHandler() {
  // Récupérer les données de voyage depuis le store
  const travelInfo = useTravelTagStore((state) => state.travelInfo);

  useHotkeys(
    "ctrl+p",
    (event) => {
      // Annuler l'événement d'impression par défaut
      event.preventDefault();

      // Afficher l'overlay avec effet de flou
      const overlay = document.getElementById("print-overlay");
      if (overlay && hasData(travelInfo)) {
        overlay.classList.add("print-overlay-visible");
      }

      // Trouver le bouton d'impression et simuler un clic
      const buttons = document.querySelectorAll("button");
      for (const btn of Array.from(buttons)) {
        if (btn.textContent?.includes("Imprimer")) {
          // Simuler un clic sur le bouton d'impression
          btn.click();
          return;
        }
      }
    },
    { enableOnFormTags: true, preventDefault: true }
  );
}
