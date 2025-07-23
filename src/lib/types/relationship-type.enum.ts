// Enum pour les liens de parenté
export const RelationshipTypeEnum = {
  PARENT: "parent",
  ENFANT: "enfant",
  CONJOINT: "conjoint",
  FRERE_SOEUR: "frere_soeur",
  AMI: "ami",
  AUTRE: "autre",
} as const;

export type RelationshipType = (typeof RelationshipTypeEnum)[keyof typeof RelationshipTypeEnum];