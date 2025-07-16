import { Button } from "@/components/ui/button";
import { useTravelTagStore } from "@/lib/store";
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useMemo } from "react";

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  singleView: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #000000",
  },
  nameText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#666666",
    marginTop: 5,
    textAlign: "center",
  },
});

// Composant PDF pour le QR code
const QRCodePDF = ({ travelInfo }: { travelInfo: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.singleView}>
        <Text style={styles.nameText}>
          {travelInfo.firstName} {travelInfo.lastName}
        </Text>
        {/* Note: React-PDF ne peut pas rendre directement des composants React comme QRCode */}
        {/* À la place, nous utilisons un placeholder et l'image sera ajoutée manuellement */}
        <View style={{ width: 200, height: 200, backgroundColor: "#f0f0f0" }} />
        <Text style={styles.footerText}>TravelTag.app</Text>
      </View>
    </Page>
  </Document>
);



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
        backgroundColor: "white"
      };

      toPng(element as HTMLElement, options)
        .then((dataUrl) => {
          const link = document.createElement("a");
          // Inclure prénom et nom dans le nom du fichier s'ils existent
          const fileName = travelInfo.firstName && travelInfo.lastName
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

  // Mémoriser le document PDF et le nom de fichier pour éviter les re-rendus inutiles
  const pdfDocument = useMemo(() => <QRCodePDF travelInfo={travelInfo} />, [travelInfo]);
  
  // Générer un nom de fichier cohérent incluant prénom et nom si disponibles
  const pdfFileName = useMemo(() => {
    if (travelInfo.firstName && travelInfo.lastName) {
      return `traveltag-${travelInfo.firstName}-${travelInfo.lastName}.pdf`;
    }
    return `traveltag-${travelInfo.lastName || "qrcode"}.pdf`;
  }, [travelInfo.firstName, travelInfo.lastName]);

  return (
    <div className="flex space-x-2">
      <Button onClick={downloadAsPNG} className="flex-1">
        <Download className="mr-2 h-4 w-4" />
        Télécharger PNG
      </Button>

      <PDFDownloadLink
        document={pdfDocument}
        fileName={pdfFileName}
        className="flex-1"
      >
        {({ loading }) => (
          <Button disabled={loading} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Chargement..." : "Télécharger PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
