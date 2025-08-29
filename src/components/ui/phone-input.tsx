import { useLanguage } from "@/lib/i18n";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";

// Import des fichiers de localisation pour toutes les langues supportées
import ar from "react-phone-number-input/locale/ar.json";
import de from "react-phone-number-input/locale/de.json";
import en from "react-phone-number-input/locale/en.json";
import es from "react-phone-number-input/locale/es.json";
import fr from "react-phone-number-input/locale/fr.json";
import it from "react-phone-number-input/locale/it.json";
import ja from "react-phone-number-input/locale/ja.json";
import pt from "react-phone-number-input/locale/pt.json";
import ru from "react-phone-number-input/locale/ru.json";
import zh from "react-phone-number-input/locale/zh.json";
// Mapping des langues vers les fichiers de localisation
const localeMap = {
  fr,
  en,
  zh,
  ja,
  it,
  es,
  pt,
  ar,
  de,
  ru,
} as const;

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type CountryEntry, CountrySelector } from "./country/country-selector";
import { FlagAdapter } from "./flag-component";
type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      const { language } = useLanguage();
      const labels = localeMap[language] || localeMap.fr;

      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagAdapter}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          labels={labels}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-md rounded-s-none", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

// Utilise le type CountryEntry importé de country-selector.tsx

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <CountrySelector
      disabled={disabled}
      value={selectedCountry}
      options={countryList}
      onChange={onChange}
      buttonClassName="flex gap-1 rounded-e-none rounded-s-md border-r-0 px-3 focus:z-10"
      showCallingCode={false}
    />
  );
};

export { PhoneInput };
