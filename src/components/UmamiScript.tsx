import { useEffect, useState } from "react";
import { getUmamiConfig } from "../lib/analytics";

export const UmamiScript = () => {
  const [consentStatus, setConsentStatus] = useState<string | null>(null);

  // Écouter les changements de consentement
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("umami-consent");
      setConsentStatus(consent);
    };

    // Vérifier le consentement initial
    checkConsent();

    // Écouter les changements dans le localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "umami-consent") {
        checkConsent();
      }
    };

    // Écouter l'événement personnalisé de changement de consentement
    const handleConsentChange = () => {
      checkConsent();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("umami-consent-changed", handleConsentChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("umami-consent-changed", handleConsentChange);
    };
  }, []);

  useEffect(() => {
    const config = getUmamiConfig();

    // console.log("🔍 Umami Debug Info:", {
    //   isProd: import.meta.env.PROD,
    //   isDebug: import.meta.env.VITE_DEBUG,
    //   hasWebsiteId: !!config.websiteId,
    //   hasSrc: !!config.src,
    //   shouldLoad: config.isEnabled,
    //   hasConsent: config.hasConsent,
    // });

    // Supprimer le script existant s'il y en a un
    const existingScript = document.querySelector('script[data-website-id]');
    if (existingScript) {
      existingScript.remove();
      console.log("[TravelTag] 🗑️ Existing Umami script removed");
    }

    // Si le consentement est refusé, supprimer umami du window et arrêter
    if (consentStatus === "refused") {
      if (window.umami) {
        delete window.umami;
        console.log("[TravelTag] 🚫 Umami tracking disabled - consent refused");
      }
      return;
    }

    if (!config.isEnabled || !config.hasConsent) {
      console.log("[TravelTag] ❌ Umami script not loaded - missing config or consent");
      return;
    }

    // Vérifier si le script n'est pas déjà chargé
    if (
      document.querySelector(`script[data-website-id="${config.websiteId}"]`)
    ) {
      console.log("[TravelTag] ✅ Umami script already loaded");
      return;
    }

    // Créer et injecter le script Umami
    const script = document.createElement("script");
    script.async = true;
    script.src = config.src;
    script.setAttribute("data-website-id", config.websiteId);
    script.setAttribute("data-domains", window.location.hostname);

    // Ajouter le script au head
    document.head.appendChild(script);

    console.log("[TravelTag] ✅ Umami script loaded successfully");

    // Cleanup function pour retirer le script si le composant est démonté
    return () => {
      const existingScript = document.querySelector(
        `script[data-website-id="${config.websiteId}"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [consentStatus]); // Dépendance sur le statut de consentement

  return null; // Ce composant ne rend rien visuellement
};

export default UmamiScript;
