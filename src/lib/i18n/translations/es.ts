import type { TranslationKeys } from '../types';

export const es: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "Genera códigos QR para tus maletas, mochilas o pertenencias de niños. Simple, rápido y seguro.",
    footer:
      "© TravelTag - Funciona 100% en local, ningún dato personal se envía a Internet.",
  },

  form: {
    personal: {
      title: "Información personal",
      firstName: "Nombre",
      lastName: "Apellido",
      nationality: "Nacionalidad",
      postalAddress: "Dirección postal",
      street: "Calle",
      addressDetails: "Detalles de dirección",
      postalCode: "Código postal",
      city: "Ciudad",
      country: "País",
      phone: "Teléfono",
      email: "Email",
      placeholders: {
        firstName: "Juan",
        lastName: "García",
        street: "Calle de la Paz 123",
        addressDetails: "Edificio A, Piso 3, Apartamento 42",
        postalCode: "28001",
        city: "Madrid",
        email: "ejemplo@email.com",
        phone: "612 34 56 78",
        country: "Buscar un país...",
      },
    },

    location: {
      title: "Lugares de salida y llegada",
      transportMode: "Medio de transporte",
      departureLocation: "Lugar de salida",
      arrivalLocation: "Lugar de llegada",
      isRoundTrip: "¿Ida y vuelta?",
      modes: {
        airport: "Aeropuerto",
        train: "Tren",
        road: "Carretera",
        carBus: "Coche/Autobús",
      },
      placeholders: {
        departureAirport: "Buscar aeropuerto de salida...",
        arrivalAirport: "Buscar aeropuerto de llegada...",
        departureStation: "Buscar estación de salida...",
        arrivalStation: "Buscar estación de llegada...",
        departureCity: "Buscar ciudad de salida...",
        arrivalCity: "Buscar ciudad de llegada...",
      },
    },

    health: {
      title: "Información sanitaria y complementaria",
      allergies: "Alergias",
      bloodGroup: "Grupo sanguíneo",
      healthInfo: "Información complementaria",
      placeholders: {
        allergies: "Seleccionar alergias...",
        bloodGroup: "Seleccionar grupo sanguíneo...",
        healthInfo: "Medicamentos, condiciones médicas, etc.",
      },
    },

    trustContacts: {
      title: "Contactos de emergencia",
      contacts: "Contactos de emergencia",
      noContactsAdded: "No se han añadido contactos de emergencia",
      addContact: "Añadir contacto de emergencia",
      firstName: "Nombre",
      lastName: "Apellido",
      phone: "Teléfono",
      relationship: "Relación",
      removeContact: "Eliminar este contacto",
      selectRelationship: "Seleccionar relación",
      placeholders: {
        firstName: "Juan",
        lastName: "García",
        phone: "612 34 56 78",
      },
      relationships: {
        parent: "Padre/Madre",
        child: "Hijo/a",
        spouse: "Cónyuge",
        sibling: "Hermano/a",
        friend: "Amigo/a",
        other: "Otro",
      },
    },
  },

  actions: {
    print: "Imprimir",
    download: "Descargar",
    downloadPng: "Descargar PNG",
    gridConfig: "Configuración de cuadrícula de impresión:",
    columns: "Columnas:",
    rows: "Filas:",
  },

  messages: {
    errors: {
      pngGeneration: "Error al generar el PNG. Inténtalo de nuevo.",
      elementNotFound:
        "No se puede encontrar el elemento a descargar. Inténtalo de nuevo.",
      emptyForm: "Formulario vacío, impresión cancelada",
    },
    success: {
      downloaded: "Descarga exitosa",
    },
  },

  qrCode: {
    title: "Información de viaje",
    preview: "Vista previa del código QR",
    noData: "Completa el formulario para ver el código QR",
  },
  allergies: {
    categories: {
      food: "Alimentaria",
      medication: "Medicamento",
      environment: "Ambiente",
      other: "Otro",
    },
    items: {
      peanuts: "Cacahuetes",
      nuts: "Frutos secos",
      gluten: "Gluten",
      lactose: "Lactosa",
      eggs: "Huevos",
      fish: "Pescado",
      shellfish: "Mariscos",
      soy: "Soja",
      sesame: "Sésamo",
      celery: "Apio",
      mustard: "Mostaza",
      sulphites: "Sulfitos",
      lupin: "Altramuz",
      molluscs: "Moluscos",
      penicillin: "Penicilina",
      aspirin: "Aspirina",
      ibuprofen: "Ibuprofeno",
      sulfa: "Sulfamidas",
      pollen: "Polen",
      dust: "Ácaros",
      mold: "Moho",
      animal_dander: "Pelo de animales",
      insect_stings: "Picaduras de insectos",
      latex: "Látex",
    },
    selector: {
      noAllergyFound: "No se encontraron alergias.",
      addCustom: "Añadir",
      alreadySelected: "ya está seleccionado",
      selectedCount: "alergias seleccionadas",
      others: "Otros",
    },
  },

  common: {
    noCountryFound: "No se encontró ningún país.",
    responsibility: "Responsabilidad:",
    responsibilityText: "Estás compartiendo datos personales que pueden ser leídos por muchas personas. Eres el único responsable de los datos que compartes.",
  },
};