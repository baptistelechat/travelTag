import citiesFranceData from "@/assets/communes-france.json";
import type { Commune } from "@/lib/types/commune";
import { z } from "zod";

// Extraction des données du fichier JSON qui a une structure avec metadata et data
const communesData = (
  citiesFranceData as unknown as {
    metadata: Record<string, unknown>;
    data: Commune[];
  }
).data;

// Schéma pour valider la structure d'une commune française
export const CitySchema = z.object({
  name: z.string(),
  code_postal: z.string(), // Code postal
  code_insee: z.string(), // Code INSEE (identifiant unique)
  department: z.string(),
});

// Type dérivé du schéma
export type City = z.infer<typeof CitySchema>;

// Conversion des données du fichier JSON au format de notre application
// Note: La structure exacte peut varier selon le format réel du fichier communes-france.json
export const cities: City[] = communesData.map((city: Commune) => ({
  name: city.nom_standard || "",
  code_postal: city.code_postal || "",
  code_insee: city.code_insee || "",
  department: city.dep_code || "",
}));

/**
 * Recherche des communes par nom ou code
 * @param query Texte de recherche
 * @returns Liste des communes correspondantes
 */
export function searchCities(query: string): City[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();

  return cities
    .filter(
      (city) =>
        city.name.toLowerCase().includes(normalizedQuery) ||
        city.code_postal.includes(normalizedQuery) ||
        city.code_insee.includes(normalizedQuery)
    )
    .sort((a, b) => a.name.localeCompare(b.name)) // Tri alphabétique par nom de ville
    .slice(0, 15); // Limiter à 15 résultats pour des raisons de performance
}

/**
 * Récupère une commune par son code INSEE
 * @param codeInsee Code INSEE de la commune
 * @returns La commune correspondante ou undefined si non trouvée
 */
export function getCityByCode(codeInsee: string): City | undefined {
  return cities.find((city) => city.code_insee === codeInsee);
}

/**
 * Récupère une commune par son code postal
 * @param codePostal Code postal de la commune
 * @returns La commune correspondante ou undefined si non trouvée
 */
export function getCityByPostalCode(codePostal: string): City | undefined {
  return cities.find((city) => city.code_postal === codePostal);
}

/**
 * Formate l'affichage d'une commune
 * @param city Commune à formater
 * @param maxLength Longueur maximale (optionnel)
 * @returns Chaîne formatée
 */
export function formatCity(city: City, maxLength?: number): string {
  if (!city) return "";

  const departmentInfo = city.department ? ` (${city.department})` : "";
  const formatted = `${city.name}${departmentInfo}`;

  if (maxLength && formatted.length > maxLength) {
    return `${formatted.substring(0, maxLength - 3)}...`;
  }

  return formatted;
}

// Liste des villes populaires (pour l'affichage par défaut)
export const popularCities: City[] = [
  // Paris
  {
    name: "Paris",
    code_postal: "75000",
    code_insee: "75056",
    department: "75",
  },
  // Lyon
  {
    name: "Lyon",
    code_postal: "69000",
    code_insee: "69123",
    department: "69",
  },
  // Marseille
  {
    name: "Marseille",
    code_postal: "13000",
    code_insee: "13055",
    department: "13",
  },
  // Toulouse
  {
    name: "Toulouse",
    code_postal: "31000",
    code_insee: "31555",
    department: "31",
  },
  // Nice
  {
    name: "Nice",
    code_postal: "06000",
    code_insee: "06088",
    department: "06",
  },
  // Nantes
  {
    name: "Nantes",
    code_postal: "44000",
    code_insee: "44109",
    department: "44",
  },
  // Strasbourg
  {
    name: "Strasbourg",
    code_postal: "67000",
    code_insee: "67482",
    department: "67",
  },
  // Montpellier
  {
    name: "Montpellier",
    code_postal: "34000",
    code_insee: "34172",
    department: "34",
  },
  // Bordeaux
  {
    name: "Bordeaux",
    code_postal: "33000",
    code_insee: "33063",
    department: "33",
  },
  // Lille
  {
    name: "Lille",
    code_postal: "59000",
    code_insee: "59350",
    department: "59",
  },
].sort((a, b) => a.name.localeCompare(b.name));
