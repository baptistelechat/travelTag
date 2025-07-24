// Configuration Umami
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const umamiSrc = import.meta.env.VITE_UMAMI_SRC;

// Configuration centralisée pour Umami
export const getUmamiConfig = () => ({
  websiteId: umamiWebsiteId,
  src: umamiSrc,
  isEnabled: (import.meta.env.PROD || import.meta.env.VITE_DEBUG) && !!umamiWebsiteId && !!umamiSrc
});

// Fonction pour vérifier si Umami est activé (rétrocompatibilité)
export const isUmamiEnabled = (): boolean => {
  return getUmamiConfig().isEnabled;
};

// Vérifier si Umami est configuré et prêt à être utilisé
const isUmamiReady = () => {
  return (
    isUmamiEnabled() &&
    typeof window !== "undefined" &&
    window.umami
  );
};

// Fonction générique pour tracker un événement
const trackEvent = (eventName: string, eventData?: Record<string, string | number | boolean>) => {
  if (!isUmamiReady()) return;

  try {
    // Vérification supplémentaire pour TypeScript
    if (window.umami) {
      window.umami.track(eventName, eventData);
    }
  } catch (error) {
    console.warn("Erreur lors du tracking Umami:", error);
  }
};

// Fonctions spécifiques pour les téléchargements et impressions uniquement
export const analytics = {
  // Tracker les téléchargements PNG
  trackPNGDownload: () => {
    trackEvent("png_download");
  },

  // Tracker les impressions
  trackPrint: (gridSize?: string) => {
    const eventData = gridSize ? { grid_size: gridSize } : undefined;
    trackEvent("print", eventData);
  },
};

// Déclaration du type global pour umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}
