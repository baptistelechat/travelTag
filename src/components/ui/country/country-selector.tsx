import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { type Country } from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CountrySelectOption } from "@/components/ui/country/country-select-option";
import { getCountryName } from "@/components/ui/country/country-utils";
import { FlagComponent } from "@/components/ui/country/flag-component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type CountryEntry = { label: string; value: Country | undefined };

export type CountrySelectorProps = {
  disabled?: boolean;
  value: Country;
  options: CountryEntry[];
  onChange: (country: Country) => void;
  buttonClassName?: string;
  showCallingCode?: boolean;
};

/**
 * Composant partagé pour la sélection de pays
 * Utilisé par phone-input.tsx et country-select.tsx
 */
export const CountrySelector = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  buttonClassName,
  showCallingCode = true,
}: CountrySelectorProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("flex gap-2 px-3 focus:z-10", buttonClassName)}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <FlagComponent
              country={selectedCountry}
              countryName={getCountryName(selectedCountry)}
            />
            {showCallingCode && (
              <span className="text-sm">{getCountryName(selectedCountry)}</span>
            )}
          </div>
          <ChevronsUpDown
            className={cn(
              "size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Rechercher un pays..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                      showCallingCode={showCallingCode}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
