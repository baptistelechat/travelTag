import { z } from "zod";

// Enum pour les modes de transport
export const TransportModeEnum = {
  AIRPORT: "airport",
  TRAIN: "train",
  CAR: "car",
} as const;


// Enum pour les liens de parenté
export const RelationshipTypeEnum = {
  PARENT: "parent",
  ENFANT: "enfant",
  CONJOINT: "conjoint",
  FRERE_SOEUR: "frere_soeur",
  AMI: "ami",
  AUTRE: "autre",
} as const;

export type RelationshipType =
  (typeof RelationshipTypeEnum)[keyof typeof RelationshipTypeEnum];

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
  isRoundTrip: false,
  transportMode: TransportModeEnum.AIRPORT,
  allergies: [],
  bloodGroup: "",
  healthInfo: "",
  trustContacts: [],
};

// Enum pour les valeurs d'accordéon
export const AccordionValueEnum = {
  PERSONAL_INFO: "personal-info",
  LOCATION_INFO: "location-info",
  HEALTH_ADDITIONAL_INFO: "health-additional-info",
  TRUST_CONTACTS: "trust-contacts",
} as const;

export type AccordionValue = (typeof AccordionValueEnum)[keyof typeof AccordionValueEnum];
