import { type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { type FlagProps } from "react-phone-number-input";

interface FlagComponentProps {
  country?: Country;
  countryCode?: string;
  title?: string;
  countryName?: string;
}

/**
 * Composant unifié pour afficher le drapeau d'un pays
 * Accepte soit un country (type Country) soit un countryCode (string)
 * Compatible avec l'interface FlagProps de react-phone-number-input
 */
const FlagComponent = ({
  country,
  countryCode,
  title,
  countryName,
}: FlagComponentProps) => {
  // Utiliser country s'il est fourni, sinon convertir countryCode en Country
  const flagCountry = country || (countryCode as Country);
  const Flag = flags[flagCountry];
  
  // Utiliser countryName (pour compatibilité avec FlagProps) ou title (pour rétrocompatibilité)
  const displayName = countryName || title || flagCountry;

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-xs bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={displayName} />}
    </span>
  );
};

// Pour assurer la compatibilité avec react-phone-number-input
const FlagAdapter = ({ country, countryName, flags: _, flagUrl: __ }: FlagProps) => {
  return <FlagComponent country={country} countryName={countryName} />;
};

export { FlagComponent, FlagAdapter };
export default FlagComponent;