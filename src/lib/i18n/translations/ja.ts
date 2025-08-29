import type { TranslationKeys } from '../types';

export const ja: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "スーツケース、バックパック、お子様の持ち物用のQRコードを生成します。シンプル、高速、安全。",
    footer:
      "© TravelTag - 100%ローカルで動作し、個人データはインターネットに送信されません。",
  },

  form: {
    personal: {
      title: "個人情報",
      firstName: "名前",
      lastName: "姓",
      nationality: "国籍",
      postalAddress: "郵送先住所",
      street: "住所",
      addressDetails: "住所詳細",
      postalCode: "郵便番号",
      city: "市区町村",
      country: "国",
      phone: "電話番号",
      email: "メールアドレス",
      placeholders: {
        firstName: "太郎",
        lastName: "田中",
        street: "平和通り123番地",
        addressDetails: "Aビル、3階、42号室",
        postalCode: "100-0000",
        city: "東京",
        email: "example@email.com",
        phone: "090-1234-5678",
        country: "国を検索...",
      },
    },

    location: {
      title: "出発地と到着地",
      transportMode: "交通手段",
      departureLocation: "出発地",
      arrivalLocation: "到着地",
      isRoundTrip: "往復？",
      modes: {
        airport: "空港",
        train: "電車",
        road: "道路",
        carBus: "車/バス",
      },
      placeholders: {
        departureAirport: "出発空港を検索...",
        arrivalAirport: "到着空港を検索...",
        departureStation: "出発駅を検索...",
        arrivalStation: "到着駅を検索...",
        departureCity: "出発都市を検索...",
        arrivalCity: "到着都市を検索...",
      },
    },

    health: {
      title: "健康情報と補足情報",
      allergies: "アレルギー",
      bloodGroup: "血液型",
      healthInfo: "補足情報",
      placeholders: {
        allergies: "アレルギーを選択...",
        bloodGroup: "血液型を選択...",
        healthInfo: "薬、病気など",
      },
    },

    trustContacts: {
      title: "緊急連絡先",
      contacts: "緊急連絡先",
      noContactsAdded: "緊急連絡先が追加されていません",
      addContact: "緊急連絡先を追加",
      firstName: "名前",
      lastName: "姓",
      phone: "電話番号",
      relationship: "続柄",
      removeContact: "この連絡先を削除",
      selectRelationship: "続柄を選択",
      placeholders: {
        firstName: "太郎",
        lastName: "田中",
        phone: "090-1234-5678",
      },
      relationships: {
        parent: "親",
        child: "子供",
        spouse: "配偶者",
        sibling: "兄弟姉妹",
        friend: "友人",
        other: "その他",
      },
    },
  },

  actions: {
    print: "印刷",
    download: "ダウンロード",
    downloadPng: "PNGダウンロード",
    gridConfig: "印刷グリッド設定：",
    columns: "列数：",
    rows: "行数：",
  },

  messages: {
    errors: {
      pngGeneration: "PNG生成中にエラーが発生しました。再試行してください。",
      elementNotFound:
        "ダウンロードする要素が見つかりません。再試行してください。",
      emptyForm: "フォームが空です。印刷をキャンセルしました",
    },
    success: {
      downloaded: "ダウンロード成功",
    },
  },

  qrCode: {
    title: "旅行情報",
    preview: "QRコードプレビュー",
    noData: "QRコードを表示するにはフォームに入力してください",
  },
  allergies: {
    categories: {
      food: "食物",
      medication: "薬物",
      environment: "環境",
      other: "その他",
    },
    items: {
      peanuts: "ピーナッツ",
      nuts: "ナッツ類",
      gluten: "グルテン",
      lactose: "乳糖",
      eggs: "卵",
      fish: "魚類",
      shellfish: "甲殻類",
      soy: "大豆",
      sesame: "ごま",
      celery: "セロリ",
      mustard: "からし",
      sulphites: "亜硫酸塩",
      lupin: "ルピナス",
      molluscs: "軟体動物",
      penicillin: "ペニシリン",
      aspirin: "アスピリン",
      ibuprofen: "イブプロフェン",
      sulfa: "サルファ剤",
      pollen: "花粉",
      dust: "ダニ",
      mold: "カビ",
      animal_dander: "動物の毛",
      insect_stings: "虫刺され",
      latex: "ラテックス",
    },
    selector: {
      noAllergyFound: "アレルギーが見つかりません。",
      addCustom: "追加",
      alreadySelected: "は既に選択されています",
      selectedCount: "個のアレルギーが選択されています",
      others: "その他",
    },
  },

  common: {
    noCountryFound: "国が見つかりません。",
    responsibility: "責任：",
    responsibilityText: "多くの人が読むことができる個人データを共有しています。共有するデータについてはあなたが全責任を負います。",
  },
};