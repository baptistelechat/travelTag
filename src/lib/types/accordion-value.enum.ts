// Enum pour les valeurs d'accordéon
export const AccordionValueEnum = {
  PERSONAL_INFO: "personal-info",
  LOCATION_INFO: "location-info",
  HEALTH_ADDITIONAL_INFO: "health-additional-info",
  TRUST_CONTACTS: "trust-contacts",
} as const;

export type AccordionValue = (typeof AccordionValueEnum)[keyof typeof AccordionValueEnum];