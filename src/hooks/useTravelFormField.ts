import { useTravelTagStore } from "@/lib/store";
import type { TravelInfo } from "@/lib/types/travel-info.schema";
import { useFormContext } from "react-hook-form";

/**
 * Hook personnalisé pour gérer les champs du formulaire de voyage
 * Permet de mettre à jour à la fois le formulaire et le store Zustand
 */
export function useTravelFormField() {
  const { updateTravelInfo } = useTravelTagStore();
  const form = useFormContext<TravelInfo>();

  /**
   * Met à jour un champ du formulaire et le store Zustand
   * @param field Nom du champ à mettre à jour
   * @param value Nouvelle valeur du champ
   */
  const handleFieldChange = (field: keyof TravelInfo, value: TravelInfo[keyof TravelInfo]) => {
    // Mettre à jour le store même lorsque la valeur est vide
    updateTravelInfo({ [field]: value });
  };

  return {
    form,
    handleFieldChange,
  };
}