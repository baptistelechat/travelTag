import { Button } from "@/components/ui/button";
import { useTravelTagStore } from "@/lib/store";
import { toPng } from "html-to-image";
import { Download, Printer } from "lucide-react";

export function DownloadButtons() {
  const { travelInfo } = useTravelTagStore();

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
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button onClick={downloadAsPNG} className="flex-1">
        <Download className="mr-2 h-4 w-4" />
        Télécharger PNG
      </Button>

      <Button onClick={printQRCode} className="flex-1" variant="outline">
        <Printer className="mr-2 h-4 w-4" />
        Imprimer
      </Button>
    </div>
  );
}
