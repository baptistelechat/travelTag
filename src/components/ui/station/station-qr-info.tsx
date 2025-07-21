import { formatStation, getStationByCode } from "@/lib/data/stations";
import { useTravelTagStore } from "@/lib/store";
import { normalizeString } from "@/lib/utils";
import { ArrowLeftRight, ArrowRight } from "lucide-react";

interface StationQRInfoProps {
  departureStationCode: string;
  arrivalStationCode?: string;
}

/**
 * Composant pour afficher les informations d'une gare dans le QR code
 * Utilisé pour afficher les gares de départ et d'arrivée
 * Si arrivalStationCode est fourni, affiche les deux gares avec une flèche entre elles
 */
const StationQRInfo = ({
  departureStationCode,
  arrivalStationCode,
}: StationQRInfoProps) => {
  const departureStation = getStationByCode(departureStationCode);
  const arrivalStation = arrivalStationCode
    ? getStationByCode(arrivalStationCode)
    : null;

  // Fonction pour rendre une gare individuelle
  const renderStation = (
    code: string,
    station: ReturnType<typeof getStationByCode>
  ) => {
    if (!station) {
      return <div>{normalizeString(code) || "-"}</div>;
    }

    // Utiliser la fonction formatStation pour gérer la longueur et le département
    const formattedStation = formatStation(station, 21);

    return (
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{formattedStation}</span>
      </div>
    );
  };

  // Récupérer l'état du mode aller-retour depuis le store
  const { travelInfo } = useTravelTagStore();
  const isRoundTrip = travelInfo.isRoundTrip;

  // Si on a une gare d'arrivée, afficher les deux avec une flèche
  if (arrivalStation) {
    return (
      <div className="flex items-center gap-2">
        {renderStation(departureStationCode, departureStation)}
        {isRoundTrip ? (
          <ArrowLeftRight className="h-4 w-4 text-gray-500" />
        ) : (
          <ArrowRight className="h-4 w-4 text-gray-500" />
        )}
        {renderStation(arrivalStationCode!, arrivalStation)}
      </div>
    );
  }

  // Sinon, afficher juste la gare de départ
  return renderStation(departureStationCode, departureStation);
};

export { StationQRInfo };
