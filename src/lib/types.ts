import { z } from "zod";

// Schéma de validation pour les informations de voyage
export const travelInfoSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  nationality: z.string().min(1, { message: "La nationalité est requise" }),
  phone: z
    .string()
    .min(10, {
      message: "Le numéro de téléphone doit contenir au moins 10 chiffres",
    })
    .regex(/^\+?[0-9\s]+$/, {
      message: "Format de téléphone invalide",
    }),
  departureLocation: z
    .string()
    .min(1, { message: "Le lieu de départ est requis" }),
  arrivalLocation: z
    .string()
    .min(1, { message: "Le lieu d'arrivée est requis" }),
  healthInfo: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Type dérivé du schéma Zod
export type TravelInfo = z.infer<typeof travelInfoSchema>;

// État initial pour le formulaire
export const initialTravelInfo: TravelInfo = {
  firstName: "",
  lastName: "",
  nationality: "FR",
  phone: "",
  departureLocation: "",
  arrivalLocation: "",
  healthInfo: "",
  additionalInfo: "",
};
