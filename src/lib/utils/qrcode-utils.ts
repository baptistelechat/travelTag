import { getCountryName } from "@/components/ui/country/country-utils";
import type { Country } from "react-phone-number-input";
import type { Language } from "@/lib/i18n/types";
import { getAirportByIATA } from "../data/airports";
import { getAllergyById } from "../data/allergies";
import { getBloodGroupById } from "../data/blood-groups";
import { getCityByCode } from "../data/cities";
import { getRelationshipLabel } from "../data/relationship-labels";
import { getStationByCode } from "../data/stations";
import { TransportModeEnum } from "../types/transport-mode.enum";
import type { TravelInfo } from "../types/travel-info.schema";
import { normalizeString } from "./string-utils";
import { hasData } from "./travel-utils";

/**
 * Formate les données de voyage pour le QR code
 * Cette fonction centralise la logique de formatage des données pour les QR codes
 * afin d'éviter la duplication de code et les incohérences
 * 
 * Easter egg : Si le formulaire est vide, retourne l'URL du Rickroll 🎵
 */
export function formatQRCodeData(travelInfo: TravelInfo, language: Language = 'fr'): string[] {
  // Easter egg : Si aucune donnée n'est saisie, rediriger vers le Rickroll 🎵
  if (!hasData(travelInfo)) {
    return ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"];
  }

  // Création du contenu formaté pour le QR code sans accents dans les libellés
  const qrCodeData = [
    `Prenom : ${normalizeString(travelInfo.firstName) || "-"}`,
    `Nom : ${normalizeString(travelInfo.lastName) || "-"}`,
    `Nationalite : ${
      travelInfo.nationality
        ? `${normalizeString(
            getCountryName(travelInfo.nationality as Country, language)
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
        normalizeString(getCountryName(travelInfo.country as Country, language))
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
  addLocationInfo(qrCodeData, travelInfo, "departure");
  addLocationInfo(qrCodeData, travelInfo, "arrival");

  // Ajouter les informations optionnelles seulement si elles sont présentes
  addHealthInfo(qrCodeData, travelInfo);
  addTrustContactsInfo(qrCodeData, travelInfo);

  return qrCodeData;
}

/**
 * Ajoute les informations de lieu (départ ou arrivée) au QR code
 */
function addLocationInfo(
  qrCodeData: string[],
  travelInfo: TravelInfo,
  type: "departure" | "arrival"
): void {
  const isArrival = type === "arrival";
  const locationKey = isArrival ? "arrivalLocation" : "departureLocation";
  const labelPrefix = isArrival ? "Arrivee" : "Depart";

  const location = travelInfo[locationKey];

  if (!location) {
    qrCodeData.push(`${labelPrefix} : -`);
    return;
  }

  switch (travelInfo.transportMode) {
    case TransportModeEnum.AIRPORT: {
      const airport = getAirportByIATA(location);
      if (airport) {
        qrCodeData.push(
          `${labelPrefix} : ${normalizeString(airport.name)} (${airport.iata})`
        );
      } else {
        qrCodeData.push(`${labelPrefix} : ${normalizeString(location) || "-"}`);
      }
      break;
    }

    case TransportModeEnum.TRAIN: {
      const station = getStationByCode(location);
      if (station) {
        const departmentInfo = station.department ? station.department : "";
        qrCodeData.push(
          `${labelPrefix} : ${normalizeString(
            station.name
          )} - ${departmentInfo} (${station.code})`
        );
      } else {
        qrCodeData.push(`${labelPrefix} : ${normalizeString(location) || "-"}`);
      }
      break;
    }

    case TransportModeEnum.CAR: {
      const city = getCityByCode(location);
      if (city) {
        qrCodeData.push(
          `${labelPrefix} : ${normalizeString(city.name)} (${city.code_postal})`
        );
      } else {
        qrCodeData.push(`${labelPrefix} : ${normalizeString(location) || "-"}`);
      }
      break;
    }

    default:
      qrCodeData.push(`${labelPrefix} : ${normalizeString(location) || "-"}`);
  }
}

/**
 * Ajoute les informations de santé au QR code
 */
function addHealthInfo(qrCodeData: string[], travelInfo: TravelInfo): void {
  // Ajouter les allergies si présentes
  if (travelInfo.allergies && travelInfo.allergies.length > 0) {
    // Convertir les IDs d'allergies en noms
    const allergiesText = travelInfo.allergies
      .map((id) => {
        const allergy = getAllergyById(id);
        return allergy ? normalizeString(allergy.name) : id;
      })
      .join(", ");
    qrCodeData.push(`Allergies : ${allergiesText}`);
  }

  // Ajouter le groupe sanguin s'il est présent
  if (travelInfo.bloodGroup) {
    const bloodGroup = getBloodGroupById(travelInfo.bloodGroup);
    qrCodeData.push(
      `Groupe sanguin : ${bloodGroup ? bloodGroup.name : travelInfo.bloodGroup}`
    );
  }

  // Ajouter les informations de santé si présentes
  if (travelInfo.healthInfo) {
    qrCodeData.push(`Sante : ${normalizeString(travelInfo.healthInfo)}`);
  }
}

/**
 * Ajoute les informations des contacts de confiance au QR code
 */
function addTrustContactsInfo(
  qrCodeData: string[],
  travelInfo: TravelInfo
): void {
  if (travelInfo.trustContacts && travelInfo.trustContacts.length > 0) {
    qrCodeData.push(`Contacts de confiance :`);
    travelInfo.trustContacts.forEach((contact, index) => {
      // Utilisation de la fonction getRelationshipLabel pour obtenir le libellé de la relation
      const relationship = getRelationshipLabel(contact.relationship);
      qrCodeData.push(
        `  ${index + 1}. ${normalizeString(
          contact.firstName
        )} ${normalizeString(contact.lastName)} - ${normalizeString(
          contact.phone
        )} (${normalizeString(relationship)})`
      );
    });
  }
}
