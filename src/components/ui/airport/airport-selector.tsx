import { ChevronsUpDown, MapPin } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import FlagComponent from "@/components/ui/flag-component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  airports,
  formatAirport,
  searchAirports,
  type Airport,
} from "@/lib/data/airports";
import { cn } from "@/lib/utils";

export interface AirportSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Composant pour sélectionner un aéroport avec recherche
 */
export function AirportSelector({
  value,
  onChange,
  placeholder = "Rechercher un aéroport...",
  disabled,
}: AirportSelectorProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  // Précharger tous les aéroports
  const allAirports = React.useMemo(() => airports, []);

  // Liste des aéroports populaires à afficher par défaut
  const popularAirports = React.useMemo(() => {
    // Codes IATA des aéroports populaires
    const popularCodes = [
      "ATL",
      "DXB",
      "PEK",
      "LHR",
      "LAX",
      "SIN",
      "HND",
      "CDG",
      "IST",
      "FRA",
      "HKG",
      "JFK",
      "DOH",
      "ICN",
      "AMS",
    ];
    return allAirports
      .filter((airport) => popularCodes.includes(airport.iata))
      .sort((a, b) => {
        return a.iata.localeCompare(b.iata);
      });
  }, [allAirports]);

  // Filtrer les aéroports en fonction de la recherche
  const filteredAirports = React.useMemo(() => {
    // Si le champ est vide et que le popover est ouvert, afficher les aéroports populaires
    if (!searchValue || searchValue.trim() === "") {
      return isOpen ? popularAirports : [];
    }

    const normalizedQuery = searchValue.toLowerCase().trim();

    // Si la requête a exactement 3 caractères, on recherche d'abord par code IATA
    if (normalizedQuery.length === 3) {
      const directMatches = searchAirports(normalizedQuery);
      if (directMatches && directMatches.length > 0) {
        return directMatches;
      }
    }

    // Recherche générale dans notre liste locale
    return allAirports
      .filter((airport) => {
        return (
          (airport.name &&
            airport.name.toLowerCase().includes(normalizedQuery)) ||
          (airport.city &&
            airport.city.toLowerCase().includes(normalizedQuery)) ||
          (airport.country &&
            airport.country.toLowerCase().includes(normalizedQuery)) ||
          (airport.iata && airport.iata.toLowerCase().includes(normalizedQuery))
        );
      })
      .slice(0, 15); // Limiter à 15 résultats pour des raisons de performance
  }, [searchValue, allAirports, isOpen, popularAirports]);

  // Récupérer l'aéroport sélectionné pour l'affichage
  const selectedAirport = React.useMemo(() => {
    if (!value) return null;

    // Rechercher dans les résultats actuels
    const fromResults = filteredAirports.find(
      (airport) => airport.iata === value
    );
    if (fromResults) return fromResults;

    // Si pas trouvé, rechercher dans tous les aéroports
    return allAirports.find((airport) => airport.iata === value) || null;
  }, [value, filteredAirports, allAirports]);

  // Gérer la sélection d'un aéroport
  const handleSelect = (airport: Airport) => {
    onChange?.(airport.iata);
    setIsOpen(false);
    setSearchValue("");
  };

  // Gérer l'ouverture du popover
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    // Si on ferme le popover, réinitialiser la recherche
    if (!open) {
      setSearchValue("");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex w-full justify-between gap-2 px-3 focus:z-10"
          disabled={disabled}
        >
          <div className="flex items-center gap-1.5 overflow-hidden">
            {selectedAirport ? (
              <>
                {selectedAirport.countryCode && (
                  <FlagComponent
                    countryCode={selectedAirport.countryCode}
                    countryName={
                      selectedAirport.country || selectedAirport.countryCode
                    }
                  />
                )}
                <span className="font-semibold text-sm min-w-[40px] text-center">
                  {selectedAirport.iata}
                </span>
                <span className="truncate text-sm">
                  {formatAirport(selectedAirport)}
                </span>
              </>
            ) : (
              <>
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-sm">{placeholder}</span>
              </>
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
        <Command shouldFilter={false}>
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
            placeholder="Rechercher un aéroport..."
            autoFocus
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>Aucun aéroport trouvé.</CommandEmpty>
              <CommandGroup>
                {filteredAirports.map((airport) => {
                  return (
                    <CommandItem
                      key={airport.iata}
                      value={airport.iata}
                      onSelect={() => handleSelect(airport)}
                      className="flex items-center gap-1"
                    >
                      {airport.countryCode && (
                        <FlagComponent
                          countryCode={airport.countryCode}
                          countryName={airport.country || airport.countryCode}
                        />
                      )}
                      <span className="font-semibold text-sm min-w-[40px] text-center">
                        {airport.iata}
                      </span>
                      <span className="truncate text-sm">
                        {formatAirport(airport)}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
