import type { TranslationKeys } from '../types';

export const ar: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "إدارة رموز QR لحقائبك أو حقائب الظهر أو متعلقات الأطفال. بسيط وسريع وآمن.",
    footer:
      "© TravelTag - يعمل 100% محلياً، لا يتم إرسال أي بيانات شخصية إلى الإنترنت.",
  },

  form: {
    personal: {
      title: "المعلومات الشخصية",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      nationality: "الجنسية",
      postalAddress: "العنوان البريدي",
      street: "الشارع",
      addressDetails: "تفاصيل العنوان",
      postalCode: "الرمز البريدي",
      city: "المدينة",
      country: "البلد",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      placeholders: {
        firstName: "أحمد",
        lastName: "محمد",
        street: "شارع السلام 123",
        addressDetails: "المبنى أ، الطابق 3، الشقة 42",
        postalCode: "12345",
        city: "الرياض",
        email: "example@email.com",
        phone: "966 50 123 4567",
        country: "البحث عن بلد...",
      },
    },

    location: {
      title: "مواقع المغادرة والوصول",
      transportMode: "وسيلة النقل",
      departureLocation: "موقع المغادرة",
      arrivalLocation: "موقع الوصول",
      isRoundTrip: "ذهاب وإياب؟",
      modes: {
        airport: "مطار",
        train: "قطار",
        road: "طريق",
        carBus: "سيارة/حافلة",
      },
      placeholders: {
        departureAirport: "البحث عن مطار المغادرة...",
        arrivalAirport: "البحث عن مطار الوصول...",
        departureStation: "البحث عن محطة المغادرة...",
        arrivalStation: "البحث عن محطة الوصول...",
        departureCity: "البحث عن مدينة المغادرة...",
        arrivalCity: "البحث عن مدينة الوصول...",
      },
    },

    health: {
      title: "المعلومات الصحية والتكميلية",
      allergies: "الحساسية",
      bloodGroup: "فصيلة الدم",
      healthInfo: "معلومات تكميلية",
      placeholders: {
        allergies: "اختيار الحساسية...",
        bloodGroup: "اختيار فصيلة الدم...",
        healthInfo: "الأدوية، الحالات الطبية، إلخ.",
      },
    },

    trustContacts: {
      title: "جهات الاتصال الطارئة",
      contacts: "جهات الاتصال الطارئة",
      noContactsAdded: "لم يتم إضافة جهات اتصال طارئة",
      addContact: "إضافة جهة اتصال طارئة",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      phone: "الهاتف",
      relationship: "العلاقة",
      removeContact: "إزالة جهة الاتصال هذه",
      selectRelationship: "اختيار العلاقة",
      placeholders: {
        firstName: "أحمد",
        lastName: "محمد",
        phone: "966 50 123 4567",
      },
      relationships: {
        parent: "والد/والدة",
        child: "ابن/ابنة",
        spouse: "زوج/زوجة",
        sibling: "أخ/أخت",
        friend: "صديق/صديقة",
        other: "آخر",
      },
    },
  },

  actions: {
    print: "طباعة",
    download: "تحميل",
    downloadPng: "تحميل PNG",
    gridConfig: "إعداد شبكة الطباعة:",
    columns: "الأعمدة:",
    rows: "الصفوف:",
  },

  messages: {
    errors: {
      pngGeneration: "خطأ في إنشاء PNG. حاول مرة أخرى.",
      elementNotFound:
        "لا يمكن العثور على العنصر للتحميل. حاول مرة أخرى.",
      emptyForm: "النموذج فارغ، تم إلغاء الطباعة",
    },
    success: {
      downloaded: "تم التحميل بنجاح",
    },
  },

  qrCode: {
    title: "معلومات السفر",
    preview: "معاينة رمز QR",
    noData: "املأ النموذج لرؤية رمز QR",
  },
  allergies: {
    categories: {
      food: "غذائي",
      medication: "دواء",
      environment: "بيئي",
      other: "آخر",
    },
    items: {
      peanuts: "الفول السوداني",
      nuts: "المكسرات",
      gluten: "الغلوتين",
      lactose: "اللاكتوز",
      eggs: "البيض",
      fish: "السمك",
      shellfish: "القشريات",
      soy: "الصويا",
      sesame: "السمسم",
      celery: "الكرفس",
      mustard: "الخردل",
      sulphites: "الكبريتات",
      lupin: "الترمس",
      molluscs: "الرخويات",
      penicillin: "البنسلين",
      aspirin: "الأسبرين",
      ibuprofen: "الإيبوبروفين",
      sulfa: "السلفا",
      pollen: "حبوب اللقاح",
      dust: "عث الغبار",
      mold: "العفن",
      animal_dander: "وبر الحيوانات",
      insect_stings: "لسعات الحشرات",
      latex: "اللاتكس",
    },
    selector: {
      noAllergyFound: "لم يتم العثور على حساسية.",
      addCustom: "إضافة",
      alreadySelected: "مُختار بالفعل",
      selectedCount: "حساسية مُختارة",
      others: "أخرى",
    },
  },

  common: {
    noCountryFound: "لم يتم العثور على بلد.",
    responsibility: "المسؤولية:",
    responsibilityText: "أنت تشارك بيانات شخصية يمكن أن يقرأها كثير من الناس. أنت المسؤول الوحيد عن البيانات التي تشاركها.",
  },
};