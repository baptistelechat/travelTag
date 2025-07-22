import { getCityByCode } from "@/lib/data/cities";
import { useTravelTagStore } from "@/lib/store";
import { normalizeString } from "@/lib/utils";
import { ArrowLeftRight, ArrowRight } from "lucide-react";

interface CityQRInfoProps {
  departureCityCode: string;
  arrivalCityCode?: string;
}

/**
 * Composant pour afficher les informations d'une ville dans le QR code
 * Utilisé pour afficher les villes de départ et d'arrivée
 * Si arrivalCityCode est fourni, affiche les deux villes avec une flèche entre elles
 */
const CityQRInfo = ({
  departureCityCode,
  arrivalCityCode,
}: CityQRInfoProps) => {
  const departureCity = getCityByCode(departureCityCode);
  const arrivalCity = arrivalCityCode ? getCityByCode(arrivalCityCode) : null;

  // Fonction pour rendre une ville individuelle
  const renderCity = (code: string, city: ReturnType<typeof getCityByCode>) => {
    if (!city) {
      return <div>{normalizeString(code) || "-"}</div>;
    }

    return (
      <div className="flex items-center gap-1.5">
        <span className="text-sm">
          {city.name} ({city.code_postal})
        </span>
      </div>
    );
  };

  // Récupérer l'état du mode aller-retour depuis le store
  const { travelInfo } = useTravelTagStore();
  const isRoundTrip = travelInfo.isRoundTrip;

  // Si on a une ville d'arrivée, afficher les deux avec une flèche
  if (arrivalCity) {
    return (
      <div className="flex items-center gap-2">
        {renderCity(departureCityCode, departureCity)}
        {isRoundTrip ? (
          <ArrowLeftRight className="h-4 w-4 text-gray-500" />
        ) : (
          <ArrowRight className="h-4 w-4 text-gray-500" />
        )}
        {renderCity(arrivalCityCode!, arrivalCity)}
      </div>
    );
  }

  // Sinon, afficher juste la ville de départ
  return renderCity(departureCityCode, departureCity);
};

export { CityQRInfo };
