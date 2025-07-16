import { Button } from "@/components/ui/button";
import { useTravelTagStore } from "@/lib/store";
import { toPng } from "html-to-image";
import { Download, Grid2X2, Printer } from "lucide-react";
import { useState } from "react";

export function DownloadButtons() {
  const { travelInfo } = useTravelTagStore();
  const [printMode, setPrintMode] = useState<"single" | "grid">("single");

  // Fonction pour télécharger l'aperçu en PNG
  const downloadAsPNG = () => {
    // Sélectionner l'élément à capturer (QRCodeDisplay)
    const element = document.getElementById("qrcode-display");

    if (element) {
      // Options pour html-to-image
      const options = {
        // Assurer que tout le contenu est capturé, y compris le nom et prénom
        quality: 0.95,
        backgroundColor: "white",
      };

      toPng(element as HTMLElement, options)
        .then((dataUrl) => {
          const link = document.createElement("a");
          // Inclure prénom et nom dans le nom du fichier s'ils existent
          const fileName =
            travelInfo.firstName && travelInfo.lastName
              ? `traveltag-${travelInfo.firstName}-${travelInfo.lastName}.png`
              : `traveltag-${travelInfo.lastName || "qrcode"}.png`;

          link.download = fileName;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Erreur lors de la génération du PNG:", err);
          alert("Erreur lors de la génération du PNG. Veuillez réessayer.");
        });
    } else {
      console.error("Élément QRCodeDisplay non trouvé");
      alert(
        "Impossible de trouver l'élément à télécharger. Veuillez réessayer."
      );
    }
  };

  // Fonction pour imprimer le QR code
  const printQRCode = () => {
    // Nettoyer les classes d'impression précédentes
    document.body.classList.remove("print-single", "print-grid");
    document.documentElement.classList.remove("print-mode");

    // Appliquer les classes d'impression
    document.body.classList.add(`print-${printMode}`);
    document.documentElement.classList.add("print-mode");

    // Préparer les éléments pour l'impression
    if (printMode === "grid") {
      // Rendre visible le conteneur de la grille
      const gridContainer = document.getElementById("print-grid-container");
      if (gridContainer) {
        gridContainer.classList.remove("hidden");
        gridContainer.style.visibility = "visible";
        gridContainer.style.display = "block";
      }

      // Rendre visible la grille elle-même
      const gridElement = document.getElementById("qrcode-grid");
      if (gridElement) {
        gridElement.style.visibility = "visible";
        gridElement.style.display = "block";
      }
    } else {
      // S'assurer que la grille est cachée en mode single
      const gridContainer = document.getElementById("print-grid-container");
      if (gridContainer) {
        gridContainer.classList.add("hidden");
        gridContainer.style.visibility = "hidden";
        gridContainer.style.display = "none";
      }

      const gridElement = document.getElementById("qrcode-grid");
      if (gridElement) {
        gridElement.style.visibility = "hidden";
        gridElement.style.display = "none";
      }
    }

    // Lancer l'impression après un court délai pour s'assurer que les styles sont appliqués
    // Le délai est nécessaire pour que les styles CSS soient correctement appliqués avant l'impression
    setTimeout(() => {
      window.print();

      // Nettoyer après l'impression
      setTimeout(() => {
        // Restaurer l'état initial - toujours cacher la grille après impression
        const gridContainer = document.getElementById("print-grid-container");
        if (gridContainer) {
          gridContainer.classList.add("hidden");
          gridContainer.style.visibility = "hidden";
          gridContainer.style.display = "none";
        }

        const gridElement = document.getElementById("qrcode-grid");
        if (gridElement) {
          gridElement.style.visibility = "hidden";
          gridElement.style.display = "none";
        }

        // Supprimer les classes d'impression
        document.body.classList.remove("print-single", "print-grid");
        document.documentElement.classList.remove("print-mode");
      }, 500);
    }, 300);
  };

  // Fonction pour basculer entre les modes d'impression
  const togglePrintMode = () => {
    const newMode = printMode === "single" ? "grid" : "single";
    setPrintMode(newMode);

    // Mettre à jour la visibilité de la grille en fonction du nouveau mode
    const gridContainer = document.getElementById("print-grid-container");
    const gridElement = document.getElementById("qrcode-grid");

    if (newMode === "grid") {
      // Ne pas rendre visible la grille ici, seulement lors de l'impression
      // Cela évite que la grille ne soit visible en permanence
    } else {
      // S'assurer que la grille est cachée en mode single
      if (gridContainer) {
        gridContainer.classList.add("hidden");
        gridContainer.style.visibility = "hidden";
        gridContainer.style.display = "none";
      }

      if (gridElement) {
        gridElement.style.visibility = "hidden";
        gridElement.style.display = "none";
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Button onClick={downloadAsPNG} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Télécharger PNG
        </Button>

        <Button onClick={printQRCode} className="flex-1" variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </Button>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="text-sm text-gray-500">Mode d'impression:</div>
        <Button
          onClick={togglePrintMode}
          variant="ghost"
          size="sm"
          className="text-xs"
        >
          <Grid2X2 className="mr-1 h-3 w-3" />
          {printMode === "single" ? "Un QR code" : "2×3 QR codes"}
        </Button>
      </div>
    </div>
  );
}
