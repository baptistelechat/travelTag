import { Check, ChevronsUpDown, X } from "lucide-react";
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
  getAllergyById,
  popularAllergies,
  searchAllergies,
  type Allergy,
} from "@/lib/data/allergies";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";

export interface AllergySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Composant pour sélectionner plusieurs allergies avec recherche
 */
export function AllergySelector({
  value = [],
  onChange,
  placeholder = "Sélectionner des allergies...",
  disabled,
}: AllergySelectorProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  // Liste des allergies à afficher
  const filteredAllergies = React.useMemo(() => {
    // Si le champ est vide et que le popover est ouvert, afficher les allergies populaires
    if (!searchValue || searchValue.trim() === "") {
      return isOpen ? popularAllergies : [];
    }

    return searchAllergies(searchValue);
  }, [searchValue, isOpen]);

  // Récupérer les allergies sélectionnées pour l'affichage
  const selectedAllergies = React.useMemo(() => {
    return value
      .map((id) => getAllergyById(id))
      .filter((allergy): allergy is Allergy => allergy !== undefined);
  }, [value]);

  // Gérer la sélection/déselection d'une allergie
  const handleSelect = (allergyId: string) => {
    const isSelected = value.includes(allergyId);

    if (isSelected) {
      // Désélectionner
      onChange(value.filter((id) => id !== allergyId));
    } else {
      // Sélectionner
      onChange([...value, allergyId]);
    }
  };

  // Supprimer une allergie sélectionnée
  const handleRemove = (allergyId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    onChange(value.filter((id) => id !== allergyId));
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
    <div className="w-full">
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-between px-3 text-left font-normal",
              !selectedAllergies.length && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {selectedAllergies.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
                {selectedAllergies.length <= 2 ? (
                  // Afficher les badges si peu d'allergies sélectionnées
                  selectedAllergies.map((allergy) => (
                    <Badge
                      key={allergy.id}
                      variant="secondary"
                      className="mr-1 mb-1"
                    >
                      {allergy.name}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => handleRemove(allergy.id, e)}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  // Afficher le nombre d'allergies sélectionnées si nombreuses
                  <span>
                    {selectedAllergies.length} allergies sélectionnées
                  </span>
                )}
              </div>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
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
              placeholder="Rechercher une allergie..."
              className="h-9"
              autoFocus
            />
            <CommandList>
              <ScrollArea ref={scrollAreaRef} className="h-[200px]">
                <CommandEmpty>Aucune allergie trouvée.</CommandEmpty>

                {/* Regrouper les allergies par catégorie */}
                {filteredAllergies.length > 0 && (
                  <>
                    {/* Groupe Alimentaire */}
                    {filteredAllergies.some(
                      (allergy) => allergy.category === "Alimentaire"
                    ) && (
                      <CommandGroup heading="Alimentaire">
                        {filteredAllergies
                          .filter(
                            (allergy) => allergy.category === "Alimentaire"
                          )
                          .map((allergy) => {
                            const isSelected = value.includes(allergy.id);
                            return (
                              <CommandItem
                                key={allergy.id}
                                value={allergy.id}
                                onSelect={() => handleSelect(allergy.id)}
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <div
                                    className={cn(
                                      "flex h-4 w-4 items-center justify-center rounded-xs border border-primary",
                                      isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "opacity-50"
                                    )}
                                  >
                                    {isSelected && (
                                      <Check className="h-3 w-3 text-current" />
                                    )}
                                  </div>
                                  <span>{allergy.name}</span>
                                </div>
                              </CommandItem>
                            );
                          })}
                      </CommandGroup>
                    )}

                    {/* Groupe Médicament */}
                    {filteredAllergies.some(
                      (allergy) => allergy.category === "Médicament"
                    ) && (
                      <CommandGroup heading="Médicament">
                        {filteredAllergies
                          .filter(
                            (allergy) => allergy.category === "Médicament"
                          )
                          .map((allergy) => {
                            const isSelected = value.includes(allergy.id);
                            return (
                              <CommandItem
                                key={allergy.id}
                                value={allergy.id}
                                onSelect={() => handleSelect(allergy.id)}
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <div
                                    className={cn(
                                      "flex h-4 w-4 items-center justify-center rounded-xs border border-primary",
                                      isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "opacity-50"
                                    )}
                                  >
                                    {isSelected && (
                                      <Check className="h-3 w-3 text-current" />
                                    )}
                                  </div>
                                  <span>{allergy.name}</span>
                                </div>
                              </CommandItem>
                            );
                          })}
                      </CommandGroup>
                    )}

                    {/* Groupe Environnement */}
                    {filteredAllergies.some(
                      (allergy) => allergy.category === "Environnement"
                    ) && (
                      <CommandGroup heading="Environnement">
                        {filteredAllergies
                          .filter(
                            (allergy) => allergy.category === "Environnement"
                          )
                          .map((allergy) => {
                            const isSelected = value.includes(allergy.id);
                            return (
                              <CommandItem
                                key={allergy.id}
                                value={allergy.id}
                                onSelect={() => handleSelect(allergy.id)}
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <div
                                    className={cn(
                                      "flex h-4 w-4 items-center justify-center rounded-xs border border-primary",
                                      isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "opacity-50"
                                    )}
                                  >
                                    {isSelected && (
                                      <Check className="h-3 w-3 text-current" />
                                    )}
                                  </div>
                                  <span>{allergy.name}</span>
                                </div>
                              </CommandItem>
                            );
                          })}
                      </CommandGroup>
                    )}

                    {/* Groupe pour les allergies sans catégorie */}
                    {filteredAllergies.some((allergy) => !allergy.category) && (
                      <CommandGroup heading="Autres">
                        {filteredAllergies
                          .filter((allergy) => !allergy.category)
                          .map((allergy) => {
                            const isSelected = value.includes(allergy.id);
                            return (
                              <CommandItem
                                key={allergy.id}
                                value={allergy.id}
                                onSelect={() => handleSelect(allergy.id)}
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <div
                                    className={cn(
                                      "flex h-4 w-4 items-center justify-center rounded-xs border border-primary",
                                      isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "opacity-50"
                                    )}
                                  >
                                    {isSelected && (
                                      <Check className="h-3 w-3 text-current" />
                                    )}
                                  </div>
                                  <span>{allergy.name}</span>
                                </div>
                              </CommandItem>
                            );
                          })}
                      </CommandGroup>
                    )}
                  </>
                )}
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Afficher les allergies sélectionnées en dessous si nombreuses */}
      {selectedAllergies.length > 2 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {selectedAllergies.map((allergy) => (
            <Badge key={allergy.id} variant="secondary" className="mb-1">
              {allergy.name}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={(e) => handleRemove(allergy.id, e)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
