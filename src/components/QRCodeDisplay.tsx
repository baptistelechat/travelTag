import { useTravelTagStore } from "@/lib/store";
import { formatQRCodeData } from "@/lib/utils";
import { useRef } from "react";
import QRCode from "react-qr-code";

export function QRCodeDisplay() {
  const { travelInfo } = useTravelTagStore();
  const displayRef = useRef<HTMLDivElement>(null);

  // Utilisation de la fonction utilitaire pour formater les données du QR code
  const qrCodeData = formatQRCodeData(travelInfo).filter(Boolean).join("\n");

  return (
    <div
      ref={displayRef}
      id="qrcode-display"
      className="bg-white p-4 rounded-lg border border-gray-200"
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

        <div className="text-xs text-gray-400 mt-4 text-center">
          https://traveltag.vercel.app/
        </div>
      </div>
    </div>
  );
}
