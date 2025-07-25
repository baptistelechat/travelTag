import { create } from "zustand";
import { persist } from "zustand/middleware";
import { translations } from "./translations";
import type { Language } from "./types";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Store pour gérer la langue courante
const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "fr" as Language,
      setLanguage: (language: Language) => set({ language }),
    }),
    {
      name: "traveltag-language",
    }
  )
);

// Hook pour accéder aux traductions
export function useTranslation() {
  const { language, setLanguage } = useLanguageStore();

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Retourne la clé si la traduction n'est pas trouvée
      }
    }

    return typeof value === "string" ? value : key;
  };

  return {
    t,
    language,
    setLanguage,
    translations: translations[language],
  };
}

// Hook pour changer de langue facilement
export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();

  return {
    language,
    setLanguage,
    isEnglish: language === "en",
    isFrench: language === "fr",
  };
}
