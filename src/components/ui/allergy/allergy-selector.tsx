import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
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
  allergyExistsByName,
  createCustomAllergy,
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

// Composant pour afficher un badge d'allergie avec bouton de suppression
interface AllergyBadgeProps {
  allergy: Allergy;
  onRemove: (id: string, e?: React.MouseEvent) => void;
}

function AllergyBadge({ allergy, onRemove }: AllergyBadgeProps) {
  return (
    <Badge key={allergy.id} variant="secondary" className="mr-1 mb-1">
      {allergy.name}
      <button
        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => onRemove(allergy.id, e)}
      >
        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>
    </Badge>
  );
}

// Composant pour afficher un élément d'allergie dans la liste
interface AllergyItemProps {
  allergy: Allergy;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function AllergyItem({ allergy, isSelected, onSelect }: AllergyItemProps) {
  return (
    <CommandItem
      key={allergy.id}
      value={allergy.id}
      onSelect={() => onSelect(allergy.id)}
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
          {isSelected && <Check className="h-3 w-3 text-current" />}
        </div>
        <span>{allergy.name}</span>
      </div>
    </CommandItem>
  );
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

  // Vérifier si la valeur recherchée existe déjà comme allergie
  const existingAllergy = React.useMemo(() => {
    if (!searchValue || searchValue.trim() === "") return undefined;
    return allergyExistsByName(searchValue.trim());
  }, [searchValue]);

  // Récupérer les allergies sélectionnées pour l'affichage
  const selectedAllergies = React.useMemo(() => {
    return value
      .map((id) => getAllergyById(id))
      .filter((allergy): allergy is Allergy => allergy !== undefined);
  }, [value]);

  // Gérer la sélection/déselection d'une allergie
  const handleSelect = (allergyId: string) => {
    const isSelected = value.includes(allergyId);
    onChange(isSelected 
      ? value.filter((id) => id !== allergyId) 
      : [...value, allergyId]);
  };

  // Gérer l'ajout d'une nouvelle allergie personnalisée
  const handleAddCustomAllergy = () => {
    if (!searchValue || searchValue.trim() === "") return;

    // Si l'allergie existe déjà, la réutiliser
    if (existingAllergy) {
      // Vérifier si elle n'est pas déjà sélectionnée
      if (!value.includes(existingAllergy.id)) {
        onChange([...value, existingAllergy.id]);
      }
    } else {
      // Créer une nouvelle allergie
      const newAllergy = createCustomAllergy(searchValue.trim());
      onChange([...value, newAllergy.id]);
    }

    // Réinitialiser la recherche
    setSearchValue("");
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
    if (!open) setSearchValue("");
  };

  // Fonction pour afficher un groupe d'allergies par catégorie
  const renderAllergyGroup = (category: string | null) => {
    const allergiesInCategory = filteredAllergies.filter(
      (allergy) => 
        category === null 
          ? !allergy.category 
          : allergy.category === category
    );
    
    if (allergiesInCategory.length === 0) return null;
    
    return (
      <CommandGroup heading={category || "Autres"}>
        {allergiesInCategory.map((allergy) => (
          <AllergyItem 
            key={allergy.id}
            allergy={allergy} 
            isSelected={value.includes(allergy.id)} 
            onSelect={handleSelect} 
          />
        ))}
      </CommandGroup>
    );
  };
  
  // Fonction pour formater le texte du bouton d'ajout d'allergie personnalisée
  const getCustomAllergyButtonText = () => {
    if (!searchValue || searchValue.trim() === "") return "";
    
    const formattedName = `${searchValue.trim().slice(0, 1).toUpperCase()}${searchValue.slice(1)}`;
    
    if (existingAllergy && value.includes(existingAllergy.id)) {
      return `"${formattedName}" est déjà sélectionné`;
    }
    
    return `Ajouter "${formattedName}"`;
  };

  return (
    <div className="w-full">
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="flex w-full justify-between px-3 text-left font-normal"
            disabled={disabled}
          >
            {selectedAllergies.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
                {selectedAllergies.length <= 2 ? (
                  // Afficher les badges si peu d'allergies sélectionnées
                  selectedAllergies.map((allergy) => (
                    <AllergyBadge 
                      key={allergy.id} 
                      allergy={allergy} 
                      onRemove={handleRemove} 
                    />
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
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  searchValue &&
                  searchValue.trim() !== ""
                ) {
                  e.preventDefault();
                  if (
                    !(existingAllergy && value.includes(existingAllergy.id))
                  ) {
                    handleAddCustomAllergy();
                  }
                }
              }}
              placeholder="Rechercher une allergie..."
              className="h-9"
              autoFocus
            />
            <CommandList>
              <ScrollArea ref={scrollAreaRef} className="h-[200px]">
                <CommandEmpty>
                  {searchValue && searchValue.trim() !== "" ? (
                    <div className="py-3 px-2 text-center text-sm">
                      Aucune allergie trouvée.
                      <Button
                        onClick={handleAddCustomAllergy}
                        disabled={
                          existingAllergy && value.includes(existingAllergy.id)
                        }
                        variant="outline"
                        className="w-full mt-3"
                      >
                        <Plus className="h-4 w-4" />
                        {getCustomAllergyButtonText()}
                      </Button>
                    </div>
                  ) : (
                    "Aucune allergie trouvée."
                  )}
                </CommandEmpty>

                {/* Regrouper les allergies par catégorie */}
                {filteredAllergies.length > 0 && (
                  <>
                    {renderAllergyGroup("Alimentaire")}
                    {renderAllergyGroup("Médicament")}
                    {renderAllergyGroup("Environnement")}
                    {renderAllergyGroup(null)}
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
            <AllergyBadge 
              key={allergy.id} 
              allergy={allergy} 
              onRemove={handleRemove} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
