export interface TranslationSchema {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
  };
  nav: {
    home: string;
    law: string;
    codes: string;
    constitution: string;
    laws: string;
    bookmarks: string;
    search: string;
    subjects: string;
  };
  search: {
    placeholder: string;
    shortPlaceholder: string;
    quickSearch: string;
    recentSearches: string;
    popularQueries: string;
    noResults: string;
    noResultsDesc: string;
    clearHistory: string;
    resultsCount: string;
    viewAllResults: string;
    searchTips: string;
    tip1: string;
    tip2: string;
    tip3: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    searchBoxTitle: string;
    popularCodes: string;
    allCodesLink: string;
    constitutionBanner: string;
    constitutionDesc: string;
    constitutionBtn: string;
    recentDocuments: string;
    recentlyViewed: string;
    noRecentlyViewed: string;
    categoriesTitle: string;
    usefulResources: string;
    officialVerification: string;
  };
  codes: {
    title: string;
    subtitle: string;
    filterAll: string;
    searchInCodes: string;
    totalCodes: string;
    statusAmalda: string;
    statusExpired: string;
    statusPending: string;
    articlesCount: string;
    lastUpdate: string;
    adoptedDate: string;
    lexUzSource: string;
    readCode: string;
  };
  document: {
    toc: string;
    closeToc: string;
    openToc: string;
    searchToc: string;
    quickFacts: string;
    actNumber: string;
    status: string;
    adoptedDate: string;
    effectiveDate: string;
    lastUpdate: string;
    totalArticles: string;
    officialSource: string;
    officialSourceLex: string;
    copyArticle: string;
    copied: string;
    bookmark: string;
    bookmarked: string;
    share: string;
    linkCopied: string;
    print: string;
    fontSize: string;
    fontStyle: string;
    fontSans: string;
    fontSerif: string;
    nextArticle: string;
    prevArticle: string;
    sanctionsTitle: string;
    notesTitle: string;
    relatedActs: string;
    russianTextNotice: string;
    articleNotFound: string;
    backToDocument: string;
  };
  bookmarks: {
    title: string;
    empty: string;
    emptyDesc: string;
    remove: string;
    clearAll: string;
    savedOn: string;
  };
  categories: {
    konstitutsiya: string;
    kodekslar: string;
    qonunlar: string;
    prezident_farmonlari: string;
    prezident_qarorlari: string;
    vm_qarorlari: string;
    vazirlik_hujjatlari: string;
    boshqa_hujjatlar: string;
  };
  subjects: {
    title: string;
    subtitle: string;
    math: string;
    history: string;
    uzbekLang: string;
    biology: string;
    chemistry: string;
    physics: string;
    geography: string;
    english: string;
    tests: string;
    comingSoon: string;
  };
  history: {
    badge: string;
    heroTitle: string;
    heroHighlight: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    verifiedSources: string;
    studentFriendly: string;
    searchResults: string;
    topicsCount: string;
    noResults: string;
    noResultsDesc: string;
    recentSearches: string;
    clearRecent: string;
    sections: {
      uzbekistan: string;
      uzbekistanDesc: string;
      world: string;
      worldDesc: string;
      people: string;
      peopleDesc: string;
      dates: string;
      datesDesc: string;
      maps: string;
      mapsDesc: string;
      glossary: string;
      glossaryDesc: string;
      certificate: string;
      certificateDesc: string;
    };
    featuredTopic: string;
    startTopic: string;
    yourProgress: string;
    progressDesc: string;
    continueAction: string;
    systematicStudy: string;
    popularTopics: string;
    viewAll: string;
    chronology: string;
    importantDates: string;
    timeline: string;
    knowledgeQuiz: string;
    quizDesc: string;
    seeResult: string;
    retakeQuiz: string;
    resultLabel: string;
    comparison: string;
    comparisonDesc: string;
    source: string;
    markAsRead: string;
    readMarked: string;
    recentReadTopics: string;
    noRecentRead: string;
  };
  footer: {
    description: string;
    lexAttribution: string;
    disclaimer: string;
    allRightsReserved: string;
    quickLinks: string;
    legalFramework: string;
  };
}

