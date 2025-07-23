import { AirportQRInfo } from "@/components/ui/airport/airport-qr-info";
import { CityQRInfo } from "@/components/ui/city/city-qr-info";
import FlagComponent from "@/components/ui/flag-component";
import { StationQRInfo } from "@/components/ui/station/station-qr-info";
import { useTravelTagStore } from "@/lib/store";
import { TransportModeEnum } from "@/lib/types/transport-mode.enum";
import { formatQRCodeData } from "@/lib/utils";
import { useRef } from "react";
import { type Country } from "react-phone-number-input";
import QRCode from "react-qr-code";

export function QRCodeDisplay() {
  const { travelInfo } = useTravelTagStore();
  const displayRef = useRef<HTMLDivElement>(null);

  // Utilisation de la fonction utilitaire pour formater les données du QR code
  const qrCodeData = formatQRCodeData(travelInfo).filter(Boolean).join("\n");

  // Informations pour l'affichage visuel (avec drapeaux)
  const qrCodeVisual = (
    <div className="text-sm">
      {travelInfo.transportMode === TransportModeEnum.AIRPORT ? (
        <AirportQRInfo
          departureIataCode={travelInfo.departureLocation}
          arrivalIataCode={travelInfo.arrivalLocation}
        />
      ) : travelInfo.transportMode === TransportModeEnum.TRAIN ? (
        <StationQRInfo
          departureStationCode={travelInfo.departureLocation}
          arrivalStationCode={travelInfo.arrivalLocation}
        />
      ) : (
        <CityQRInfo
          departureCityCode={travelInfo.departureLocation}
          arrivalCityCode={travelInfo.arrivalLocation}
        />
      )}
    </div>
  );

  return (
    <div
      ref={displayRef}
      id="qrcode-display"
      className="bg-white p-4 rounded-lg border border-gray-200"
    >
      <div className="p-6 flex flex-col items-center">
        {(travelInfo.firstName || travelInfo.lastName) && (
          <div className="text-center mb-4 font-medium flex items-center justify-center gap-2">
            <div className="flex-shrink-0">
              <FlagComponent country={travelInfo.nationality as Country} />
            </div>
            <span>
              {travelInfo.firstName} {travelInfo.lastName}
            </span>
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
