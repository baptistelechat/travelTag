import { useEffect } from "react";
import { getUmamiConfig } from "../lib/analytics";

export const UmamiScript = () => {
  useEffect(() => {
    const config = getUmamiConfig();

    // console.log("🔍 Umami Debug Info:", {
    //   isProd: import.meta.env.PROD,
    //   isDebug: import.meta.env.VITE_DEBUG,
    //   hasWebsiteId: !!config.websiteId,
    //   hasSrc: !!config.src,
    //   shouldLoad: config.isEnabled,
    // });

    if (!config.isEnabled) {
      console.log("[TravelTag] ❌ Umami script not loaded");
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
  }, []);

  return null; // Ce composant ne rend rien visuellement
};

export default UmamiScript;
