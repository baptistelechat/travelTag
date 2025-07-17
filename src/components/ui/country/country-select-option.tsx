import { CheckIcon } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import { type Country } from "react-phone-number-input";

import { CommandItem } from "@/components/ui/command";
import { FlagComponent } from "@/components/ui/country/flag-component";

interface CountrySelectOptionProps {
  country: Country;
  countryName: string;
  selectedCountry: Country;
  onChange: (country: Country) => void;
  onSelectComplete: () => void;
  showCallingCode?: boolean;
}

/**
 * Composant partagé pour afficher une option de pays dans une liste déroulante
 * Utilisé par phone-input.tsx et country-select.tsx
 */
const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
  showCallingCode = false,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      {showCallingCode && (
        <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
          country
        )}`}</span>
      )}
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

export { CountrySelectOption };
