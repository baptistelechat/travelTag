import type { TranslationKeys } from '../types';

export const pt: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "Gere códigos QR para suas malas, mochilas ou pertences de crianças. Simples, rápido e seguro.",
    footer:
      "© TravelTag - Funciona 100% localmente, nenhum dado pessoal é enviado para a Internet.",
  },

  form: {
    personal: {
      title: "Informações pessoais",
      firstName: "Nome",
      lastName: "Sobrenome",
      nationality: "Nacionalidade",
      postalAddress: "Endereço postal",
      street: "Rua",
      addressDetails: "Detalhes do endereço",
      postalCode: "Código postal",
      city: "Cidade",
      country: "País",
      phone: "Telefone",
      email: "Email",
      placeholders: {
        firstName: "João",
        lastName: "Silva",
        street: "Rua da Paz 123",
        addressDetails: "Edifício A, Andar 3, Apartamento 42",
        postalCode: "1000-000",
        city: "Lisboa",
        email: "exemplo@email.com",
        phone: "912 345 678",
        country: "Procurar um país...",
      },
    },

    location: {
      title: "Locais de partida e chegada",
      transportMode: "Meio de transporte",
      departureLocation: "Local de partida",
      arrivalLocation: "Local de chegada",
      isRoundTrip: "Ida e volta?",
      modes: {
        airport: "Aeroporto",
        train: "Comboio",
        road: "Estrada",
        carBus: "Carro/Autocarro",
      },
      placeholders: {
        departureAirport: "Procurar aeroporto de partida...",
        arrivalAirport: "Procurar aeroporto de chegada...",
        departureStation: "Procurar estação de partida...",
        arrivalStation: "Procurar estação de chegada...",
        departureCity: "Procurar cidade de partida...",
        arrivalCity: "Procurar cidade de chegada...",
      },
    },

    health: {
      title: "Informações de saúde e complementares",
      allergies: "Alergias",
      bloodGroup: "Grupo sanguíneo",
      healthInfo: "Informações complementares",
      placeholders: {
        allergies: "Selecionar alergias...",
        bloodGroup: "Selecionar grupo sanguíneo...",
        healthInfo: "Medicamentos, condições médicas, etc.",
      },
    },

    trustContacts: {
      title: "Contactos de emergência",
      contacts: "Contactos de emergência",
      noContactsAdded: "Nenhum contacto de emergência adicionado",
      addContact: "Adicionar contacto de emergência",
      firstName: "Nome",
      lastName: "Sobrenome",
      phone: "Telefone",
      relationship: "Relação",
      removeContact: "Remover este contacto",
      selectRelationship: "Selecionar relação",
      placeholders: {
        firstName: "João",
        lastName: "Silva",
        phone: "912 345 678",
      },
      relationships: {
        parent: "Pai/Mãe",
        child: "Filho/a",
        spouse: "Cônjuge",
        sibling: "Irmão/Irmã",
        friend: "Amigo/a",
        other: "Outro",
      },
    },
  },

  actions: {
    print: "Imprimir",
    download: "Descarregar",
    downloadPng: "Descarregar PNG",
    gridConfig: "Configuração da grelha de impressão:",
    columns: "Colunas:",
    rows: "Linhas:",
  },

  messages: {
    errors: {
      pngGeneration: "Erro ao gerar o PNG. Tente novamente.",
      elementNotFound:
        "Não é possível encontrar o elemento para descarregar. Tente novamente.",
      emptyForm: "Formulário vazio, impressão cancelada",
    },
    success: {
      downloaded: "Descarga bem-sucedida",
    },
  },

  qrCode: {
    title: "Informações de viagem",
    preview: "Pré-visualização do código QR",
    noData: "Preencha o formulário para ver o código QR",
  },
  allergies: {
    categories: {
      food: "Alimentar",
      medication: "Medicamento",
      environment: "Ambiente",
      other: "Outro",
    },
    items: {
      peanuts: "Amendoins",
      nuts: "Frutos secos",
      gluten: "Glúten",
      lactose: "Lactose",
      eggs: "Ovos",
      fish: "Peixe",
      shellfish: "Crustáceos",
      soy: "Soja",
      sesame: "Sésamo",
      celery: "Aipo",
      mustard: "Mostarda",
      sulphites: "Sulfitos",
      lupin: "Tremoço",
      molluscs: "Moluscos",
      penicillin: "Penicilina",
      aspirin: "Aspirina",
      ibuprofen: "Ibuprofeno",
      sulfa: "Sulfamidas",
      pollen: "Pólen",
      dust: "Ácaros",
      mold: "Bolor",
      animal_dander: "Pelos de animais",
      insect_stings: "Picadas de insetos",
      latex: "Látex",
    },
    selector: {
      noAllergyFound: "Nenhuma alergia encontrada.",
      addCustom: "Adicionar",
      alreadySelected: "já está selecionado",
      selectedCount: "alergias selecionadas",
      others: "Outros",
    },
  },

  common: {
    noCountryFound: "Nenhum país encontrado.",
    responsibility: "Responsabilidade:",
    responsibilityText: "Está a partilhar dados pessoais que podem ser lidos por muitas pessoas. É o único responsável pelos dados que partilha.",
  },
};