import { useTravelTagStore } from "@/lib/store";
import QRCode from "react-qr-code";

/**
 * Composant QRCodeGrid
 *
 * Ce composant génère une grille de 6 QR codes (2 colonnes x 3 lignes) pour l'impression.
 * Il n'est pas affiché dans l'interface utilisateur normale, mais uniquement lors de l'impression
 * en mode grille. Les QR codes sont générés à partir des informations de voyage saisies par
 * l'utilisateur et sont dimensionnés pour utiliser efficacement l'espace d'une page A4.
 */
export function QRCodeGrid() {
  const { travelInfo } = useTravelTagStore();

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

  // Créer un tableau de 6 QR codes (2 colonnes x 3 lignes)
  const qrCodes = Array(6).fill(null);

  // Vérifier si des données sont présentes
  const hasData =
    travelInfo.lastName || travelInfo.firstName || travelInfo.phone;

  return (
    <div id="qrcode-grid" className="qrcode-grid-container">
      {hasData ? (
        <div className="grid-container">
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
      ) : (
        <div className="print-message">
          Veuillez remplir au moins un champ du formulaire pour générer des QR
          codes.
        </div>
      )}
    </div>
  );
}
