import { z } from "zod";
import { RelationshipTypeEnum } from "./relationship-type.enum";

// Schéma pour un contact de confiance
export const trustContactSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  phone: z
    .string()
    .min(10, {
      message: "Le numéro de téléphone doit contenir au moins 10 chiffres",
    })
    .regex(/^\+?[0-9\s]+$/, {
      message: "Format de téléphone invalide",
    }),
  relationship: z.enum(Object.values(RelationshipTypeEnum)).default(RelationshipTypeEnum.AUTRE),
});

export type TrustContact = z.infer<typeof trustContactSchema>;