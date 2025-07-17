import { type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

interface FlagComponentProps {
  country: Country;
  countryName: string;
}

/**
 * Composant partagé pour afficher le drapeau d'un pays
 * Utilisé par phone-input.tsx et country-select.tsx
 */
const FlagComponent = ({ country, countryName }: FlagComponentProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-xs bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { FlagComponent };
