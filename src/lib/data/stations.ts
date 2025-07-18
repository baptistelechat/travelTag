import { z } from "zod";
import stationsFranceData from "@/assets/stations-france.json";

// Schéma pour valider la structure d'une gare SNCF
export const StationSchema = z.object({
  name: z.string(),
  code: z.string(),
});

// Type dérivé du schéma
export type Station = z.infer<typeof StationSchema>;

// Conversion des données du fichier JSON au format de notre application
export const stations: Station[] = stationsFranceData.map((station: any) => ({
  name: station.nom,
  code: station.libellecourt,
}));

// Cette fonction n'est plus nécessaire car nous n'utilisons plus le champ city
// Elle est conservée en commentaire pour référence future
/**
 * Extrait le nom de la ville à partir du code INSEE
 * Cette fonction est une approximation, idéalement il faudrait une base de données
 * de correspondance entre codes INSEE et noms de villes
 * @param codeInsee Code INSEE de la commune
 * @returns Nom de la ville (vide si non déterminé)
 */
// function extractCityFromCodeInsee(codeInsee: string): string {
//   // Pour l'instant, on retourne une chaîne vide
//   // Dans une version future, on pourrait implémenter une correspondance
//   return "";
// }

/**
 * Recherche une gare par son nom
 * @param name Nom de la gare
 * @returns La gare correspondante ou undefined si non trouvée
 */
function findStationByName(name: string): Station | undefined {
  return stations.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
}

// Liste des gares populaires (pour l'affichage par défaut)
export const popularStations: Station[] = [
  // Paris
  findStationByName("Gare de Lyon") || { name: "Gare de Lyon", code: "PLY" },
  findStationByName("Gare du Nord") || { name: "Gare du Nord", code: "PNO" },
  findStationByName("Gare Montparnasse") || { name: "Gare Montparnasse", code: "PMO" },
  findStationByName("Gare Saint-Lazare") || { name: "Gare Saint-Lazare", code: "PSL" },
  findStationByName("Gare d'Austerlitz") || { name: "Gare d'Austerlitz", code: "PAZ" },
  findStationByName("Gare de Bercy") || { name: "Gare de Bercy", code: "PBE" },
  findStationByName("Gare de l'Est") || { name: "Gare de l'Est", code: "PES" },
  
  // Grandes villes
  findStationByName("Lyon Part-Dieu") || { name: "Lyon Part-Dieu", code: "LPD" },
  findStationByName("Marseille Saint-Charles") || { name: "Marseille Saint-Charles", code: "MSC" },
  findStationByName("Bordeaux Saint-Jean") || { name: "Bordeaux Saint-Jean", code: "BSJ" },
  findStationByName("Lille Flandres") || { name: "Lille Flandres", code: "LFL" },
  findStationByName("Nantes") || { name: "Nantes", code: "NTS" },
  findStationByName("Rennes") || { name: "Rennes", code: "REN" },
  findStationByName("Toulouse Matabiau") || { name: "Toulouse Matabiau", code: "TOU" },
  findStationByName("Strasbourg") || { name: "Strasbourg", code: "STR" },
];

// Cette fonction a été remplacée par findStationByName


/**
 * Recherche des gares par nom ou code (libellecourt)
 * @param query Texte de recherche
 * @returns Liste des gares correspondantes
 */
export function searchStations(query: string): Station[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  let results: Station[] = [];

  // Recherche par code exact (libellecourt)
  if (normalizedQuery.length === 3) {
    const directMatch = stations.find(
      (station) => station.code.toLowerCase() === normalizedQuery
    );
    if (directMatch) {
      results.push(directMatch);
    }
  }

  // Si on n'a pas assez de résultats, on fait une recherche plus large
  if (results.length < 15) {
    const otherMatches = stations
      .filter((station) => {
        // On exclut les stations déjà trouvées
        if (results.some(s => s.code === station.code)) {
          return false;
        }
        
        return (
          (station.name &&
            station.name.toLowerCase().includes(normalizedQuery)) ||
          (station.code && station.code.toLowerCase().includes(normalizedQuery))
        );
      })
      .slice(0, 15 - results.length); // On complète jusqu'à 15 résultats
    
    results = [...results, ...otherMatches];
  }

  return results.slice(0, 15); // Limiter à 15 résultats pour des raisons de performance
}

/**
 * Récupère une gare par son code (libellecourt)
 * @param code Code de la gare (libellecourt)
 * @returns La gare correspondante ou undefined si non trouvée
 */
export function getStationByCode(code: string): Station | undefined {
  if (!code) return undefined;
  return stations.find((station) => station.code === code);
}

/**
 * Formate l'affichage d'une gare
 * @param station Gare à formater
 * @param maxLength Longueur maximale totale (défaut: 26)
 * @returns Chaîne formatée (ex: "Gare de Lyon")
 */
export function formatStation(
  station: Station,
  maxLength: number = 26
): string {
  if (!station) return "";

  // Simplifier le nom de la gare
  const nameDisplay = station.name || "";

  // Raccourcir la chaîne si elle est trop longue
  return nameDisplay.length > maxLength
    ? `${nameDisplay.substring(0, maxLength)}...`
    : nameDisplay;
}