export const translations: Record<'uz' | 'ru', TranslationSchema> = {
  uz: {
    brand: {
      name: 'ILMORA',
      tagline: 'O‘zbekiston qonunchiligini o‘rganish platformasi',
      subtagline: 'Milliy sertifikat, imtihonlar va huquqiy savodxonlik uchun elektron kutubxona',
    },
    nav: {
      home: 'Bosh sahifa',
      law: 'Huquq',
      codes: 'Kodekslar',
      constitution: 'Konstitutsiya',
      laws: 'Qonunlar',
      bookmarks: 'Saqlanganlar',
      search: 'Qidiruv',
      subjects: 'Fanlar',
    },
    search: {
      placeholder: 'Qonun, kodeks, modda yoki kalit so‘zni qidiring (masalan: Mehnat kodeksi 100-modda)...',
      shortPlaceholder: 'Qidiruv (Ctrl + K)',
      quickSearch: 'Tezkor qidiruv',
      recentSearches: 'So‘nggi qidiruvlar',
      popularQueries: 'Ommabop so‘rovlar',
      noResults: 'Hech qanday natija topilmadi',
      noResultsDesc: 'Boshqa kalit so‘z yoki modda raqamini kiritib ko‘ring.',
      clearHistory: 'Tarixni tozalash',
      resultsCount: 'ta natija topildi',
      viewAllResults: 'Barcha natijalarni ko‘rish',
      searchTips: 'Qidiruv imkoniyatlari:',
      tip1: 'Modda bo‘yicha: "Mehnat kodeksi 100-modda" yoki "Jinoyat kodeksi 15"',
      tip2: 'Bob bo‘yicha: "Oila kodeksi 4-bob"',
      tip3: 'Kalit so‘zlar: "ishdan bo‘shatish", "meros", "jarima"',
    },
    home: {
      heroTitle: 'O‘zbekiston Respublikasi Qonunchilik Kutubxonasi',
      heroSubtitle: 'Rasmiy Lex.uz tizimi asosida tizimlashtirilgan kodekslar, qonunlar va moddalar tahlili. Milliy sertifikat va davlat sinovlariga tayyorlaning.',
      searchBoxTitle: 'Aqlli huquqiy qidiruv tizimi',
      popularCodes: 'Eng ko‘p o‘rganiladigan kodekslar',
      allCodesLink: 'Barcha kodekslarni ko‘rish',
      constitutionBanner: 'O‘zbekiston Respublikasi Konstitutsiyasi',
      constitutionDesc: 'Yangi tahrirdagi Konstitutsiya — davlatimizning oliy yuridik kuchga ega asosiy qonuni.',
      constitutionBtn: 'Konstitutsiyani to‘liq o‘rganish',
      recentDocuments: 'Yangi qabul qilingan va tahrirlangan qonun hujjatlari',
      recentlyViewed: 'So‘nggi ko‘rilgan hujjatlar',
      noRecentlyViewed: 'Hozircha ko‘rilgan hujjatlar mavjud emas.',
      categoriesTitle: 'Normativ-huquqiy hujjatlar toifalari',
      usefulResources: 'Foydali rasmiy manbalar',
      officialVerification: 'Rasmiy huquqiy axborot portali Lex.uz bilan muvofiqlashtirilgan',
    },
    codes: {
      title: 'O‘zbekiston Respublikasi Kodekslari',
      subtitle: 'Amaldagi barcha rasmiy kodekslar, ularning to‘liq tahriri, mundarijasi va moddalar bo‘yicha tahlili',
      filterAll: 'Barchasi',
      searchInCodes: 'Kodekslar ichidan qidirish...',
      totalCodes: 'ta kodeks mavjud',
      statusAmalda: 'Amalda',
      statusExpired: 'Kuchini yo‘qotgan',
      statusPending: 'Kuchga kirmagan',
      articlesCount: 'ta modda',
      lastUpdate: 'Oxirgi tahrir:',
      adoptedDate: 'Qabul qilingan:',
      lexUzSource: 'Lex.uz rasmiy manbasi',
      readCode: 'Kodeksni o‘qish',
    },
    document: {
      toc: 'Mundarija',
      closeToc: 'Mundarijani yopish',
      openToc: 'Mundarijani ochish',
      searchToc: 'Mundarijadan qidirish...',
      quickFacts: 'Hujjat pasporti',
      actNumber: 'Hujjat raqami:',
      status: 'Yuridik holati:',
      adoptedDate: 'Qabul sanasi:',
      effectiveDate: 'Kuchga kirish sanasi:',
      lastUpdate: 'Oxirgi o‘zgartirish:',
      totalArticles: 'Jami moddalar soni:',
      officialSource: 'Rasmiy manba:',
      officialSourceLex: 'Lex.uz da ko‘rish',
      copyArticle: 'Moddani nusxalash',
      copied: 'Nusxalandi!',
      bookmark: 'Saqlash',
      bookmarked: 'Saqlangan',
      share: 'Ulashish',
      linkCopied: 'Havola nusxalandi!',
      print: 'Chop etish',
      fontSize: 'Matn o‘lchami',
      fontStyle: 'Shrift turi',
      fontSans: 'Standart (Sans)',
      fontSerif: 'Klassik (Serif)',
      nextArticle: 'Keyingi modda',
      prevArticle: 'Oldingi modda',
      sanctionsTitle: 'Javobgarlik / Sanksiya:',
      notesTitle: 'Izoh:',
      relatedActs: 'Tegishli qonun hujjatlari',
      russianTextNotice: 'Ushbu hujjatning rasmiy ruscha matni Lex.uz portalida mavjud.',
      articleNotFound: 'Modda topilmadi',
      backToDocument: 'Hujjat boshiga qaytish',
    },
    bookmarks: {
      title: 'Saqlangan moddalar va hujjatlar',
      empty: 'Siz hali hech qanday moddani saqlamagansiz.',
      emptyDesc: 'O‘zingizga kerakli qonun moddalarini "Saqlash" tugmasi orqali belgilab oling.',
      remove: 'O‘chirish',
      clearAll: 'Barchasini tozalash',
      savedOn: 'Saqlangan sana:',
    },
    categories: {
      konstitutsiya: 'Konstitutsiya',
      kodekslar: 'Kodekslar',
      qonunlar: 'Qonunlar',
      prezident_farmonlari: 'Prezident farmonlari',
      prezident_qarorlari: 'Prezident qarorlari',
      vm_qarorlari: 'Vazirlar Mahkamasi qarorlari',
      vazirlik_hujjatlari: 'Vazirlik va idoralar hujjatlari',
      boshqa_hujjatlar: 'Boshqa normativ-huquqiy hujjatlar',
    },
    subjects: {
      title: 'Boshqa o‘quv modullari (Tez kunda)',
      subtitle: 'ILMORA platformasining kelgusi kengaytiriladigan fan yo‘nalishlari',
      math: 'Matematika',
      history: 'Tarix',
      uzbekLang: 'Ona tili va adabiyot',
      biology: 'Biologiya',
      chemistry: 'Kimyo',
      physics: 'Fizika',
      geography: 'Geografiya',
      english: 'Ingliz tili',
      tests: 'Milliy sertifikat testlari',
      comingSoon: 'Tez orada ochiladi',
    },
    history: {
      badge: 'ILMORA · TARIX',
      heroTitle: 'Tarixni yodlamang.',
      heroHighlight: 'Uni anglang.',
      heroSubtitle: 'O‘zbekiston va jahon tarixini voqealar, shaxslar va sabab-oqibatlar orqali tizimli o‘rganing.',
      searchPlaceholder: 'Amir Temur, 1370, Jadidchilik, Baqtriya...',
      verifiedSources: 'Tekshirilgan manbalar',
      studentFriendly: 'O‘quvchi uchun sodda va tushunarli',
      searchResults: 'Qidiruv natijalari',
      topicsCount: 'ta natija topildi',
      noResults: 'Natija topilmadi',
      noResultsDesc: 'Boshqa kalit so‘z bilan qidirib ko‘ring yoki takliflardan foydalaning.',
      recentSearches: 'So‘nggi qidiruvlar',
      clearRecent: 'Tarixni tozalash',
      sections: {
        uzbekistan: 'O‘zbekiston tarixi',
        uzbekistanDesc: 'Qadimgi davr, davlatlar, xonliklar va mustaqillik tarixi.',
        world: 'Jahon tarixi',
        worldDesc: 'Sivilizatsiyalar va dunyo miqyosidagi tarixiy jarayonlar.',
        people: 'Tarixiy shaxslar',
        peopleDesc: 'Sarkardalar, olimlar va ma’rifatparvarlar kutubxonasi.',
        dates: 'Sanalar va xronologiya',
        datesDesc: 'Eng muhim voqealarni vaqt chizig‘ida ko‘ring.',
        maps: 'Tarixiy xaritalar',
        mapsDesc: 'Hududlar va davlatlar o‘zgarishini xaritada kuzating.',
        glossary: 'Atamalar lug‘ati',
        glossaryDesc: 'Tarixiy tushunchalarning sodda va aniq izohi.',
        certificate: 'Milliy sertifikat',
        certificateDesc: 'Tarix fanidan milliy sertifikatga tayyorgarlik tizimi.',
      },
      featuredTopic: 'Kun mavzusi',
      startTopic: 'Mavzuni boshlash',
      yourProgress: 'Sizning progress',
      progressDesc: 'Mavzularni o‘qib borishingiz bilan progress avtomatik hisoblanadi.',
      continueAction: 'Davom ettirish',
      systematicStudy: 'Tizimli o‘rganish',
      popularTopics: 'Asosiy o‘quv mavzulari',
      viewAll: 'Barchasi',
      chronology: 'Xronologiya',
      importantDates: 'Muhim sanalar',
      timeline: 'Timeline',
      knowledgeQuiz: 'Qisqa bilim sinovi',
      quizDesc: 'Mustaqil tuzilgan amaliy test savollari',
      seeResult: 'Natijani ko‘rish',
      retakeQuiz: 'Qayta ishlash',
      resultLabel: 'Natija',
      comparison: 'Tarixiy taqqoslash',
      comparisonDesc: 'Jadvalda asosiy farq va umumiy jihatlarni solishtiring.',
      source: 'Manba',
      markAsRead: 'Mavzuni o‘qildim deb belgilash',
      readMarked: 'Mavzu o‘qildi',
      recentReadTopics: 'So‘nggi o‘qilgan mavzular',
      noRecentRead: 'Hozircha o‘qilgan mavzular yo‘q.',
    },
    footer: {
      description: 'ILMORA — O‘zbekiston Respublikasi yoshlari, talabalar va huquqshunoslar uchun milliy huquqiy ta\'lim va bilimlar portali.',
      lexAttribution: 'Hujjatlar matnlari O‘zbekiston Respublikasi Adliya vazirligining "Lex.uz" yagona elektron axborot tizimi materiallariga asoslangan.',
      disclaimer: 'Platforma huquqiy ta\'lim va ma\'rifiy maqsadlar uchun mo‘ljallangan.',
      allRightsReserved: 'Barcha huquqlar himoyalangan.',
      quickLinks: 'Foydali havolalar',
      legalFramework: 'Huquqiy asos',
    },
  },
  ru: {
    brand: {
      name: 'ILMORA',
      tagline: 'Платформа изучения законодательства Узбекистана',
      subtagline: 'Электронная библиотека для подготовки к национальному сертификату и экзаменам',
    },
    nav: {
      home: 'Главная',
      law: 'Право',
      codes: 'Кодексы',
      constitution: 'Конституция',
      laws: 'Законы',
      bookmarks: 'Закладки',
      search: 'Поиск',
      subjects: 'Предметы',
    },
    search: {
      placeholder: 'Поиск закона, кодекса, статьи или ключевых слов (напр: Трудовой кодекс статья 100)...',
      shortPlaceholder: 'Поиск (Ctrl + K)',
      quickSearch: 'Быстрый поиск',
      recentSearches: 'Недавние поиски',
      popularQueries: 'Популярные запросы',
      noResults: 'Ничего не найдено',
      noResultsDesc: 'Попробуйте изменить ключевые слова или номер статьи.',
      clearHistory: 'Очистить историю',
      resultsCount: 'результатов найдено',
      viewAllResults: 'Посмотреть все результаты',
      searchTips: 'Возможности поиска:',
      tip1: 'По статье: "Трудовой кодекс статья 100" или "Уголовный кодекс 15"',
      tip2: 'По главе: "Семейный кодекс глава 4"',
      tip3: 'Ключевые слова: "увольнение", "наследство", "штраф"',
    },
    home: {
      heroTitle: 'Библиотека Законодательства Республики Узбекистан',
      heroSubtitle: 'Систематизированные кодексы, законы и постатейный анализ на основе официальной системы Lex.uz. Готовьтесь к сертификатам и экзаменам.',
      searchBoxTitle: 'Умная система правового поиска',
      popularCodes: 'Наиболее востребованные кодексы',
      allCodesLink: 'Смотреть все кодексы',
      constitutionBanner: 'Конституция Республики Узбекистан',
      constitutionDesc: 'Конституция в новой редакции — основной закон нашего государства с высшей юридической силой.',
      constitutionBtn: 'Изучить Конституцию',
      recentDocuments: 'Новые и обновленные нормативно-правовые акты',
      recentlyViewed: 'Недавно просмотренные документы',
      noRecentlyViewed: 'Пока нет просмотренных документов.',
      categoriesTitle: 'Категории нормативно-правовых актов',
      usefulResources: 'Официальные правовые ресурсы',
      officialVerification: 'Синхронизировано с официальным правовым порталом Lex.uz',
    },
    codes: {
      title: 'Кодексы Республики Узбекистан',
      subtitle: 'Все действующие официальные кодексы, их полная редакция, оглавление и постатейный анализ',
      filterAll: 'Все',
      searchInCodes: 'Поиск среди кодексов...',
      totalCodes: 'кодексов доступно',
      statusAmalda: 'Действует',
      statusExpired: 'Утратил силу',
      statusPending: 'Не вступил в силу',
      articlesCount: 'статей',
      lastUpdate: 'Последняя редакция:',
      adoptedDate: 'Принят:',
      lexUzSource: 'Официальный источник Lex.uz',
      readCode: 'Читать кодекс',
    },
    document: {
      toc: 'Оглавление',
      closeToc: 'Закрыть оглавление',
      openToc: 'Открыть оглавление',
      searchToc: 'Поиск по оглавлению...',
      quickFacts: 'Паспорт документа',
      actNumber: 'Номер документа:',
      status: 'Юридический статус:',
      adoptedDate: 'Дата принятия:',
      effectiveDate: 'Дата вступления в силу:',
      lastUpdate: 'Последнее изменение:',
      totalArticles: 'Всего статей:',
      officialSource: 'Официальный источник:',
      officialSourceLex: 'Открыть на Lex.uz',
      copyArticle: 'Копировать статью',
      copied: 'Скопировано!',
      bookmark: 'В закладки',
      bookmarked: 'В закладках',
      share: 'Поделиться',
      linkCopied: 'Ссылка скопирована!',
      print: 'Печать',
      fontSize: 'Размер шрифта',
      fontStyle: 'Шрифт',
      fontSans: 'Стандартный (Sans)',
      fontSerif: 'Классический (Serif)',
      nextArticle: 'Следующая статья',
      prevArticle: 'Предыдущая статья',
      sanctionsTitle: 'Ответственность / Санкция:',
      notesTitle: 'Примечание:',
      relatedActs: 'Связанные акты',
      russianTextNotice: 'Официальный текст на русском языке доступен на портале Lex.uz.',
      articleNotFound: 'Статья не найдена',
      backToDocument: 'Вернуться в начало документа',
    },
    bookmarks: {
      title: 'Сохраненные статьи и документы',
      empty: 'Вы еще не добавили статей в закладки.',
      emptyDesc: 'Сохраняйте нужные статьи закона кнопкой "В закладки" для быстрого доступа.',
      remove: 'Удалить',
      clearAll: 'Очистить все',
      savedOn: 'Сохранено:',
    },
    categories: {
      konstitutsiya: 'Конституция',
      kodekslar: 'Кодексы',
      qonunlar: 'Законы',
      prezident_farmonlari: 'Указы Президента',
      prezident_qarorlari: 'Постановления Президента',
      vm_qarorlari: 'Постановления Кабинета Министров',
      vazirlik_hujjatlari: 'Акты министерств и ведомств',
      boshqa_hujjatlar: 'Другие нормативно-правовые акты',
    },
    subjects: {
      title: 'Другие учебные модули (Скоро)',
      subtitle: 'Будущие направления образовательной платформы ILMORA',
      math: 'Математика',
      history: 'История',
      uzbekLang: 'Родной язык и литература',
      biology: 'Биология',
      chemistry: 'Химия',
      physics: 'Физика',
      geography: 'География',
      english: 'Английский язык',
      tests: 'Тесты национального сертификата',
      comingSoon: 'Скоро будет доступно',
    },
    history: {
      badge: 'ILMORA · ИСТОРИЯ',
      heroTitle: 'Не зазубривайте историю.',
      heroHighlight: 'Поймите её.',
      heroSubtitle: 'Изучайте историю Узбекистана и мира системно через события, личности и причинно-следственные связи.',
      searchPlaceholder: 'Амир Темур, 1370, Джадидизм, Бактрия...',
      verifiedSources: 'Проверенные источники',
      studentFriendly: 'Просто и понятно для учащихся',
      searchResults: 'Результаты поиска',
      topicsCount: 'результатов найдено',
      noResults: 'Ничего не найдено',
      noResultsDesc: 'Попробуйте изменить поисковый запрос или воспользуйтесь подсказками.',
      recentSearches: 'Недавние поиски',
      clearRecent: 'Очистить историю',
      sections: {
        uzbekistan: 'История Узбекистана',
        uzbekistanDesc: 'Древнейший период, государства, ханства и эпоха независимости.',
        world: 'Всемирная история',
        worldDesc: 'Цивилизации и исторические процессы мирового масштаба.',
        people: 'Исторические личности',
        peopleDesc: 'Библиотека полководцев, ученых и просветителей.',
        dates: 'Даты и хронология',
        datesDesc: 'Ключевые события на временной шкале.',
        maps: 'Исторические карты',
        mapsDesc: 'Интерактивные исторические карты и регионы.',
        glossary: 'Словарь терминов',
        glossaryDesc: 'Простые и точные толкования исторических понятий.',
        certificate: 'Национальный сертификат',
        certificateDesc: 'Подготовка к национальному сертификату по истории.',
      },
      featuredTopic: 'Тема дня',
      startTopic: 'Начать тему',
      yourProgress: 'Ваш прогресс',
      progressDesc: 'Прогресс рассчитывается автоматически по мере изучения тем.',
      continueAction: 'Продолжить',
      systematicStudy: 'Системное изучение',
      popularTopics: 'Основные темы программы',
      viewAll: 'Все темы',
      chronology: 'Хронология',
      importantDates: 'Важные даты',
      timeline: 'Таймлайн',
      knowledgeQuiz: 'Проверка знаний',
      quizDesc: 'Авторские практические тестовые задания',
      seeResult: 'Посмотреть результат',
      retakeQuiz: 'Пройти заново',
      resultLabel: 'Результат',
      comparison: 'Историческое сравнение',
      comparisonDesc: 'Сравнительные таблицы различий и общих черт.',
      source: 'Источник',
      markAsRead: 'Отметить тему как прочитанную',
      readMarked: 'Тема изучена',
      recentReadTopics: 'Недавно изученные темы',
      noRecentRead: 'Пока нет изученных тем.',
    },
    footer: {
      description: 'ILMORA — национальный правовой образовательный портал для молодежи, студентов и юристов Узбекистана.',
      lexAttribution: 'Тексты документов основаны на материалах единой информационной системы "Lex.uz" Министерства юстиции Республики Узбекистан.',
      disclaimer: 'Платформа создана в образовательных и просветительских целях.',
      allRightsReserved: 'Все права защищены.',
      quickLinks: 'Полезные ссылки',
      legalFramework: 'Правовая база',
    },
  },
};
