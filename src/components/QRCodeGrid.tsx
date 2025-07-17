import { useTravelTagStore } from "@/lib/store";
import QRCode from "react-qr-code";

/**
 * Composant QRCodeGrid
 *
 * Ce composant génère une grille dynamique de QR codes pour l'impression.
 * Le nombre de lignes et de colonnes est configurable via gridConfig dans le store.
 * Il n'est pas affiché dans l'interface utilisateur normale, mais uniquement lors de l'impression
 * en mode grille. Les QR codes sont générés à partir des informations de voyage saisies par
 * l'utilisateur et sont dimensionnés pour utiliser efficacement l'espace d'une page A4.
 */
export function QRCodeGrid() {
  const { travelInfo, gridConfig } = useTravelTagStore();

  // Création du contenu formaté pour le QR code sans accents dans les libellés
  const qrCodeData = [
    `Nom: ${travelInfo.lastName || "-"}`,
    `Prenom: ${travelInfo.firstName || "-"}`,
    `Telephone: ${travelInfo.phone || "-"}`,
    `Depart: ${travelInfo.departureLocation || "-"}`,
    `Arrivee: ${travelInfo.arrivalLocation || "-"}`,
    travelInfo.healthInfo ? `Sante: ${travelInfo.healthInfo}` : null,
    travelInfo.additionalInfo ? `Infos: ${travelInfo.additionalInfo}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // Créer un tableau de QR codes basé sur la configuration de la grille
  const totalQRCodes = gridConfig.rows * gridConfig.cols;
  const qrCodes = Array(totalQRCodes).fill(null);

  return (
    <div id="qrcode-grid" className="qrcode-grid-container">
      
        <div 
          className="grid-container" 
          style={{
            gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
            '--grid-cols': gridConfig.cols,
            '--grid-rows': gridConfig.rows
          } as React.CSSProperties}
        >
          {qrCodes.map((_, index) => (
            <div key={index} className="qrcode-item">
              <div className="qrcode-content">
                {(travelInfo.firstName || travelInfo.lastName) && (
                  <div className="qrcode-name">
                    {travelInfo.firstName} {travelInfo.lastName}
                  </div>
                )}

                {/* Conteneur du QR code qui s'adapte à l'espace disponible */}
                <div className="qrcode-svg-container">
                  <QRCode
                    value={qrCodeData}
                    size={100}
                    level="M"
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>

                <div className="qrcode-url">https://traveltag.vercel.app/</div>
              </div>
            </div>
          ))}
        </div>
  
    </div>
  );
}
