import { RelationshipTypeEnum } from "@/lib/types/relationship-type.enum";

/**
 * Mapping des valeurs de l'enum RelationshipTypeEnum vers des libellés affichables
 */
export const relationshipLabels: Record<string, string> = {
  [RelationshipTypeEnum.PARENT]: "Parent",
  [RelationshipTypeEnum.ENFANT]: "Enfant",
  [RelationshipTypeEnum.CONJOINT]: "Conjoint(e)",
  [RelationshipTypeEnum.FRERE_SOEUR]: "Frère/Sœur",
  [RelationshipTypeEnum.AMI]: "Ami(e)",
  [RelationshipTypeEnum.AUTRE]: "Autre",
};

/**
 * Obtient le libellé d'une relation à partir de sa valeur
 * @param relationshipValue Valeur de la relation (issue de RelationshipTypeEnum)
 * @returns Libellé de la relation
 */
export function getRelationshipLabel(relationshipValue: string): string {
  return relationshipLabels[relationshipValue] || relationshipLabels[RelationshipTypeEnum.AUTRE];
}