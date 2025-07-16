import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Download, FileOutput, Grid3X3, Printer } from "lucide-react";
import { useRef } from "react";
import QRCode from "react-qr-code";

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

export function PrintableView() {
  const { travelInfo, printMode, setPrintMode } = useTravelTagStore();
  const printableRef = useRef<HTMLDivElement>(null);

  // Création du contenu JSON pour le QR code
  const qrCodeData = JSON.stringify(travelInfo);

  // Fonction pour imprimer directement
  const handlePrint = () => {
    window.print();
  };

  // Fonction pour télécharger l'aperçu en PNG
  const downloadAsPNG = () => {
    if (printableRef.current) {
      toPng(printableRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `traveltag-print-${travelInfo.lastName}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Erreur lors de la génération du PNG:", err);
        });
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <FileOutput className="h-5 w-5" />
          Version imprimable
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Boutons de mode d'affichage */}
        <div className="flex space-x-2 mb-4">
          <Button
            variant={printMode === "single" ? "default" : "outline"}
            onClick={() => setPrintMode("single")}
            className="flex-1"
          >
            <Printer className="mr-2 h-4 w-4" />
            Version simple
          </Button>
          <Button
            variant={printMode === "grid" ? "default" : "outline"}
            onClick={() => setPrintMode("grid")}
            className="flex-1"
          >
            <Grid3X3 className="mr-2 h-4 w-4" />
            Grille 3x3
          </Button>
        </div>

        {/* Aperçu imprimable */}
        <div
          ref={printableRef}
          className="bg-white p-4 rounded-lg print:p-0 print:shadow-none"
        >
          {printMode === "single" ? (
            <div className="border border-dashed border-gray-300 p-6 flex flex-col items-center">
              {(travelInfo.firstName || travelInfo.lastName) && (
                <div className="text-center mb-4 font-medium">
                  {travelInfo.firstName} {travelInfo.lastName}
                </div>
              )}

              <QRCode
                value={qrCodeData}
                size={200}
                level="M"
                className="mx-auto"
              />

              <div className="text-xs text-gray-500 mt-4 text-center">
                TravelTag.app
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="border border-dashed border-gray-300 p-2 flex flex-col items-center"
                  >
                    {(travelInfo.firstName || travelInfo.lastName) && (
                      <div className="text-center mb-1 text-sm font-medium">
                        {travelInfo.firstName} {travelInfo.lastName}
                      </div>
                    )}

                    <QRCode
                      value={qrCodeData}
                      size={80}
                      level="M"
                      className="mx-auto"
                    />

                    <div className="text-[8px] text-gray-500 mt-1 text-center">
                      TravelTag.app
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex space-x-2">
          <Button onClick={handlePrint} className="flex-1">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button onClick={downloadAsPNG} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Télécharger PNG
          </Button>
          <Button className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Télécharger PDF
          </Button>
        </div>

        <PDFDownloadLink
          document={
            printMode === "single" ? (
              <SingleQRCodePDF travelInfo={travelInfo} />
            ) : (
              <GridQRCodePDF travelInfo={travelInfo} />
            )
          }
          fileName={`traveltag-${travelInfo.lastName}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Chargement..." : "Télécharger PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </CardContent>
    </Card>
  );
}
