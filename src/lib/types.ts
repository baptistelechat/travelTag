import { z } from "zod";

// Schéma de validation pour les informations de voyage
export const travelInfoSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  nationality: z.string().min(1, { message: "La nationalité est requise" }),
  street: z.string().optional(),
  addressDetails: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  phone: z
    .string()
    .min(10, {
      message: "Le numéro de téléphone doit contenir au moins 10 chiffres",
    })
    .regex(/^\+?[0-9\s]+$/, {
      message: "Format de téléphone invalide",
    }),
  email: z.string().email({ message: "Format d'email invalide" }),
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
  street: "",
  city: "",
  postalCode: "",
  country: "FR",
  addressDetails: "",
  phone: "",
  email: "",
  departureLocation: "",
  arrivalLocation: "",
  healthInfo: "",
  additionalInfo: "",
};
