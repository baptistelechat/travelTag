import type { TranslationKeys } from '../types';

export const zh: TranslationKeys = {
  app: {
    title: "🧳 TravelTag",
    description:
      "为您的行李箱、背包或儿童物品生成二维码。简单、快速、安全。",
    footer:
      "© TravelTag - 100% 本地运行，不会向互联网发送任何个人数据。",
  },

  form: {
    personal: {
      title: "个人信息",
      firstName: "名字",
      lastName: "姓氏",
      nationality: "国籍",
      postalAddress: "邮寄地址",
      street: "街道",
      addressDetails: "地址详情",
      postalCode: "邮政编码",
      city: "城市",
      country: "国家",
      phone: "电话",
      email: "邮箱",
      placeholders: {
        firstName: "名字",
        lastName: "姓氏",
        street: "和平路123号",
        addressDetails: "A栋，3楼，42号房间",
        postalCode: "100000",
        city: "北京",
        email: "example@email.com",
        phone: "138 0013 8000",
        country: "搜索国家...",
      },
    },

    location: {
      title: "出发地和目的地",
      transportMode: "交通方式",
      departureLocation: "出发地",
      arrivalLocation: "目的地",
      isRoundTrip: "往返？",
      modes: {
        airport: "机场",
        train: "火车",
        road: "公路",
        carBus: "汽车/巴士",
      },
      placeholders: {
        departureAirport: "搜索出发机场...",
        arrivalAirport: "搜索到达机场...",
        departureStation: "搜索出发车站...",
        arrivalStation: "搜索到达车站...",
        departureCity: "搜索出发城市...",
        arrivalCity: "搜索到达城市...",
      },
    },

    health: {
      title: "健康信息和补充信息",
      allergies: "过敏",
      bloodGroup: "血型",
      healthInfo: "补充信息",
      placeholders: {
        allergies: "选择过敏源...",
        bloodGroup: "选择血型...",
        healthInfo: "药物、疾病等",
      },
    },

    trustContacts: {
      title: "紧急联系人",
      contacts: "紧急联系人",
      noContactsAdded: "未添加紧急联系人",
      addContact: "添加紧急联系人",
      firstName: "名字",
      lastName: "姓氏",
      phone: "电话",
      relationship: "关系",
      removeContact: "删除此联系人",
      selectRelationship: "选择关系",
      placeholders: {
        firstName: "名字",
        lastName: "姓氏",
        phone: "138 0013 8000",
      },
      relationships: {
        parent: "父母",
        child: "子女",
        spouse: "配偶",
        sibling: "兄弟姐妹",
        friend: "朋友",
        other: "其他",
      },
    },
  },

  actions: {
    print: "打印",
    download: "下载",
    downloadPng: "下载PNG",
    gridConfig: "打印网格配置：",
    columns: "列数：",
    rows: "行数：",
  },

  messages: {
    errors: {
      pngGeneration: "生成PNG时出错。请重试。",
      elementNotFound:
        "找不到要下载的元素。请重试。",
      emptyForm: "表单为空，取消打印",
    },
    success: {
      downloaded: "下载成功",
    },
  },

  qrCode: {
    title: "旅行信息",
    preview: "二维码预览",
    noData: "填写表单以查看二维码",
  },
  allergies: {
    categories: {
      food: "食物",
      medication: "药物",
      environment: "环境",
      other: "其他",
    },
    items: {
      peanuts: "花生",
      nuts: "坚果",
      gluten: "麸质",
      lactose: "乳糖",
      eggs: "鸡蛋",
      fish: "鱼类",
      shellfish: "甲壳类",
      soy: "大豆",
      sesame: "芝麻",
      celery: "芹菜",
      mustard: "芥末",
      sulphites: "亚硫酸盐",
      lupin: "羽扇豆",
      molluscs: "软体动物",
      penicillin: "青霉素",
      aspirin: "阿司匹林",
      ibuprofen: "布洛芬",
      sulfa: "磺胺类",
      pollen: "花粉",
      dust: "尘螨",
      mold: "霉菌",
      animal_dander: "动物毛屑",
      insect_stings: "昆虫叮咬",
      latex: "乳胶",
    },
    selector: {
      noAllergyFound: "未找到过敏源。",
      addCustom: "添加",
      alreadySelected: "已选择",
      selectedCount: "已选择过敏源",
      others: "其他",
    },
  },

  common: {
    noCountryFound: "未找到国家。",
    responsibility: "责任：",
    responsibilityText: "您正在分享可能被大量人员读取的个人数据。您对所分享的数据承担全部责任。",
  },
};