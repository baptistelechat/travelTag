import { type Country } from "react-phone-number-input";
import { useLanguage } from "@/lib/i18n";

// Import des fichiers de localisation pour toutes les langues supportées
import fr from "react-phone-number-input/locale/fr.json";
import en from "react-phone-number-input/locale/en.json";
import zh from "react-phone-number-input/locale/zh.json";
import ja from "react-phone-number-input/locale/ja.json";
import it from "react-phone-number-input/locale/it.json";
import es from "react-phone-number-input/locale/es.json";
import pt from "react-phone-number-input/locale/pt.json";
import ar from "react-phone-number-input/locale/ar.json";
import de from "react-phone-number-input/locale/de.json";
import ru from "react-phone-number-input/locale/ru.json";

import type { Language } from "@/lib/i18n/types";

// Mapping des langues vers les fichiers de localisation
const localeMap = {
  fr,
  en,
  zh,
  ja,
  it,
  es,
  pt,
  ar,
  de,
  ru,
} as const;

/**
 * Hook pour obtenir le nom du pays traduit selon la langue courante
 * @param country Code du pays
 * @returns Nom du pays traduit dans la langue sélectionnée
 */
export function useCountryName(country: Country): string {
  const { language } = useLanguage();
  const locale = localeMap[language] || localeMap.fr;
  return locale[country as keyof typeof locale] || country;
}

/**
 * Fonction pour obtenir le nom du pays à partir du code avec une langue spécifique
 * @param country Code du pays
 * @param language Langue souhaitée
 * @returns Nom du pays traduit dans la langue spécifiée
 */
export function getCountryName(country: Country, language: Language = 'fr'): string {
  const locale = localeMap[language] || localeMap.fr;
  return locale[country as keyof typeof locale] || country;
}

/**
 * Version legacy pour la compatibilité - utilise le français par défaut
 * @deprecated Utilisez useCountryName() ou getCountryName() avec un paramètre de langue
 */
export function getCountryNameLegacy(country: Country): string {
  return getCountryName(country, 'fr');
}