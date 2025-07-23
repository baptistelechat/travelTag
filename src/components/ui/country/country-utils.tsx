import { type Country } from "react-phone-number-input";
import fr from "react-phone-number-input/locale/fr.json";

/**
 * Fonction pour obtenir le nom du pays à partir du code
 * @param country Code du pays
 * @returns Nom du pays traduit en français
 */
export function getCountryName(country: Country): string {
  // Utiliser le fichier de localisation fr.json pour la traduction
  return fr[country as keyof typeof fr] || country;
}