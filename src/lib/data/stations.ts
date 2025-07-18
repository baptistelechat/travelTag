import { z } from "zod";

// Schéma pour valider la structure d'une gare SNCF
export const StationSchema = z.object({
  name: z.string(),
  city: z.string(),
  code: z.string(),
});

// Type dérivé du schéma
export type Station = z.infer<typeof StationSchema>;

// Liste des principales gares SNCF en France
export const stations: Station[] = [
  { name: "Gare de Paris-Nord", city: "Paris", code: "FRPNO" },
  { name: "Gare de Paris-Est", city: "Paris", code: "FRPST" },
  { name: "Gare de Paris-Gare de Lyon", city: "Paris", code: "FRPLY" },
  { name: "Gare de Paris-Montparnasse", city: "Paris", code: "FRPMO" },
  { name: "Gare de Paris-Austerlitz", city: "Paris", code: "FRPAU" },
  { name: "Gare de Paris-Saint-Lazare", city: "Paris", code: "FRPSL" },
  { name: "Gare de Paris-Bercy", city: "Paris", code: "FRPBE" },
  { name: "Gare de Lyon Part-Dieu", city: "Lyon", code: "FRLPD" },
  { name: "Gare de Lyon-Perrache", city: "Lyon", code: "FRLPE" },
  { name: "Gare de Marseille-Saint-Charles", city: "Marseille", code: "FRMSC" },
  { name: "Gare de Bordeaux-Saint-Jean", city: "Bordeaux", code: "FRBSJ" },
  { name: "Gare de Lille-Flandres", city: "Lille", code: "FRLFL" },
  { name: "Gare de Lille-Europe", city: "Lille", code: "FRLEU" },
  { name: "Gare de Strasbourg", city: "Strasbourg", code: "FRSTR" },
  { name: "Gare de Nantes", city: "Nantes", code: "FRNAN" },
  { name: "Gare de Rennes", city: "Rennes", code: "FRREN" },
  { name: "Gare de Nice-Ville", city: "Nice", code: "FRNIC" },
  { name: "Gare de Toulouse-Matabiau", city: "Toulouse", code: "FRTLM" },
  {
    name: "Gare de Montpellier-Saint-Roch",
    city: "Montpellier",
    code: "FRMSR",
  },
  { name: "Gare de Dijon-Ville", city: "Dijon", code: "FRDIJ" },
];

/**
 * Recherche des gares par nom ou ville
 * @param query Texte de recherche
 * @returns Liste des gares correspondantes
 */
export function searchStations(query: string): Station[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();

  // Recherche par code exact
  if (normalizedQuery.length === 5) {
    const directMatch = stations.find(
      (station) => station.code.toLowerCase() === normalizedQuery
    );
    if (directMatch) {
      return [directMatch];
    }
  }

  // Recherche générale
  return stations
    .filter((station) => {
      return (
        (station.name &&
          station.name.toLowerCase().includes(normalizedQuery)) ||
        (station.city &&
          station.city.toLowerCase().includes(normalizedQuery)) ||
        (station.code && station.code.toLowerCase().includes(normalizedQuery))
      );
    })
    .slice(0, 15); // Limiter à 15 résultats pour des raisons de performance
}

/**
 * Récupère une gare par son code
 * @param code Code de la gare
 * @returns La gare correspondante ou undefined si non trouvée
 */
export function getStationByCode(code: string): Station | undefined {
  if (!code) return undefined;
  return stations.find((station) => station.code === code);
}

/**
 * Formate l'affichage d'une gare
 * @param station Gare à formater
 * @param maxLength Longueur maximale totale (défaut: 25)
 * @returns Chaîne formatée (ex: "Gare de Lyon Part-Dieu (Lyon)")
 */
export function formatStation(
  station: Station,
  maxLength: number = 26
): string {
  if (!station) return "";

  // Simplifier le nom de la gare
  const nameDisplay = station.name || "";

  // Vérifier si le nom de la gare contient déjà le nom de la ville
  let cityDisplay = "";
  if (station.city) {
    const stationNameLower = nameDisplay.toLowerCase();
    const cityNameLower = station.city.toLowerCase();

    if (
      stationNameLower === cityNameLower ||
      stationNameLower.includes(cityNameLower)
    ) {
      // Ne pas afficher la ville car elle est déjà dans le nom
      cityDisplay = "";
    } else {
      // Afficher la ville normalement
      cityDisplay = ` (${station.city})`;
    }
  }

  // Construire la chaîne complète
  const fullDisplay = `${nameDisplay}${cityDisplay}`;

  // Raccourcir la chaîne complète si elle est trop longue
  return fullDisplay.length > maxLength
    ? `${fullDisplay.substring(0, maxLength)}...`
    : fullDisplay;
}
