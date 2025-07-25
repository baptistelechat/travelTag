export type Language = 'fr' | 'en';

export interface TranslationKeys {
  // App
  app: {
    title: string;
    description: string;
    footer: string;
  };

  // Form sections
  form: {
    personal: {
      title: string;
      firstName: string;
      lastName: string;
      nationality: string;
      postalAddress: string;
      street: string;
      addressDetails: string;
      postalCode: string;
      city: string;
      country: string;
      phone: string;
      email: string;
      placeholders: {
        firstName: string;
        lastName: string;
        street: string;
        addressDetails: string;
        postalCode: string;
        city: string;
        email: string;
        phone: string;
      };
    };

    location: {
      title: string;
      transportMode: string;
      departureLocation: string;
      arrivalLocation: string;
      isRoundTrip: string;
      modes: {
        airport: string;
        train: string;
        road: string;
        carBus: string;
      };
      placeholders: {
        departureAirport: string;
        arrivalAirport: string;
        departureStation: string;
        arrivalStation: string;
        departureCity: string;
        arrivalCity: string;
      };
    };

    health: {
      title: string;
      allergies: string;
      bloodGroup: string;
      healthInfo: string;
      placeholders: {
        allergies: string;
        bloodGroup: string;
        healthInfo: string;
      };
    };

    trustContacts: {
      title: string;
      contacts: string;
    };
  };

  // Buttons and actions
  actions: {
    print: string;
    download: string;
    downloadPng: string;
    gridConfig: string;
    columns: string;
    rows: string;
  };

  // Messages
  messages: {
    errors: {
      pngGeneration: string;
      elementNotFound: string;
      emptyForm: string;
    };
    success: {
      downloaded: string;
    };
  };

  // QR Code
  qrCode: {
    title: string;
    preview: string;
    noData: string;
  };
}

export type TranslationFunction = (key: string) => string;