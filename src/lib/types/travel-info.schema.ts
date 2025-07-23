import { z } from "zod";
import { TransportModeEnum } from "./transport-mode.enum";
import { trustContactSchema } from "./trust-contact.schema";

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
  isRoundTrip: z.boolean().default(false),
  transportMode: z
    .enum([
      TransportModeEnum.AIRPORT,
      TransportModeEnum.TRAIN,
      TransportModeEnum.CAR,
    ])
    .default(TransportModeEnum.AIRPORT),
  allergies: z.array(z.string()).default([]),
  bloodGroup: z.string().optional(),
  healthInfo: z.string().optional(),
  trustContacts: z.array(trustContactSchema).default([]),
});

// Type dérivé du schéma Zod
export type TravelInfo = z.infer<typeof travelInfoSchema>;