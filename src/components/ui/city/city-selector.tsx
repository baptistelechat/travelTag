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
  formatCity,
  getCityByCode,
  popularCities,
  searchCities,
} from "@/lib/data/cities";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, MapPin } from "lucide-react";
import * as React from "react";

interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Composant de sélection de ville
 * Permet de rechercher et sélectionner une ville française
 */
export function CitySelector({
  value,
  onChange,
  placeholder = "Sélectionner une ville",
  className,
}: CitySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Récupérer la ville sélectionnée
  const selectedCity = value ? getCityByCode(value) : null;

  // Filtrer les villes en fonction de la recherche
  const filteredCities = React.useMemo(() => {
    // Si le champ est vide et que le popover est ouvert, afficher les villes populaires
    if (!searchQuery || searchQuery.trim() === "") {
      return open ? popularCities : [];
    }

    return searchCities(searchQuery);
  }, [searchQuery, open]);

  // Gérer la sélection d'une ville
  const handleSelect = (codeInsee: string) => {
    onChange(codeInsee);
    setOpen(false);
  };

  // Gérer l'ouverture/fermeture du popover
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Réinitialiser la recherche à la fermeture
      setSearchQuery("");
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedCity ? (
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-4 w-4 shrink-0 opacity-50" />
              <span className="truncate">{formatCity(selectedCity)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 opacity-50" />
              <span>{placeholder}</span>
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" sideOffset={5}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Rechercher une ville..."
            value={searchQuery}
            onValueChange={(value) => {
              setSearchQuery(value);
            }}
          />
          <CommandList>
            <CommandEmpty>Aucune ville trouvée</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px]">
                {filteredCities.map((city) => (
                  <CommandItem
                    key={city.code_insee}
                    value={city.code_insee}
                    onSelect={() => handleSelect(city.code_insee)}
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 shrink-0" />
                      <span>{formatCity(city)}</span>
                    </div>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
