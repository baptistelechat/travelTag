import { useTravelTagStore } from "@/lib/store";
import { useRef } from "react";
import QRCode from "react-qr-code";

export function QRCodeDisplay() {
  const { travelInfo, downloadMode } = useTravelTagStore();
  const displayRef = useRef<HTMLDivElement>(null);

  // Création du contenu JSON pour le QR code
  const qrCodeData = JSON.stringify(travelInfo);

  return (
    <div
      ref={displayRef}
      id="qrcode-display"
      className="bg-white p-4 rounded-lg border border-gray-200"
    >
      {downloadMode === "single" ? (
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
  );
}