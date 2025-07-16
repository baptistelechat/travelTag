import { useTravelTagStore } from "@/lib/store";
import { useRef } from "react";
import QRCode from "react-qr-code";

export function QRCodeDisplay() {
  const { travelInfo } = useTravelTagStore();
  const displayRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={displayRef}
      id="qrcode-display"
      className="bg-white p-4 rounded-lg border border-gray-200"
    >
      <div className="border border-dashed border-gray-300 p-6 flex flex-col items-center">
        {(travelInfo.firstName || travelInfo.lastName) && (
          <div className="text-center mb-4 font-medium">
            {travelInfo.firstName} {travelInfo.lastName}
          </div>
        )}

        <QRCode value={qrCodeData} size={200} level="M" className="mx-auto" />

        <div className="text-xs text-gray-500 mt-4 text-center">
          https://traveltag.vercel.app/
        </div>
      </div>
    </div>
  );
}
