"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  type Station,
  formatStation,
  popularStations as importedPopularStations,
  searchStations,
  stations,
} from "@/lib/data/stations";
import { cn } from "@/lib/utils";
export interface StationSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Composant pour sélectionner une gare avec recherche
 */
export function StationSelector({
  value,
  onChange,
  placeholder = "Rechercher une gare...",
  disabled,
}: StationSelectorProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  // Précharger toutes les gares
  const allStations = React.useMemo(() => stations, []);

  // Liste des gares populaires à afficher par défaut
  const popularStations = React.useMemo(() => {
    // Importer les gares populaires depuis le fichier stations.ts
    // Si aucune gare populaire n'est trouvée, utiliser une liste de secours
    if (allStations.length === 0) {
      return [];
    }

    // Utiliser la liste des gares populaires définie dans stations.ts
    if (importedPopularStations && importedPopularStations.length > 0) {
      return importedPopularStations.sort((a: Station, b: Station) => {
        return a.code.localeCompare(b.code);
      });
    }

    // Retourner un tableau vide par défaut
    return [];
  }, [allStations]);

  // Filtrer les gares en fonction de la recherche
  const filteredStations = React.useMemo(() => {
    // Si le champ est vide et que le popover est ouvert, afficher les gares populaires
    if (!searchValue || searchValue.trim() === "") {
      return isOpen ? popularStations : [];
    }

    return searchStations(searchValue);
  }, [searchValue, isOpen, popularStations]);

  // Récupérer la gare sélectionnée pour l'affichage
  const selectedStation = React.useMemo(() => {
    if (!value) return null;

    // Rechercher dans les résultats actuels
    const fromResults = filteredStations.find(
      (station) => station.code === value
    );
    if (fromResults) return fromResults;

    // Si pas trouvé, rechercher dans toutes les gares
    return allStations.find((station) => station.code === value) || null;
  }, [value, filteredStations, allStations]);

  // Gérer la sélection d'une gare
  const handleSelect = (station: Station) => {
    onChange?.(station.code);
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
            {selectedStation ? (
              <>
                <span className="font-semibold text-sm min-w-[50px] text-center">
                  {selectedStation.code}
                </span>
                <span className="truncate text-sm">
                  {formatStation(selectedStation)}
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
            placeholder={placeholder}
            autoFocus
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>Aucune gare trouvée.</CommandEmpty>
              <CommandGroup>
                {filteredStations.map((station) => {
                  return (
                    <CommandItem
                      key={station.code}
                      value={station.code}
                      onSelect={() => handleSelect(station)}
                      className="flex items-center gap-1"
                    >
                      <span className="font-semibold text-sm min-w-[50px] text-center">
                        {station.code}
                      </span>
                      <span className="truncate text-sm">
                        {formatStation(station)}
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
