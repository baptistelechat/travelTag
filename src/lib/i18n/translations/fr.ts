import type { TranslationKeys } from '../types';

export const fr: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "Générez des QR codes pour vos bagages, sacs à dos, ou affaires d'enfants. Simple, rapide et sécurisé.",
    footer:
      "© TravelTag - Fonctionne 100% en local, aucune donnée personnelle n'est envoyée sur Internet.",
  },

  form: {
    personal: {
      title: "Informations personnelles",
      firstName: "Prénom",
      lastName: "Nom",
      nationality: "Nationalité",
      postalAddress: "Adresse postale",
      street: "Rue",
      addressDetails: "Compléments d'adresse",
      postalCode: "Code postal",
      city: "Ville",
      country: "Pays",
      phone: "Téléphone",
      email: "Email",
      placeholders: {
        firstName: "Prénom",
        lastName: "Nom",
        street: "123 rue de la Paix",
        addressDetails: "Bâtiment A, Étage 3, Appartement 42",
        postalCode: "75000",
        city: "Paris",
        email: "exemple@email.com",
        phone: "06 12 34 56 78",
        country: "Rechercher un pays...",
      },
    },

    location: {
      title: "Lieux de départ et d'arrivée",
      transportMode: "Mode de transport",
      departureLocation: "Lieu de départ",
      arrivalLocation: "Lieu d'arrivée",
      isRoundTrip: "Aller-retour ?",
      modes: {
        airport: "Aéroport",
        train: "Train",
        road: "Route",
        carBus: "Voiture / Bus",
      },
      placeholders: {
        departureAirport: "Rechercher un aéroport de départ...",
        arrivalAirport: "Rechercher un aéroport d'arrivée...",
        departureStation: "Rechercher une gare de départ...",
        arrivalStation: "Rechercher une gare d'arrivée...",
        departureCity: "Rechercher une ville de départ...",
        arrivalCity: "Rechercher une ville d'arrivée...",
      },
    },

    health: {
      title: "Informations de santé et complémentaires",
      allergies: "Allergies",
      bloodGroup: "Groupe sanguin",
      healthInfo: "Informations complémentaires",
      placeholders: {
        allergies: "Sélectionner des allergies...",
        bloodGroup: "Sélectionner un groupe sanguin...",
        healthInfo: "Médicaments, conditions médicales, etc.",
      },
    },

    trustContacts: {
      title: "Contacts de confiance",
      contacts: "Contacts de confiance",
    },
  },

  actions: {
    print: "Imprimer",
    download: "Télécharger",
    downloadPng: "Télécharger PNG",
    gridConfig: "Configuration de la grille d'impression:",
    columns: "Colonnes:",
    rows: "Lignes:",
  },

  messages: {
    errors: {
      pngGeneration: "Erreur lors de la génération du PNG. Veuillez réessayer.",
      elementNotFound:
        "Impossible de trouver l'élément à télécharger. Veuillez réessayer.",
      emptyForm: "Formulaire vide, impression annulée",
    },
    success: {
      downloaded: "Téléchargement réussi",
    },
  },

  qrCode: {
    title: "Informations de voyage",
    preview: "Aperçu du QR Code",
    noData: "Remplissez le formulaire pour voir le QR code",
  },
  allergies: {
    categories: {
      food: "Alimentaire",
      medication: "Médicament",
      environment: "Environnement",
      other: "Autre",
    },
    items: {
      // Allergies alimentaires
      peanuts: "Arachides",
      nuts: "Fruits à coque",
      gluten: "Gluten",
      lactose: "Lactose",
      eggs: "Œufs",
      fish: "Poisson",
      shellfish: "Crustacés",
      soy: "Soja",
      sesame: "Sésame",
      celery: "Céleri",
      mustard: "Moutarde",
      sulphites: "Sulfites",
      lupin: "Lupin",
      molluscs: "Mollusques",
      // Allergies médicamenteuses
      penicillin: "Pénicilline",
      aspirin: "Aspirine",
      ibuprofen: "Ibuprofène",
      sulfa: "Sulfamides",
      // Allergies environnementales
      pollen: "Pollen",
      dust: "Acariens",
      mold: "Moisissures",
      animal_dander: "Poils d'animaux",
      insect_stings: "Piqûres d'insectes",
      latex: "Latex",
    },
    selector: {
      noAllergyFound: "Aucune allergie trouvée.",
      addCustom: "Ajouter",
      alreadySelected: "est déjà sélectionné",
      selectedCount: "allergies sélectionnées",
      others: "Autres",
    },
  },
};