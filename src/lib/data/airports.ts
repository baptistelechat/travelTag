import allAirportData from "airport-iata-codes";
import { z } from "zod";

// Schéma pour valider la structure d'un aéroport
export const AirportSchema = z.object({
  name: z.string(),
  city: z.string(),
  country: z.string().optional(),
  iata: z.string(),
});

// Type dérivé du schéma
export type Airport = z.infer<typeof AirportSchema>;

// Conversion des données de la bibliothèque au format de notre application
export const airports: Airport[] = allAirportData().map((airport) => ({
  name: airport.name,
  city: airport.city || airport.municipality || "",
  country: airport.county || "",
  iata: airport.iata_code,
}));

/**
 * Recherche des aéroports par nom, ville, pays ou code IATA
 * @param query Texte de recherche
 * @returns Liste des aéroports correspondants
 */
export function searchAirports(query: string): Airport[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();

  // Si la requête a exactement 3 caractères, on recherche d'abord par code IATA
  if (normalizedQuery.length === 3) {
    const directMatches = allAirportData(normalizedQuery);
    if (directMatches && directMatches.length > 0) {
      return directMatches
        .map((airport) => ({
          name: airport.name,
          city: airport.city || airport.municipality || "",
          country: airport.county || "",
          iata: airport.iata_code,
        }))
        .slice(0, 15);
    }
  }

  // Recherche générale dans notre liste locale
  return airports
    .filter((airport) => {
      return (
        (airport.name &&
          airport.name.toLowerCase().includes(normalizedQuery)) ||
        (airport.city &&
          airport.city.toLowerCase().includes(normalizedQuery)) ||
        (airport.country &&
          airport.country.toLowerCase().includes(normalizedQuery)) ||
        (airport.iata && airport.iata.toLowerCase().includes(normalizedQuery))
      );
    })
    .slice(0, 15); // Limiter à 15 résultats pour des raisons de performance
}

/**
 * Récupère un aéroport par son code IATA
 * @param iata Code IATA de l'aéroport
 * @returns L'aéroport correspondant ou undefined si non trouvé
 */
export function getAirportByIATA(iata: string): Airport | undefined {
  if (!iata) return undefined;

  // Utiliser directement la bibliothèque pour une recherche précise
  const directMatch = allAirportData(iata);
  if (directMatch && directMatch.length > 0) {
    return {
      name: directMatch[0].name,
      city: directMatch[0].city || directMatch[0].municipality || "",
      country: directMatch[0].county || "",
      iata: directMatch[0].iata_code,
    };
  }

  return undefined;
}

/**
 * Formate l'affichage d'un aéroport
 * @param airport Aéroport à formater
 * @param maxLength Longueur maximale totale (défaut: 25)
 * @returns Chaîne formatée (ex: "Charles de Gaulle (Paris)")
 */
export function formatAirport(
  airport: Airport,
  maxLength: number = 32
): string {
  if (!airport) return "";

  // Simplifier le nom de l'aéroport
  let nameDisplay = "";
  if (airport.name) {
    // Supprimer les mots communs comme "Airport", "International", etc.
    nameDisplay = airport.name
      .replace(/\bAirport\b/gi, "")
      .replace(/\bInternational\b/gi, "")
      .replace(/\bRegional\b/gi, "")
      .trim();
  }

  // Vérifier si le nom de l'aéroport contient déjà le nom de la ville
  let cityDisplay = "";
  if (airport.city) {
    // Si le nom simplifié de l'aéroport est identique au nom de la ville
    // ou si le nom de la ville est inclus dans le nom de l'aéroport
    const airportNameLower = nameDisplay.toLowerCase();
    const cityNameLower = airport.city.toLowerCase();

    if (
      airportNameLower === cityNameLower ||
      airportNameLower.includes(cityNameLower)
    ) {
      // Ne pas afficher la ville car elle est déjà dans le nom
      cityDisplay = "";
    } else {
      // Afficher la ville normalement
      cityDisplay = ` (${airport.city})`;
    }
  }

  // Construire la chaîne complète
  const fullDisplay = `${nameDisplay}${cityDisplay}`;
  
  // Raccourcir la chaîne complète si elle est trop longue
  return fullDisplay.length > maxLength
    ? `${fullDisplay.substring(0, maxLength)}...`
    : fullDisplay;
}
