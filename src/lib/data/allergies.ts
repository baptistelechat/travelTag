import { useTranslation } from "@/lib/i18n";
import { z } from "zod";

// Schéma pour les allergies
export const AllergySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().optional(),
  isCustom: z.boolean().optional(),
});

export type Allergy = z.infer<typeof AllergySchema>;

// Stockage local pour les allergies personnalisées
const customAllergies: Allergy[] = [];

// IDs des allergies courantes
const allergyIds = [
  // Allergies alimentaires
  "peanuts",
  "nuts",
  "gluten",
  "lactose",
  "eggs",
  "fish",
  "shellfish",
  "soy",
  "sesame",
  "celery",
  "mustard",
  "sulphites",
  "lupin",
  "molluscs",
  // Allergies médicamenteuses
  "penicillin",
  "aspirin",
  "ibuprofen",
  "sulfa",
  // Allergies environnementales
  "pollen",
  "dust",
  "mold",
  "animal_dander",
  "insect_stings",
  "latex",
] as const;

// Mapping des catégories
const categoryMapping: Record<string, "food" | "medication" | "environment"> = {
  peanuts: "food",
  nuts: "food",
  gluten: "food",
  lactose: "food",
  eggs: "food",
  fish: "food",
  shellfish: "food",
  soy: "food",
  sesame: "food",
  celery: "food",
  mustard: "food",
  sulphites: "food",
  lupin: "food",
  molluscs: "food",
  penicillin: "medication",
  aspirin: "medication",
  ibuprofen: "medication",
  sulfa: "medication",
  pollen: "environment",
  dust: "environment",
  mold: "environment",
  animal_dander: "environment",
  insect_stings: "environment",
  latex: "environment",
};

/**
 * Génère la liste des allergies avec traductions
 */
export const useAllergies = () => {
  const { t } = useTranslation();

  return allergyIds.map((id) => ({
    id,
    name: t(`allergies.items.${id}` as any),
    category: t(`allergies.categories.${categoryMapping[id]}` as any),
  }));
};

/**
 * Génère la liste des allergies populaires avec traductions
 */
export const usePopularAllergies = () => {
  const { t } = useTranslation();

  return popularAllergyIds
    .map((id) => ({
      id,
      name: t(`allergies.items.${id}` as any),
      category: t(`allergies.categories.${categoryMapping[id]}` as any),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Liste statique pour la compatibilité (sera dépréciée)
export const allergies: Allergy[] = [
  // Allergies alimentaires
  { id: "peanuts", name: "Arachides", category: "Alimentaire" },
  { id: "nuts", name: "Fruits à coque", category: "Alimentaire" },
  { id: "gluten", name: "Gluten", category: "Alimentaire" },
  { id: "lactose", name: "Lactose", category: "Alimentaire" },
  { id: "eggs", name: "Œufs", category: "Alimentaire" },
  { id: "fish", name: "Poisson", category: "Alimentaire" },
  { id: "shellfish", name: "Crustacés", category: "Alimentaire" },
  { id: "soy", name: "Soja", category: "Alimentaire" },
  { id: "sesame", name: "Sésame", category: "Alimentaire" },
  { id: "celery", name: "Céleri", category: "Alimentaire" },
  { id: "mustard", name: "Moutarde", category: "Alimentaire" },
  { id: "sulphites", name: "Sulfites", category: "Alimentaire" },
  { id: "lupin", name: "Lupin", category: "Alimentaire" },
  { id: "molluscs", name: "Mollusques", category: "Alimentaire" },

  // Allergies médicamenteuses
  { id: "penicillin", name: "Pénicilline", category: "Médicament" },
  { id: "aspirin", name: "Aspirine", category: "Médicament" },
  { id: "ibuprofen", name: "Ibuprofène", category: "Médicament" },
  { id: "sulfa", name: "Sulfamides", category: "Médicament" },

  // Allergies environnementales
  { id: "pollen", name: "Pollen", category: "Environnement" },
  { id: "dust", name: "Acariens", category: "Environnement" },
  { id: "mold", name: "Moisissures", category: "Environnement" },
  { id: "animal_dander", name: "Poils d'animaux", category: "Environnement" },
  {
    id: "insect_stings",
    name: "Piqûres d'insectes",
    category: "Environnement",
  },
  { id: "latex", name: "Latex", category: "Environnement" },
];

// IDs des allergies populaires
const popularAllergyIds = [
  "peanuts",
  "nuts",
  "gluten",
  "lactose", // Alimentaires
  "penicillin",
  "aspirin", // Médicamenteuses
  "pollen",
  "dust",
  "latex", // Environnementales
];

// Liste statique pour la compatibilité (sera dépréciée)
export const popularAllergies = allergies
  .filter((allergy) => popularAllergyIds.includes(allergy.id))
  .sort((a, b) => a.name.localeCompare(b.name));

/**
 * Recherche des allergies par nom et trie les résultats par ordre alphabétique
 */
export function searchAllergies(query: string): Allergy[] {
  if (!query || query.trim() === "") return [];

  const normalizedQuery = query.toLowerCase().trim();

  // Combiner les allergies prédéfinies et personnalisées
  const allAllergies = [...allergies, ...customAllergies];

  return allAllergies
    .filter(
      (allergy) =>
        allergy.name.toLowerCase().includes(normalizedQuery) ||
        (allergy.category &&
          allergy.category.toLowerCase().includes(normalizedQuery))
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Récupère une allergie par son ID
 */
export function getAllergyById(id: string): Allergy | undefined {
  // Chercher d'abord dans les allergies prédéfinies
  const predefinedAllergy = allergies.find((allergy) => allergy.id === id);
  if (predefinedAllergy) return predefinedAllergy;

  // Puis dans les allergies personnalisées
  return customAllergies.find((allergy) => allergy.id === id);
}

/**
 * Crée une nouvelle allergie personnalisée
 */
export function createCustomAllergy(
  name: string,
  t?: (key: string) => string
): Allergy {
  // Générer un ID unique basé sur le nom et un timestamp
  const id = `custom_${name.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`;

  // Créer la nouvelle allergie avec la catégorie "Autre"
  const newAllergy: Allergy = {
    id,
    name: name.trim().slice(0, 1).toUpperCase() + name.trim().slice(1),
    category: t ? t("allergies.categories.other") : "Autre",
    isCustom: true,
  };

  // Ajouter à la liste des allergies personnalisées
  customAllergies.push(newAllergy);

  return newAllergy;
}

/**
 * Vérifie si une allergie avec le nom exact existe déjà
 * @returns L'allergie existante ou undefined si elle n'existe pas
 */
export function allergyExistsByName(name: string): Allergy | undefined {
  const normalizedName = name.toLowerCase().trim();

  // Vérifier d'abord dans les allergies prédéfinies
  const existingPredefined = allergies.find(
    (allergy) => allergy.name.toLowerCase().trim() === normalizedName
  );
  if (existingPredefined) return existingPredefined;

  // Puis dans les allergies personnalisées
  return customAllergies.find(
    (allergy) => allergy.name.toLowerCase().trim() === normalizedName
  );
}

/**
 * Formate l'affichage d'une allergie
 */
export function formatAllergy(allergy: Allergy): string {
  return allergy.category
    ? `${allergy.name} (${allergy.category})`
    : allergy.name;
}
