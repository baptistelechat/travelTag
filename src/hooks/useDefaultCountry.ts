import { useLanguage } from '@/lib/i18n';
import type { Country } from 'react-phone-number-input';
import type { Language } from '@/lib/i18n/types';

// Mapping des langues vers les codes de pays par défaut
const languageToDefaultCountry: Record<Language, Country> = {
  fr: 'FR', // France
  en: 'GB', // Royaume-Uni
  zh: 'CN', // Chine
  ja: 'JP', // Japon
  it: 'IT', // Italie
  es: 'ES', // Espagne
  pt: 'PT', // Portugal
  ar: 'SA', // Arabie Saoudite
  de: 'DE', // Allemagne
  ru: 'RU'  // Russie
};

/**
 * Hook pour obtenir le pays par défaut basé sur la langue sélectionnée
 * Utilisé pour les sélecteurs de nationalité, pays et téléphone
 */
export function useDefaultCountry(): Country {
  const { language } = useLanguage();
  return languageToDefaultCountry[language] || 'FR';
}

/**
 * Hook pour obtenir le mapping complet langue -> pays
 * Utile pour d'autres composants qui ont besoin du mapping complet
 */
export function useLanguageToCountryMapping(): Record<Language, Country> {
  return languageToDefaultCountry;
}