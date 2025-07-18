import { AirportQRInfo } from "@/components/ui/airport/airport-qr-info";
import { useTravelTagStore } from "@/lib/store";
import { formatQRCodeData } from "@/lib/utils";
import { useRef } from "react";
import QRCode from "react-qr-code";

export function QRCodeDisplay() {
  const { travelInfo, updateTravelInfo } = useTravelTagStore();
  const displayRef = useRef<HTMLDivElement>(null);
  
  // Fonction pour basculer le mode aller-retour lors du clic sur la carte
  const toggleRoundTrip = () => {
    updateTravelInfo({ isRoundTrip: !travelInfo.isRoundTrip });
  };

  // Utilisation de la fonction utilitaire pour formater les données du QR code
  const qrCodeData = formatQRCodeData(travelInfo).filter(Boolean).join("\n");

  // Informations pour l'affichage visuel (avec drapeaux)
  const qrCodeVisual = (
    <div className="text-sm">
      <AirportQRInfo
        departureIataCode={travelInfo.departureLocation}
        arrivalIataCode={travelInfo.arrivalLocation}
      />
    </div>
  );

  return (
    <div
      ref={displayRef}
      id="qrcode-display"
      className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
      onClick={toggleRoundTrip}
      title="Cliquer pour activer/désactiver le mode aller-retour"
    >
      <div className="p-6 flex flex-col items-center">
        {(travelInfo.firstName || travelInfo.lastName) && (
          <div className="text-center mb-4 font-medium">
            {travelInfo.firstName} {travelInfo.lastName}
          </div>
        )}

        <QRCode
          value={qrCodeData}
          size={300}
          level="M"
          className="mx-auto"
          bgColor="#FFFFFF"
          fgColor="#000000"
        />

        {travelInfo.departureLocation || travelInfo.arrivalLocation ? (
          <div className="mt-4 text-center flex items-center justify-center gap-2">
            {qrCodeVisual}
          </div>
        ) : null}

        <div className="text-xs text-gray-400 mt-4 text-center">
          https://traveltag.vercel.app/
        </div>
      </div>
    </div>
  );
}
