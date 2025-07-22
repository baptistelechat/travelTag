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

// Liste des allergies courantes
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

// Allergies populaires à afficher par défaut (incluant des exemples de chaque catégorie)
export const popularAllergies = allergies
  .filter((allergy) =>
    [
      // Allergies alimentaires populaires
      "peanuts",
      "nuts",
      "gluten",
      "lactose",

      // Allergies médicamenteuses populaires
      "penicillin",
      "aspirin",

      // Allergies environnementales populaires
      "pollen",
      "dust",
      "latex",
    ].includes(allergy.id)
  )
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
export function createCustomAllergy(name: string): Allergy {
  // Générer un ID unique basé sur le nom et un timestamp
  const id = `custom_${name.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`;

  // Créer la nouvelle allergie avec la catégorie "Autre"
  // Assurer que la première lettre n'est pas forcée en majuscule
  const newAllergy: Allergy = {
    id,
    name: name.trim().slice(0, 1).toUpperCase() + name.trim().slice(1), // Utiliser le nom tel quel, sans modifier la casse

    category: "Autre",
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
