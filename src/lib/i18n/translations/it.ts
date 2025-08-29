import type { TranslationKeys } from '../types';

export const it: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "Genera codici QR per le tue valigie, zaini o oggetti dei bambini. Semplice, veloce e sicuro.",
    footer:
      "© TravelTag - Funziona 100% in locale, nessun dato personale viene inviato su Internet.",
  },

  form: {
    personal: {
      title: "Informazioni personali",
      firstName: "Nome",
      lastName: "Cognome",
      nationality: "Nazionalità",
      postalAddress: "Indirizzo postale",
      street: "Via",
      addressDetails: "Dettagli indirizzo",
      postalCode: "Codice postale",
      city: "Città",
      country: "Paese",
      phone: "Telefono",
      email: "Email",
      placeholders: {
        firstName: "Mario",
        lastName: "Rossi",
        street: "Via della Pace 123",
        addressDetails: "Edificio A, Piano 3, Appartamento 42",
        postalCode: "00100",
        city: "Roma",
        email: "esempio@email.com",
        phone: "339 123 4567",
        country: "Cerca un paese...",
      },
    },

    location: {
      title: "Luoghi di partenza e arrivo",
      transportMode: "Mezzo di trasporto",
      departureLocation: "Luogo di partenza",
      arrivalLocation: "Luogo di arrivo",
      isRoundTrip: "Andata e ritorno?",
      modes: {
        airport: "Aeroporto",
        train: "Treno",
        road: "Strada",
        carBus: "Auto/Autobus",
      },
      placeholders: {
        departureAirport: "Cerca aeroporto di partenza...",
        arrivalAirport: "Cerca aeroporto di arrivo...",
        departureStation: "Cerca stazione di partenza...",
        arrivalStation: "Cerca stazione di arrivo...",
        departureCity: "Cerca città di partenza...",
        arrivalCity: "Cerca città di arrivo...",
      },
    },

    health: {
      title: "Informazioni sanitarie e aggiuntive",
      allergies: "Allergie",
      bloodGroup: "Gruppo sanguigno",
      healthInfo: "Informazioni aggiuntive",
      placeholders: {
        allergies: "Seleziona allergie...",
        bloodGroup: "Seleziona gruppo sanguigno...",
        healthInfo: "Farmaci, condizioni mediche, ecc.",
      },
    },

    trustContacts: {
      title: "Contatti di emergenza",
      contacts: "Contatti di emergenza",
      noContactsAdded: "Nessun contatto di emergenza aggiunto",
      addContact: "Aggiungi contatto di emergenza",
      firstName: "Nome",
      lastName: "Cognome",
      phone: "Telefono",
      relationship: "Relazione",
      removeContact: "Rimuovi questo contatto",
      selectRelationship: "Seleziona relazione",
      placeholders: {
        firstName: "Mario",
        lastName: "Rossi",
        phone: "339 123 4567",
      },
      relationships: {
        parent: "Genitore",
        child: "Figlio/a",
        spouse: "Coniuge",
        sibling: "Fratello/Sorella",
        friend: "Amico/a",
        other: "Altro",
      },
    },
  },

  actions: {
    print: "Stampa",
    download: "Scarica",
    downloadPng: "Scarica PNG",
    gridConfig: "Configurazione griglia di stampa:",
    columns: "Colonne:",
    rows: "Righe:",
  },

  messages: {
    errors: {
      pngGeneration: "Errore durante la generazione del PNG. Riprova.",
      elementNotFound:
        "Impossibile trovare l'elemento da scaricare. Riprova.",
      emptyForm: "Modulo vuoto, stampa annullata",
    },
    success: {
      downloaded: "Download completato",
    },
  },

  qrCode: {
    title: "Informazioni di viaggio",
    preview: "Anteprima codice QR",
    noData: "Compila il modulo per vedere il codice QR",
  },
  allergies: {
    categories: {
      food: "Alimentare",
      medication: "Farmaco",
      environment: "Ambiente",
      other: "Altro",
    },
    items: {
      peanuts: "Arachidi",
      nuts: "Frutta a guscio",
      gluten: "Glutine",
      lactose: "Lattosio",
      eggs: "Uova",
      fish: "Pesce",
      shellfish: "Crostacei",
      soy: "Soia",
      sesame: "Sesamo",
      celery: "Sedano",
      mustard: "Senape",
      sulphites: "Solfiti",
      lupin: "Lupini",
      molluscs: "Molluschi",
      penicillin: "Penicillina",
      aspirin: "Aspirina",
      ibuprofen: "Ibuprofene",
      sulfa: "Sulfamidici",
      pollen: "Polline",
      dust: "Acari",
      mold: "Muffe",
      animal_dander: "Peli di animali",
      insect_stings: "Punture di insetti",
      latex: "Lattice",
    },
    selector: {
      noAllergyFound: "Nessuna allergia trovata.",
      addCustom: "Aggiungi",
      alreadySelected: "è già selezionato",
      selectedCount: "allergie selezionate",
      others: "Altri",
    },
  },

  common: {
    noCountryFound: "Nessun paese trovato.",
    responsibility: "Responsabilità:",
    responsibilityText: "Stai condividendo dati personali che possono essere letti da molte persone. Sei l'unico responsabile dei dati che condividi.",
  },
};