// Définition des groupes sanguins disponibles
export const bloodGroups = [
  { id: "-", name: "-" },
  { id: "A+", name: "A+" },
  { id: "A-", name: "A-" },
  { id: "B+", name: "B+" },
  { id: "B-", name: "B-" },
  { id: "AB+", name: "AB+" },
  { id: "AB-", name: "AB-" },
  { id: "O+", name: "O+" },
  { id: "O-", name: "O-" },
];

// Fonction pour obtenir un groupe sanguin par son ID
export const getBloodGroupById = (id: string) => {
  return bloodGroups.find((group) => group.id === id);
};