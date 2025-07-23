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