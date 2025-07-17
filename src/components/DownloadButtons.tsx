import { Button } from "@/components/ui/button";
import { useTravelTagStore } from "@/lib/store";
import { hasData } from "@/lib/utils";
import { toPng } from "html-to-image";
import { Download, Grid2X2, Printer, Plus, Minus } from "lucide-react";
import { useState } from "react";

export function DownloadButtons() {
  const { travelInfo, gridConfig, setGridConfig } = useTravelTagStore();
  const [printMode, setPrintMode] = useState<"single" | "grid">("single");
  
  // Fonction pour ajuster le nombre de lignes et colonnes
  const adjustGridSize = (dimension: "rows" | "cols", increment: boolean) => {
    const value = gridConfig[dimension];
    const newValue = increment ? value + 1 : Math.max(1, value - 1);
    
    // Limiter à un maximum raisonnable pour une page A4
    const maxRows = 6; // Maximum de lignes pour une page A4
    const maxCols = 4; // Maximum de colonnes pour une page A4
    
    if ((dimension === "rows" && newValue <= maxRows) || 
        (dimension === "cols" && newValue <= maxCols)) {
      setGridConfig({ [dimension]: newValue });
    }
  };

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

  // Utilise la fonction hasData importée depuis utils.ts
  const hasDataValue = hasData(travelInfo);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Button onClick={downloadAsPNG} className="flex-1" disabled={!hasDataValue}>
          <Download className="mr-2 h-4 w-4" />
          Télécharger PNG
        </Button>

        <Button
          onClick={printQRCode}
          className="flex-1"
          variant="outline"
          disabled={!hasDataValue}
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </Button>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Mode d'impression:</div>
          <Button
            onClick={togglePrintMode}
            variant="outline"
            size="sm"
            className="text-xs"
            disabled={!hasDataValue}
          >
            <Grid2X2 className="mr-1 h-3 w-3" />
            {printMode === "single" ? "Un QR code" : `${gridConfig.cols}×${gridConfig.rows} QR codes`}
          </Button>
        </div>
        
        {/* Contrôles de configuration de la grille - visible uniquement en mode grille */}
        {printMode === "grid" && (
          <div className="flex flex-col gap-2 p-2 border border-dashed rounded-md">
            <div className="text-xs text-gray-500 mb-1">Configuration de la grille:</div>
            
            {/* Contrôle du nombre de colonnes */}
            <div className="flex items-center justify-between">
              <span className="text-xs">Colonnes:</span>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => adjustGridSize("cols", false)}
                  disabled={gridConfig.cols <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-xs w-4 text-center">{gridConfig.cols}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => adjustGridSize("cols", true)}
                  disabled={gridConfig.cols >= 4}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Contrôle du nombre de lignes */}
            <div className="flex items-center justify-between">
              <span className="text-xs">Lignes:</span>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => adjustGridSize("rows", false)}
                  disabled={gridConfig.rows <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-xs w-4 text-center">{gridConfig.rows}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => adjustGridSize("rows", true)}
                  disabled={gridConfig.rows >= 6}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
