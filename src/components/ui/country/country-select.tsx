import * as React from "react";
import { getCountries, type Country } from "react-phone-number-input";

import { CountrySelector } from "@/components/ui/country/country-selector";
import { getCountryName } from "@/components/ui/country/country-utils";
import { cn } from "@/lib/utils/ui-utils";

type CountrySelectProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "value"
> & {
  value?: Country;
  onChange?: (value: Country) => void;
  defaultCountry?: Country;
};

const CountrySelect: React.ForwardRefExoticComponent<CountrySelectProps> =
  React.forwardRef<HTMLDivElement, CountrySelectProps>(
    ({ className, onChange, value, defaultCountry = "FR", ...props }, ref) => {
      const [selectedCountry, setSelectedCountry] = React.useState<Country>(
        value || defaultCountry
      );

      React.useEffect(() => {
        if (value) {
          setSelectedCountry(value);
        }
      }, [value]);

      const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        onChange?.(country);
      };

      // Générer la liste des pays
      const countryList = React.useMemo(() => {
        return getCountries().map((country) => ({
          value: country,
          label: getCountryName(country),
        }));
      }, []);

      return (
        <div ref={ref} className={cn("flex", className)} {...props}>
          <CountrySelector
            value={selectedCountry}
            options={countryList}
            onChange={handleCountryChange}
            buttonClassName="w-full justify-between"
          />
        </div>
      );
    }
  );
CountrySelect.displayName = "CountrySelect";

export { CountrySelect };
