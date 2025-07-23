import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { useTravelTagStore } from "../lib/store";
import { hasData } from "../lib/utils/travel-utils";

/**
 * Hook personnalisé pour gérer l'impression via Ctrl+P
 * Utilise react-hotkeys-hook pour intercepter Ctrl+P et déclencher le clic sur le bouton d'impression
 */
export function usePrintHandler() {
  // Récupérer les données de voyage depuis le store
  const travelInfo = useTravelTagStore((state) => state.travelInfo);

  useHotkeys(
    "ctrl+p",
    (event) => {
      // Annuler l'événement d'impression par défaut
      event.preventDefault();

      // Vérifier si le formulaire contient des données
      if (!hasData(travelInfo)) {
        console.log("Formulaire vide, impression annulée");
        toast.error("Formulaire vide, impression annulée");
        return;
      }

      // Afficher l'overlay avec effet de flou
      const overlay = document.getElementById("print-overlay");
      if (overlay) {
        overlay.classList.add("print-overlay-visible");
      }

      // Trouver le bouton d'impression et simuler un clic
      const buttons = document.querySelectorAll("button");
      for (const btn of Array.from(buttons)) {
        if (btn.textContent?.includes("Imprimer")) {
          // Simuler un clic sur le bouton d'impression
          btn.click();
          return;
        }
      }
    },
    { enableOnFormTags: true, preventDefault: true }
  );
}
