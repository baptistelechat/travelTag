import type { TranslationKeys } from '../types';

export const ru: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "Генерируйте QR-коды для вашего багажа, рюкзаков или детских вещей. Просто, быстро и безопасно.",
    footer:
      "© TravelTag - Работает 100% локально, никакие личные данные не передаются через Интернет.",
  },

  form: {
    personal: {
      title: "Личная информация",
      firstName: "Имя",
      lastName: "Фамилия",
      nationality: "Гражданство",
      postalAddress: "Почтовый адрес",
      street: "Улица",
      addressDetails: "Дополнительный адрес",
      postalCode: "Почтовый индекс",
      city: "Город",
      country: "Страна",
      phone: "Телефон",
      email: "Электронная почта",
      placeholders: {
        firstName: "Имя",
        lastName: "Фамилия",
        street: "ул. Мира, 123",
        addressDetails: "Здание А, 3 этаж, квартира 42",
        postalCode: "101000",
        city: "Москва",
        email: "пример@email.com",
        phone: "+7 495 123 45 67",
        country: "Поиск страны...",
      },
    },

    location: {
      title: "Места отправления и прибытия",
      transportMode: "Вид транспорта",
      departureLocation: "Место отправления",
      arrivalLocation: "Место прибытия",
      isRoundTrip: "Туда и обратно?",
      modes: {
        airport: "Аэропорт",
        train: "Поезд",
        road: "Дорога",
        carBus: "Автомобиль / Автобус",
      },
      placeholders: {
        departureAirport: "Поиск аэропорта отправления...",
        arrivalAirport: "Поиск аэропорта прибытия...",
        departureStation: "Поиск станции отправления...",
        arrivalStation: "Поиск станции прибытия...",
        departureCity: "Поиск города отправления...",
        arrivalCity: "Поиск города прибытия...",
      },
    },

    health: {
      title: "Здоровье и дополнительная информация",
      allergies: "Аллергии",
      bloodGroup: "Группа крови",
      healthInfo: "Дополнительная информация",
      placeholders: {
        allergies: "Выберите аллергии...",
        bloodGroup: "Выберите группу крови...",
        healthInfo: "Лекарства, заболевания и т.д.",
      },
    },

    trustContacts: {
      title: "Экстренные контакты",
      contacts: "Экстренные контакты",
      noContactsAdded: "Экстренные контакты не добавлены",
      addContact: "Добавить экстренный контакт",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Телефон",
      relationship: "Отношение",
      removeContact: "Удалить этот контакт",
      selectRelationship: "Выберите отношение",
      placeholders: {
        firstName: "Имя",
        lastName: "Фамилия",
        phone: "+7 495 123 45 67",
      },
      relationships: {
        parent: "Родитель",
        child: "Ребенок",
        spouse: "Супруг(а)",
        sibling: "Брат/Сестра",
        friend: "Друг",
        other: "Другое",
      },
    },
  },

  actions: {
    print: "Печать",
    download: "Скачать",
    downloadPng: "Скачать PNG",
    gridConfig: "Конфигурация сетки печати:",
    columns: "Столбцы:",
    rows: "Строки:",
  },

  messages: {
    errors: {
      pngGeneration: "Ошибка генерации PNG. Пожалуйста, попробуйте снова.",
      elementNotFound: "Не удается найти элемент для скачивания. Пожалуйста, попробуйте снова.",
      emptyForm: "Пустая форма, печать отменена",
    },
    success: {
      downloaded: "Скачивание успешно",
    },
  },

  qrCode: {
    title: "Информация о путешествии",
    preview: "Предварительный просмотр QR-кода",
    noData: "Заполните форму, чтобы увидеть QR-код",
  },
  allergies: {
    categories: {
      food: "Пища",
      medication: "Лекарства",
      environment: "Окружающая среда",
      other: "Другое",
    },
    items: {
      peanuts: "Арахис",
      nuts: "Орехи",
      gluten: "Глютен",
      lactose: "Лактоза",
      eggs: "Яйца",
      fish: "Рыба",
      shellfish: "Морепродукты",
      soy: "Соя",
      sesame: "Кунжут",
      celery: "Сельдерей",
      mustard: "Горчица",
      sulphites: "Сульфиты",
      lupin: "Люпин",
      molluscs: "Моллюски",
      penicillin: "Пенициллин",
      aspirin: "Аспирин",
      ibuprofen: "Ибупрофен",
      sulfa: "Сульфаниламиды",
      pollen: "Пыльца",
      dust: "Пылевые клещи",
      mold: "Плесень",
      animal_dander: "Шерсть животных",
      insect_stings: "Укусы насекомых",
      latex: "Латекс",
    },
    selector: {
      noAllergyFound: "Аллергия не найдена.",
      addCustom: "Добавить",
      alreadySelected: "уже выбрано",
      selectedCount: "аллергий выбрано",
      others: "Другие",
    },
  },

  common: {
    noCountryFound: "Страна не найдена.",
    responsibility: "Ответственность:",
    responsibilityText: "Вы делитесь личными данными, которые могут быть прочитаны большим количеством людей. Вы несете единоличную ответственность за данные, которыми делитесь.",
  },
};