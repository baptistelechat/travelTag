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
  gridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "30%",
    margin: "1.5%",
    padding: 5,
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

// Composant PDF pour un QR code unique
const SingleQRCodePDF = ({ travelInfo }: { travelInfo: any }) => (
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

// Composant PDF pour une grille de QR codes
const GridQRCodePDF = ({ travelInfo }: { travelInfo: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.gridView}>
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <View key={index} style={styles.gridItem}>
              <Text style={styles.nameText}>
                {travelInfo.firstName} {travelInfo.lastName}
              </Text>
              <View
                style={{ width: 100, height: 100, backgroundColor: "#f0f0f0" }}
              />
              <Text style={styles.footerText}>TravelTag.app</Text>
            </View>
          ))}
      </View>
    </Page>
  </Document>
);

export function DownloadButtons() {
  const { travelInfo, downloadMode } = useTravelTagStore();

  // Fonction pour télécharger l'aperçu en PNG
  const downloadAsPNG = () => {
    // Sélectionner l'élément à capturer (QRCodeDisplay)
    const element = document.getElementById("qrcode-display");
    
    if (element) {
      toPng(element as HTMLElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `traveltag-${travelInfo.lastName || 'qrcode'}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Erreur lors de la génération du PNG:", err);
          alert("Erreur lors de la génération du PNG. Veuillez réessayer.");
        });
    } else {
      console.error("Élément QRCodeDisplay non trouvé");
      alert("Impossible de trouver l'élément à télécharger. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={downloadAsPNG} className="flex-1">
        <Download className="mr-2 h-4 w-4" />
        Télécharger PNG
      </Button>
      
      <PDFDownloadLink
        document={
          downloadMode === "single" ? (
            <SingleQRCodePDF travelInfo={travelInfo} />
          ) : (
            <GridQRCodePDF travelInfo={travelInfo} />
          )
        }
        fileName={`traveltag-${travelInfo.lastName || 'qrcode'}.pdf`}
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