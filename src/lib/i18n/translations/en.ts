import type { TranslationKeys } from '../types';

export const en: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "Generate QR codes for your luggage, backpacks, or children's belongings. Simple, fast and secure.",
    footer:
      "© TravelTag - Works 100% locally, no personal data is sent over the Internet.",
  },

  form: {
    personal: {
      title: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      nationality: "Nationality",
      postalAddress: "Postal Address",
      street: "Street",
      addressDetails: "Address Details",
      postalCode: "Postal Code",
      city: "City",
      country: "Country",
      phone: "Phone",
      email: "Email",
      placeholders: {
        firstName: "First Name",
        lastName: "Last Name",
        street: "123 Peace Street",
        addressDetails: "Building A, Floor 3, Apartment 42",
        postalCode: "75000",
        city: "Paris",
        email: "example@email.com",
        phone: "06 12 34 56 78",
        country: "Search for a country...",
      },
    },

    location: {
      title: "Departure and Arrival Locations",
      transportMode: "Transport Mode",
      departureLocation: "Departure Location",
      arrivalLocation: "Arrival Location",
      isRoundTrip: "Round Trip?",
      modes: {
        airport: "Airport",
        train: "Train",
        road: "Road",
        carBus: "Car / Bus",
      },
      placeholders: {
        departureAirport: "Search for departure airport...",
        arrivalAirport: "Search for arrival airport...",
        departureStation: "Search for departure station...",
        arrivalStation: "Search for arrival station...",
        departureCity: "Search for departure city...",
        arrivalCity: "Search for arrival city...",
      },
    },

    health: {
      title: "Health and Additional Information",
      allergies: "Allergies",
      bloodGroup: "Blood Group",
      healthInfo: "Additional Information",
      placeholders: {
        allergies: "Select allergies...",
        bloodGroup: "Select blood group...",
        healthInfo: "Medications, medical conditions, etc.",
      },
    },

    trustContacts: {
      title: "Emergency Contacts",
      contacts: "Emergency Contacts",
    },
  },

  actions: {
    print: "Print",
    download: "Download",
    downloadPng: "Download PNG",
    gridConfig: "Print grid configuration:",
    columns: "Columns:",
    rows: "Rows:",
  },

  messages: {
    errors: {
      pngGeneration: "Error generating PNG. Please try again.",
      elementNotFound: "Unable to find element to download. Please try again.",
      emptyForm: "Empty form, printing cancelled",
    },
    success: {
      downloaded: "Download successful",
    },
  },

  qrCode: {
    title: "Travel Information",
    preview: "QR Code Preview",
    noData: "Fill out the form to see the QR code",
  },
  allergies: {
    categories: {
      food: "Food",
      medication: "Medication",
      environment: "Environment",
      other: "Other",
    },
    items: {
      // Food allergies
      peanuts: "Peanuts",
      nuts: "Tree nuts",
      gluten: "Gluten",
      lactose: "Lactose",
      eggs: "Eggs",
      fish: "Fish",
      shellfish: "Shellfish",
      soy: "Soy",
      sesame: "Sesame",
      celery: "Celery",
      mustard: "Mustard",
      sulphites: "Sulphites",
      lupin: "Lupin",
      molluscs: "Molluscs",
      // Medication allergies
      penicillin: "Penicillin",
      aspirin: "Aspirin",
      ibuprofen: "Ibuprofen",
      sulfa: "Sulfa drugs",
      // Environmental allergies
      pollen: "Pollen",
      dust: "Dust mites",
      mold: "Mold",
      animal_dander: "Animal dander",
      insect_stings: "Insect stings",
      latex: "Latex",
    },
    selector: {
      noAllergyFound: "No allergy found.",
      addCustom: "Add",
      alreadySelected: "is already selected",
      selectedCount: "allergies selected",
      others: "Others",
    },
  },
};