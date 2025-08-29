import type { TranslationKeys } from '../types';

export const de: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "Generieren Sie QR-Codes für Ihr Gepäck, Rucksäcke oder Kindersachen. Einfach, schnell und sicher.",
    footer:
      "© TravelTag - Funktioniert 100% lokal, keine persönlichen Daten werden über das Internet gesendet.",
  },

  form: {
    personal: {
      title: "Persönliche Informationen",
      firstName: "Vorname",
      lastName: "Nachname",
      nationality: "Staatsangehörigkeit",
      postalAddress: "Postanschrift",
      street: "Straße",
      addressDetails: "Adresszusatz",
      postalCode: "Postleitzahl",
      city: "Stadt",
      country: "Land",
      phone: "Telefon",
      email: "E-Mail",
      placeholders: {
        firstName: "Vorname",
        lastName: "Nachname",
        street: "123 Friedensstraße",
        addressDetails: "Gebäude A, 3. Stock, Wohnung 42",
        postalCode: "10115",
        city: "Berlin",
        email: "beispiel@email.com",
        phone: "030 12 34 56 78",
        country: "Nach einem Land suchen...",
      },
    },

    location: {
      title: "Abfahrts- und Ankunftsorte",
      transportMode: "Transportmittel",
      departureLocation: "Abfahrtsort",
      arrivalLocation: "Ankunftsort",
      isRoundTrip: "Hin- und Rückfahrt?",
      modes: {
        airport: "Flughafen",
        train: "Zug",
        road: "Straße",
        carBus: "Auto / Bus",
      },
      placeholders: {
        departureAirport: "Nach Abflughafen suchen...",
        arrivalAirport: "Nach Ankunftsflughafen suchen...",
        departureStation: "Nach Abfahrtsbahnhof suchen...",
        arrivalStation: "Nach Ankunftsbahnhof suchen...",
        departureCity: "Nach Abfahrtsstadt suchen...",
        arrivalCity: "Nach Ankunftsstadt suchen...",
      },
    },

    health: {
      title: "Gesundheit und zusätzliche Informationen",
      allergies: "Allergien",
      bloodGroup: "Blutgruppe",
      healthInfo: "Zusätzliche Informationen",
      placeholders: {
        allergies: "Allergien auswählen...",
        bloodGroup: "Blutgruppe auswählen...",
        healthInfo: "Medikamente, Krankheiten, etc.",
      },
    },

    trustContacts: {
      title: "Notfallkontakte",
      contacts: "Notfallkontakte",
      noContactsAdded: "Keine Notfallkontakte hinzugefügt",
      addContact: "Notfallkontakt hinzufügen",
      firstName: "Vorname",
      lastName: "Nachname",
      phone: "Telefon",
      relationship: "Beziehung",
      removeContact: "Diesen Kontakt entfernen",
      selectRelationship: "Eine Beziehung auswählen",
      placeholders: {
        firstName: "Vorname",
        lastName: "Nachname",
        phone: "030 12 34 56 78",
      },
      relationships: {
        parent: "Elternteil",
        child: "Kind",
        spouse: "Ehepartner",
        sibling: "Geschwister",
        friend: "Freund",
        other: "Andere",
      },
    },
  },

  actions: {
    print: "Drucken",
    download: "Herunterladen",
    downloadPng: "PNG herunterladen",
    gridConfig: "Druckraster-Konfiguration:",
    columns: "Spalten:",
    rows: "Zeilen:",
  },

  messages: {
    errors: {
      pngGeneration: "Fehler beim Generieren der PNG. Bitte versuchen Sie es erneut.",
      elementNotFound: "Element zum Herunterladen nicht gefunden. Bitte versuchen Sie es erneut.",
      emptyForm: "Leeres Formular, Drucken abgebrochen",
    },
    success: {
      downloaded: "Download erfolgreich",
    },
  },

  qrCode: {
    title: "Reiseinformationen",
    preview: "QR-Code Vorschau",
    noData: "Füllen Sie das Formular aus, um den QR-Code zu sehen",
  },
  allergies: {
    categories: {
      food: "Lebensmittel",
      medication: "Medikamente",
      environment: "Umwelt",
      other: "Andere",
    },
    items: {
      peanuts: "Erdnüsse",
      nuts: "Baumnüsse",
      gluten: "Gluten",
      lactose: "Laktose",
      eggs: "Eier",
      fish: "Fisch",
      shellfish: "Meeresfrüchte",
      soy: "Soja",
      sesame: "Sesam",
      celery: "Sellerie",
      mustard: "Senf",
      sulphites: "Sulfite",
      lupin: "Lupine",
      molluscs: "Weichtiere",
      penicillin: "Penicillin",
      aspirin: "Aspirin",
      ibuprofen: "Ibuprofen",
      sulfa: "Sulfonamide",
      pollen: "Pollen",
      dust: "Hausstaubmilben",
      mold: "Schimmel",
      animal_dander: "Tierhaare",
      insect_stings: "Insektenstiche",
      latex: "Latex",
    },
    selector: {
      noAllergyFound: "Keine Allergie gefunden.",
      addCustom: "Hinzufügen",
      alreadySelected: "ist bereits ausgewählt",
      selectedCount: "Allergien ausgewählt",
      others: "Andere",
    },
  },

  common: {
    noCountryFound: "Kein Land gefunden.",
    responsibility: "Verantwortung:",
    responsibilityText: "Sie teilen persönliche Daten, die von vielen Menschen gelesen werden können. Sie sind allein verantwortlich für die Daten, die Sie teilen.",
  },
};