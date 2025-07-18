import FlagComponent from "@/components/ui/flag-component";
import { getAirportByIATA } from "@/lib/data/airports";
import { useTravelTagStore } from "@/lib/store";
import { normalizeString } from "@/lib/utils";
import { ArrowLeftRight, ArrowRight } from "lucide-react";

interface AirportQRInfoProps {
  departureIataCode: string;
  arrivalIataCode?: string;
}

/**
 * Composant pour afficher les informations d'un aéroport dans le QR code
 * Utilisé pour afficher les aéroports de départ et d'arrivée avec leur drapeau
 * Si arrivalIataCode est fourni, affiche les deux aéroports avec une flèche entre eux
 */
const AirportQRInfo = ({
  departureIataCode,
  arrivalIataCode,
}: AirportQRInfoProps) => {
  const departureAirport = getAirportByIATA(departureIataCode);
  const arrivalAirport = arrivalIataCode
    ? getAirportByIATA(arrivalIataCode)
    : null;

  // Fonction pour rendre un aéroport individuel
  const renderAirport = (
    code: string,
    airport: ReturnType<typeof getAirportByIATA>
  ) => {
    if (!airport) {
      return <div>{normalizeString(code) || "-"}</div>;
    }

    return (
      <div className="flex items-center gap-1.5">
        {airport.countryCode && (
          <FlagComponent
            countryCode={airport.countryCode}
            countryName={airport.country || airport.countryCode}
          />
        )}
        <span>{airport.iata}</span>
      </div>
    );
  };

  // Récupérer l'état du mode aller-retour depuis le store
  const { travelInfo } = useTravelTagStore();
  const isRoundTrip = travelInfo.isRoundTrip;

  // Si on a un aéroport d'arrivée, afficher les deux avec une flèche
  if (arrivalAirport) {
    return (
      <div className="flex items-center gap-2">
        {renderAirport(departureIataCode, departureAirport)}
        {isRoundTrip ? (
          <ArrowLeftRight className="h-4 w-4 text-gray-500" />
        ) : (
          <ArrowRight className="h-4 w-4 text-gray-500" />
        )}
        {renderAirport(arrivalIataCode!, arrivalAirport)}
      </div>
    );
  }

  // Sinon, afficher juste l'aéroport de départ
  return renderAirport(departureIataCode, departureAirport);
};

export { AirportQRInfo };
