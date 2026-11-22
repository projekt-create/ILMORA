export type HistorySection = 'all' | 'uzbekistan' | 'world' | 'people' | 'dates' | 'maps' | 'glossary' | 'certificate';

export interface HistoryTopicSection {
  title: string;
  content: string;
}

export interface CauseAndEffect {
  cause: string;
  event: string;
  effect: string;
}

export interface TopicQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface HistoryTopic {
  id: string;
  title: string;
  period: string;
  section: Exclude<HistorySection, 'all'>;
  summary: string;
  accent: string;
  status: 'available' | 'coming-soon';
  source: string;
  sourceUrl: string;
  verificationStatus: 'verified' | 'editorial';
  image?: string;
  imageCaption?: string;
  overview?: string;
  detailedSections?: HistoryTopicSection[];
  causeAndEffect?: CauseAndEffect[];
  keyFigures?: string[];
  keyDates?: { date: string; event: string }[];
  keyTerms?: { term: string; definition: string }[];
  miniQuiz?: TopicQuizQuestion[];
}

export interface HistoryPerson {
  id: string;
  name: string;
  years: string;
  role: string;
  summary: string;
  achievements: string[];
  source: string;
  sourceUrl: string;
  verificationStatus: 'verified' | 'editorial';
}

export interface HistoryDate {
  id: string;
  date: string;
  title: string;
  summary: string;
  section: 'O‘zbekiston tarixi' | 'Jahon tarixi';
  category: string;
  source: string;
  sourceUrl: string;
  verificationStatus: 'verified' | 'editorial';
}

export interface ComparisonItem {
  id: string;
  title: string;
  category: string;
  leftTitle: string;
  rightTitle: string;
  source: string;
  sourceUrl: string;
  rows: [string, string, string][];
}

export interface QuizQuestion {
  id: string;
  topic: string;
  category: 'O‘zbekiston tarixi' | 'Jahon tarixi' | 'Temuriylar' | 'Yangi davr' | 'Urushlar va inqiloblar';
  difficulty: 'Oson' | 'O‘rta' | 'Murakkab';
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  source: string;
  sourceUrl: string;
}

export const historyTopics: HistoryTopic[] = [
  // --- O'ZBEKISTON TARIXI ---
  {
    id: 'uzbekistan-ancient',
    title: 'Eng qadimgi davr',
    period: 'Paleolit — mil. avv. III mingyillik',
    section: 'uzbekistan',
    summary: 'O‘zbekiston hududidagi ilk odamlar, Selung‘ur va Teshiktosh g‘orlari hamda Sopollitepa, Jarqo‘ton sivilizatsiyalari.',
    accent: 'from-amber-500 to-orange-600',
    status: 'available',
    source: 'O‘zbekiston Milliy Ensiklopediyasi (Tosh va bronza davri)',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    overview: 'O‘zbekiston zamini insoniyat sivilizatsiyasining eng qadimgi beshiklaridan biridir. Farg‘onadagi Selung‘ur, Boysundagi Teshiktosh va Surxondaryodagi Jarqo‘ton ilk shahar madaniyati vujudga kelishidan darak beradi.',
    detailedSections: [
      {
        title: '1. Ilk odam manzilgohlari: Selung‘ur va Teshiktosh',
        content: 'Farg‘ona vodiysidagi Selung‘ur g‘ori ilk paleolit davriga tegishli bo‘lib, u yerdan qadimgi odam suyak qoldiqlari topilgan. Teshiktosh g‘oridan esa 8–9 yoshli neandertal bolaning bosh suyagi va kiyik shoxlari bilan o‘ralgan ilk dafn marosimi ochilgan.',
      },
      {
        title: '2. Neolit inqilobi va ilk dehqonchilik',
        content: 'Neolit (yangi tosh) davrida insoniyat ovchilik va terimchilikdan o‘troq dehqonchilik va chorvachilikka o‘tdi. Bu ishlab chiqaruvchi xo‘jalikning boshlanishi deb ataladi.',
      },
      {
        title: '3. Bronza davri va Jarqo‘ton ilk shaharchasi',
        content: 'Surxondaryodagi Sopollitepa va Jarqo‘ton yodgorliklari bronza davrida (mil. avv. II mingyillik) shakllangan ilk shahar tipidagi markazlar bo‘lib, u yerda ibodatxona, saroy va hunarmandchilik mahallalari bo‘lgan.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Sun’iy sug‘orishga asoslangan dehqonchilikning kashf etilishi',
        event: 'Sopollitepa va Jarqo‘ton manzilgohlarining vujudga kelishi',
        effect: 'Urug‘chilik jamoasidan ilk sinfiy jamiyat va davlatchilik kurtaklariga o‘tildi',
      },
    ],
    keyFigures: ['Neandertal odami (Teshiktosh)', 'Jarqo‘ton jamoalari oqsoqollari'],
    keyDates: [
      { date: 'Mil. avv. 1 mln – 100 ming yillik', event: 'Selung‘ur ilk paleolit manzilgohi davri' },
      { date: 'Mil. avv. 100 – 40 ming yillik', event: 'Teshiktosh o‘rta paleolit manzilgohi' },
      { date: 'Mil. avv. II mingyillik', event: 'Jarqo‘ton ilk shahar madaniyati' },
    ],
    keyTerms: [
      { term: 'Paleolit', definition: 'Qadimgi tosh davri; tosh qurollar ishlatilgan eng qadimgi davr.' },
      { term: 'Neolit inqilobi', definition: 'O‘zlashtiruvchi xo‘jalikdan ishlab chiqaruvchi dehqonchilikka o‘tish.' },
    ],
    miniQuiz: [
      {
        question: 'O‘zbekiston hududidagi neandertal odami qoldiqlari qaysi g‘ordan topilgan?',
        options: ['Selung‘ur', 'Teshiktosh', 'Obirahmat', 'Zarautsoy'],
        answer: 1,
        explanation: 'Surxondaryodagi Teshiktosh g‘oridan o‘rta paleolit davriga oid neandertal bolaning bosh suyagi topilgan.',
      },
    ],
  },
  {
    id: 'uzbekistan-ancient-states',
    title: 'Qadimgi davlatlar va Buyuk Ipak Yo‘li',
    period: 'Mil. avv. VI — milodiy III asr',
    section: 'uzbekistan',
    summary: 'Baqtriya, So‘g‘d, Katta Xorazm, Qang‘, Davan va qudratli Kushon imperiyasi tarixi.',
    accent: 'from-blue-600 to-indigo-700',
    status: 'available',
    source: 'O‘zbekiston Milliy Ensiklopediyasi & Gerodot "Tarix"',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    image: '/images/history/ancient-states.svg',
    imageCaption: 'Antik davr Markaziy Osiyo davlatlari va Kanishka Kushon tangasi ramzi',
    overview: 'Mil. avv. I mingyillik o‘rtalarida mintaqamizda Qadimgi Baqtriya va Katta Xorazm kabi ilk davlatlar vujudga keldi. So‘ngra hudud Ahamoniylar va Aleksandr Makedonskiy istilolariga qarshi mardonavor kurashdi va qudratli Kushon davlati tarkibiga kirdi.',
    detailedSections: [
      {
        title: '1. Kir II bosqini va To‘maris qahramonligi',
        content: 'Mil. avv. 530-yilda Eron shohi Kir II O‘rta Osiyoga bostirib kirdi. Massagetlar malikasi To‘maris bosqinchilarni tor-mor qilib, Kir II ning o‘zini jang maydonida halok qildi.',
      },
      {
        title: '2. Aleksandr Makedonskiyga qarshi Spitamen qo‘zg‘oloni',
        content: 'Mil. avv. 329–327-yillarda Aleksandr qo‘shinlari Baqtriya va So‘g‘dga bostirib kirdi. Spitamen boshchiligida xalq 3 yil davomida partizanlik usulida ozodlik kurashini olib bordi.',
      },
      {
        title: '3. Kushon davlati va Buyuk Ipak Yo‘li',
        content: 'Milodiy I–III asrlarda Kanishka I davrida Kushon imperiyasi Hindiston, Afg‘oniston va O‘rta Osiyoni birlashtirdi. Buyuk Ipak Yo‘li xalqaro miqyosda gullab-yashnadi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Kushon davlatining yagona pul va xavfsiz karvon yo‘llarini ta’minlashi',
        event: 'Buyuk Ipak Yo‘li orqali Sharq va G‘arb savdosi avj oldi',
        effect: 'Madaniyatlar, dinlar va ilm-fan yutuqlari o‘zaro boyidi',
      },
    ],
    keyFigures: ['To‘maris', 'Spitamen', 'Kanishka I', 'Aleksandr Makedonskiy'],
    keyDates: [
      { date: 'Mil. avv. 530-yil', event: 'To‘marisning Kir II ustidan g‘alabasi' },
      { date: 'Mil. avv. 329–327-yillar', event: 'Spitamen boshchiligidagi xalq ozodlik kurashi' },
      { date: 'Milodiy I–III asrlar', event: 'Kushon imperiyasining ravnaqi' },
    ],
    keyTerms: [
      { term: 'Avesto', definition: 'Zardushtiylikning muqaddas kitobi, qadimgi tariximizning yozma manbasi.' },
      { term: 'Ellinizm', definition: 'Yunon madaniyatining Sharq madaniyatlari bilan sintezi.' },
    ],
    miniQuiz: [
      {
        question: 'Mil. avv. 530-yilda forslar shohi Kir II ni tor-mor etgan jasur sarkarda kim?',
        options: ['Spitamen', 'To‘maris', 'Zarina', 'Shiroq'],
        answer: 1,
        explanation: 'Massagetlar malikasi To‘maris Kir II qo‘shinlarini mag‘lub etgan.',
      },
    ],
  },
  {
    id: 'uzbekistan-medieval',
    title: 'Somoniylar, Qoraxoniylar va Sharq Renessansi',
    period: 'IX — XII asrlar',
    section: 'uzbekistan',
    summary: 'Somoniylar davlatining yuksalishi va 999-yilgi qulashi, Qoraxoniylar hamda Birinchi Sharq Renessansi.',
    accent: 'from-violet-600 to-purple-800',
    status: 'available',
    source: 'O‘zbekiston Milliy Ensiklopediyasi (Somoniylar davlati)',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    overview: 'IX–XII asrlarda Movarounnahr va Xorazm mustaqil davlatlarga birlashdi. Buxoro poytaxt bo‘lgan Somoniylar davlati gullab-yashnadi. Biroq ichki feodal nizolar oqibatida 999-yilda Somoniylar qulab, hokimiyat Qoraxoniylar va G‘aznaviylar qo‘liga o‘tdi. Bu davrda jahon ilm-faniga Al-Xorazmiy, Beruniy va Ibn Sino kabi allomalar yetishib chiqdi.',
    detailedSections: [
      {
        title: '1. Ismoil Somoniy va markazlashgan davlat',
        content: 'Ismoil Somoniy (892–907) Movarounnahrni birlashtirib, poytaxti Buxoro bo‘lgan kuchli markazlashgan davlat barpo etdi. Shaharlarda devorlar, kutubxonalar va madrasalar qurildi.',
      },
      {
        title: '2. Somoniylar davlatining inqirozi va qulashi (999-yil)',
        content: 'X asr oxirida ichki harbiy amirlar isyoni va sulolaviy nizolar davlatni zaiflashtirdi. 999-yilda turkiy Qoraxoniylar Buxoroni egallab, Somoniylar sulolasi hukmronligiga butunlay chek qo‘ydi.',
      },
      {
        title: '3. Birinchi Sharq Renessansi daholari',
        content: 'Bu davrda Al-Xorazmiy algebraga asos soldi, Beruniy Yer radiusini o‘lchadi va globus yaratdi, Ibn Sino "Tib qonunlari" bilan jahon tibbiyotiga rahbarlik qildi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Somoniy amirlarining o‘zaro ziddiyatlari va markaziy hokimiyatning kuchsizlanishi',
        event: '999-yilda Qoraxoniylarning Buxoroga kirib kelishi',
        effect: 'Somoniylar davlati butunlay qulab, Movarounnahr Qoraxoniylar tasarrufiga o‘tdi',
      },
    ],
    keyFigures: ['Ismoil Somoniy', 'Al-Xorazmiy', 'Abu Rayhon Beruniy', 'Abu Ali ibn Sino', 'Mahmud Qoshg‘ariy'],
    keyDates: [
      { date: '875–999-yillar', event: 'Somoniylar davlatining hukmronlik yillari' },
      { date: '999-yil', event: 'Somoniylar davlatining qulashi va Qoraxoniylar g‘alabasi' },
      { date: '1004-yil', event: 'Xorazm Ma’mun akademiyasining ta’sis etilishi' },
    ],
    keyTerms: [
      { term: 'Renessans', definition: 'Ilm-fan, falsafa va madaniyatning uyg‘onish va yuksak rivojlanish davri.' },
      { term: 'Devon', definition: 'Somoniylar va Qoraxoniylar davrida vazirlik va mahkama boshqaruvi.' },
    ],
    miniQuiz: [
      {
        question: 'Somoniylar davlati qaysi yili va kimlar tomonidan tugatilgan?',
        options: ['1221-yil mo‘g‘ullar tomonidan', '999-yil Qoraxoniylar tomonidan', '1370-yil Amir Temur tomonidan', '1501-yil Shayboniyxon tomonidan'],
        answer: 1,
        explanation: '999-yilda Qoraxoniylar Buxoroni egallab, Somoniylar siyosiy hukmronligiga chek qo‘ygan.',
      },
    ],
  },
  {
    id: 'uzbekistan-khorezmshah-mongol',
    title: 'Xorazmshohlar davlatining qulashi va Mo‘g‘ullar istilosi',
    period: '1219 — 1221-yillar',
    section: 'uzbekistan',
    summary: 'Chingizxon bosqini, O‘tror fojiasi, Jaloliddin Manguberdi qahramonligi va qudratli saltanatning qulashi.',
    accent: 'from-red-600 to-amber-700',
    status: 'available',
    source: 'Nasaviy "Sulton Jaloliddin Manguberdi hayoti" & O‘zbekiston tarixi',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    overview: 'XIII asr boshida Anushteginiylar sulolasi boshqargan Xorazmshohlar saltanati ulkan hududni egallagan eng qudratli davlat edi. Ammo O‘tror fojiasi, ichki boshqaruv xatolari va Chingizxonning shafqatsiz yurishlari oqibatida qisqa vaqtda saltanat quladi. Sulton Jaloliddin Manguberdi esa mo‘g‘ullarga qarshi xalq ozodlik kurashining buyuk qahramoniga aylandi.',
    detailedSections: [
      {
        title: '1. Saltanat qudrati va O‘tror fojiasi (1218)',
        content: 'Alovuddin Muhammad davrida saltanat kengaydi, biroq ona malika Turkon xotun bilan hukmdor o‘rtasidagi ziddiyat boshqaruvni zaiflashtirdi. 1218-yilda O‘trorda Chingizxon yuborgan 500 tuyalik savdo karvoni qatl etildi, bu esa urush uchun bahona bo‘ldi.',
      },
      {
        title: '2. Chingizxon qo‘shinlarining bostirib kirishi (1219–1220)',
        content: 'Chingizxon qo‘shinlari Buxoro, Samarqand, O‘tror va Urganchni qamal qildi. Mudofaa kuchlarining tarqoq joylashtirilishi tufayli shaharlar birma-bir bosib olindi va vayron qilindi.',
      },
      {
        title: '3. Jaloliddin Manguberdining tengsiz jasorati',
        content: 'Muhammad Xorazmshoh Kaspiy orollarida vafot etgach, taxtga uning o‘g‘li Jaloliddin o‘tirdi. U Parvon jangida mo‘g‘ullarni mag‘lub etdi, Sind (Hind) daryosi bo‘yida afsonaviy jasorat ko‘rsatdi va 11 yil davomida mo‘g‘ullarga qarshi kurashni davom ettirdi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Qo‘shinlarning yagona markazda birlashtirilmay, shaharlar bo‘ylab bo‘lib tashlanishi',
        event: 'Chingizxon qo‘shinlarining shaharlarni ketma-ket mag‘lub etishi',
        effect: 'Xorazmshohlar saltanati quladi va yurt mo‘g‘ullar asorati ostiga tushdi',
      },
    ],
    keyFigures: ['Jaloliddin Manguberdi', 'Chingizxon', 'Temur Malik', 'Alovuddin Muhammad'],
    keyDates: [
      { date: '1218-yil', event: 'O‘tror fojiasi' },
      { date: '1219–1221-yillar', event: 'Mo‘g‘ullarning Movarounnahr va Xorazmga bostirib kirishi' },
      { date: '1221-yil', event: 'Parvon jangi va Sind daryosi bo‘yidagi jang' },
    ],
    keyTerms: [
      { term: 'O‘tror fojiasi', definition: 'Chingizxon elchilari va karvonining O‘trorda o‘ldirilishi bilan boshlangan ziddiyat.' },
      { term: 'Parvon jangi', definition: 'Jaloliddin Manguberdining mo‘g‘ul bosh qo‘mondoni Shiki Xutuxu ustidan qozongan yirik g‘alabasi.' },
    ],
    miniQuiz: [
      {
        question: 'Chingizxon qo‘shinlariga qarshi Parvon jangida ilk bor yirik g‘alaba qozongan sarkarda kim?',
        options: ['Temur Malik', 'Jaloliddin Manguberdi', 'Ismoil Somoniy', 'Najmiddin Kubro'],
        answer: 1,
        explanation: 'Jaloliddin Manguberdi 1221-yilda Parvon dashtida mo‘g‘ul qo‘shinini butunlay mag‘lubiyatga uchratgan.',
      },
    ],
  },
  {
    id: 'uzbekistan-temurids',
    title: 'Amir Temur va Temuriylar saltanati',
    period: '1370 — 1507-yillar',
    section: 'uzbekistan',
    summary: 'Markazlashgan qudratli davlat, Temur tuzuklari, Samarqand va Hirot Renessansi hamda sulolaviy inqiroz.',
    accent: 'from-amber-600 to-yellow-600',
    status: 'available',
    source: 'O‘zbekiston Milliy Ensiklopediyasi & Nizomiddin Shomiy "Zafarnoma"',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    image: '/images/history/temurids.svg',
    imageCaption: 'Samarqand Go‘ri Amir gumbazi va Amir Temurning "Rosti-rusti" ramzi',
    overview: '1370-yilda Amir Temur Movarounnahrda ichki tarqoqlikka chek qo‘yib, poytaxti Samarqand bo‘lgan qudratli saltanat tuzdi. "Kuch — adolatdadir" shiori ostida qonunchilik va davlat boshqaruvi yo‘lga qo‘yildi. Temuriylar davri Ikkinchi Sharq Renessansining cho‘qqisi bo‘lib, Ulug‘bek va Navoiy ijodi bilan dunyoga tanildi.',
    detailedSections: [
      {
        title: '1. Amir Temurning davlat barpo etishi va "Temur tuzuklari"',
        content: '1370-yil Balx qurultoyida Amir Temur oliy hukmdor deb e’lon qilindi. U Yevrosiyo qit’asida savdo yo‘llari xavfsizligini ta’minladi, Oltin O‘rda xoni To‘xtamish va Usmonli sultoni Boyazid ustidan g‘alaba qozondi.',
      },
      {
        title: '2. Mirzo Ulug‘bek va Samarqand ilmiy maktabi',
        content: 'Ulug‘bek 1428-yilda Samarqandda rasadxona qurdirdi. Uning "Ziji jadidi Ko‘ragoniy" asarida 1018 ta yulduzning aniq koordinatalari belgilab berildi.',
      },
      {
        title: '3. Alisher Navoiy va Temuriylar saltanatining inqirozi',
        content: 'Husayn Boyqaro va Alisher Navoiy davrida Hirot madaniy markazga aylandi. Ammo XV asr oxiridagi o‘zaro taxt talashishlar oqibatida 1500–1507-yillarda Shayboniyxon boshchiligidagi ko‘chmanchi o‘zbeklar Temuriylar saltanatiga barham berdi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Amir Temur vafotidan so‘ng temuriy shahzodalar o‘rtasidagi to‘xtovsiz taxt kurashlari',
        event: 'Shayboniyxon qo‘shinlarining Samarqand va Hirotni egallashi',
        effect: 'Temuriylar saltanati quladi; Bobur Hindistonga chekinib Boburiylar davlatini tuzdi',
      },
    ],
    keyFigures: ['Amir Temur', 'Mirzo Ulug‘bek', 'Alisher Navoiy', 'Husayn Boyqaro', 'Zahiriddin Muhammad Bobur'],
    keyDates: [
      { date: '1370-yil', event: 'Amir Temurning Movarounnahr taxtiga o‘tirishi' },
      { date: '1402-yil', event: 'Anqara jangi (Amir Temur va Boyazid Yildirim)' },
      { date: '1428-yil', event: 'Mirzo Ulug‘bek rasadxonasining qurilishi' },
      { date: '1501–1507-yillar', event: 'Temuriylar sulolasining Movarounnahr va Xurosonda tugatilishi' },
    ],
    keyTerms: [
      { term: 'Temur tuzuklari', definition: 'Amir Temurning davlat boshqaruvi va harbiy san’atga oid qonuniy qo‘llanmasi.' },
      { term: 'Zij', definition: 'Yulduzlar harakati va matematik hisob-kitoblar bayon etilgan astronomik jadval.' },
    ],
    miniQuiz: [
      {
        question: 'Amir Temur davlatining bosh shiori qaysi edi?',
        options: ['Kuch — adolatdadir', 'Ilm — najotdir', 'Tinchlik — boylikdir', 'G‘alaba — irodada'],
        answer: 0,
        explanation: 'Amir Temur "Rosti-rusti" (Kuch — adolatdadir) shiorini davlatning bosh tamoyili deb bilgan.',
      },
    ],
  },
  {
    id: 'uzbekistan-khanates-fall',
    title: 'Uch o‘zbek xonligi va ularning Chor istilosi ostida qulashi',
    period: 'XVI asr — 1876-yil',
    section: 'uzbekistan',
    summary: 'Buxoro amirligi, Xiva va Qo‘qon xonliklarining ichki nizolari hamda 1865–1876-yillardagi Chor Rossiyasi istilosi.',
    accent: 'from-amber-700 to-stone-900',
    status: 'available',
    source: 'O‘zbekiston tarixi (1865–1917) & Milliy Ensiklopediya',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    image: '/images/history/uzbek-khanates.svg',
    imageCaption: 'Buxoro Arki, uch xonlik sarhadlari va mustamlaka istilosi davri',
    overview: 'XVI–XIX asrlarda O‘zbekiston hududida uch mustaqil davlat — Buxoro amirligi, Xiva va Qo‘qon xonliklari faoliyat yuritdi. Biroq ularning o‘zaro urushlari, harbiy texnikadagi qoloqlik va tarqoqlik oqibatida 1865–1876-yillarda Chor Rossiyasi ularni ketma-ket zabt etdi.',
    detailedSections: [
      {
        title: '1. Uch xonlikning shakllanishi va o‘zaro ziddiyatlari',
        content: 'Shayboniylar va ashtarxoniylardan so‘ng Buxoro amirligi (Mang‘itlar), Xiva xonligi (Qo‘ng‘irotlar) va Qo‘qon xonligi (Minglar) qaror topdi. Yagona milliy birlikning yo‘qligi ularni himoyasiz qilib qo‘ydi.',
      },
      {
        title: '2. 1865-yil Toshkent qamali va istiloning boshlanishi',
        content: 'General Chernyayev boshchiligidagi rus qo‘shinlari 1865-yil iyun oyida Toshkentni qamal qildi. Shahar mudofaasiga Kamolon darvozasi himoyachilari boshchilik qildi, biroq Toshkent quladi.',
      },
      {
        title: '3. Davlatlarning qulashi: 1868, 1873 va 1876-yillar',
        content: '1868-yilda Zirabuloq jangidagi mag‘lubiyatdan so‘ng Buxoro amirligi, 1873-yilda Gandimiyon shartnomasi bilan Xiva xonligi Rossiya protektoratiga (qaramiga) aylandi. 1876-yilda esa Qo‘qon xonligi butunlay bekor qilinib, Farg‘ona viloyati sifatida imperiyaga qo‘shib olindi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Uch xonlikning o‘zaro ichki tarqoqligi va zamonaviy qurol-yarog‘ning yetishmasligi',
        event: 'Chor armiyasining 1865–1876-yillardagi bosqini',
        effect: 'Qo‘qon xonligi quladi, Buxoro va Xiva vassal qaramlikka tushdi; Turkiston mustamlakaga aylandi',
      },
    ],
    keyFigures: ['Alimqul', 'Amir Muzaffar', 'Muhammad Rahimxon II (Feruz)', 'General Chernyayev', 'General fon Kaufman'],
    keyDates: [
      { date: '1865-yil 17-iyun', event: 'Chor qo‘shinlari tomonidan Toshkentning egallanishi' },
      { date: '1867-yil', event: 'Turkiston general-gubernatorligining tuzilishi' },
      { date: '1873-yil', event: 'Gandimiyon shartnomasi va Xivaning vassalga aylanishi' },
      { date: '1876-yil 19-fevral', event: 'Qo‘qon xonligining butunlay tugatilishi' },
    ],
    keyTerms: [
      { term: 'Protektorat', definition: 'Bir davlatning boshqa kuchli davlatga tashqi siyosat va mudofaa bo‘yicha qaram bo‘lishi.' },
      { term: 'Turkiston general-gubernatorligi', definition: 'Chor Rossiyasining mustamlakani boshqarish uchun tuzgan harbiy-ma’muriy tizimi.' },
    ],
    miniQuiz: [
      {
        question: 'Chor Rossiyasi tomonidan Qo‘qon xonligi qaysi yili rasman butunlay tugatilgan?',
        options: ['1865-yil', '1868-yil', '1873-yil', '1876-yil'],
        answer: 3,
        explanation: '1876-yil 19-fevralda podsho farmoni bilan Qo‘qon xonligi tugatilib, Farg‘ona viloyati deb nomlangan.',
      },
    ],
  },
  {
    id: 'uzbekistan-colonial-jadid',
    title: 'Jadidchilik harakati va 1916-yilgi xalq qo‘zg‘oloni',
    period: 'XIX asr oxiri — 1916-yil',
    section: 'uzbekistan',
    summary: 'Ma’rifatparvarlik, usuli jadid maktablari, teatr, milliy matbuot va 1916-yilgi mardikorlikka qarshi qo‘zg‘olon.',
    accent: 'from-orange-500 to-amber-700',
    status: 'available',
    source: 'O‘zbekiston Milliy Ensiklopediyasi (Jadidchilik)',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    overview: 'XIX asr oxirida Turkiston xalqini mustamlaka zulmi va jaholatdan qutqarish uchun Jadidchilik harakati vujudga keldi. 1916-yilda podsho hukumatining mardikorlik farmoniga qarshi butun Turkiston bo‘ylab milliy ozodlik qo‘zg‘oloni ko‘tarildi.',
    detailedSections: [
      {
        title: '1. Usuli jadid maktablari va ma’rifat',
        content: 'Mahmudxo‘ja Behbudiy, Munavvarqori, Fitrat, Avloniy kabi ma’rifatparvarlar bolalarga dunyoviy fanlar va ona tilini o‘rgatadigan zamonaviy yangi usul maktablarini ochdilar.',
      },
      {
        title: '2. Matbuot va teatr: Millat uyg‘onishi',
        content: 'Jadidlar "Samarqand", "Sadoi Turkiston", "Oyna" kabi gazeta-jurnallarni nashr etdilar. Behbudiyning "Padarkush" pyesasi bilan milliy teatrga tamal toshi qo‘yildi.',
      },
      {
        title: '3. 1916-yilgi umumxalq qo‘zg‘oloni',
        content: '1916-yil 25-iyunda podsho Nikolay II Turkiston aholisini mardikorlikka olish to‘g‘risida farmon chiqardi. Bunga javoban Toshkent, Jizzax, Samarqand va Farg‘onada xalq qo‘zg‘olonlari boshlandi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Birinchi jahon urushi davrida chor hukumatining mardikorlik farmoni',
        event: '1916-yilgi Jizzax va Toshkent xalq qo‘zg‘olonlari',
        effect: 'Xalqning mustamlakaga qarshi milliy ozodlik ongi keskin oshdi',
      },
    ],
    keyFigures: ['Mahmudxo‘ja Behbudiy', 'Munavvarqori Abdurashidxonov', 'Abdurauf Fitrat', 'Abdulla Avloniy', 'Nazir To‘raqulov'],
    keyDates: [
      { date: '1901-yil', event: 'Toshkentda Munavvarqori tomonidan ilk jadid maktabi ochilishi' },
      { date: '1911-yil', event: 'Mahmudxo‘ja Behbudiyning "Padarkush" dramasi' },
      { date: '1916-yil 25-iyun', event: 'Chor podshosining mardikorlik to‘g‘risidagi farmoni' },
      { date: '1916-yil iyul', event: 'Jizzax qo‘zg‘oloni' },
    ],
    keyTerms: [
      { term: 'Usuli jadid', definition: 'Tovush usuliga asoslangan, dunyoviy bilimlarni o‘rgatuvchi yangi maktab.' },
      { term: 'Mardikorlik', definition: 'Urush fronti ortidagi og‘ir qora ishlarga majburiy safarbar qilish.' },
    ],
    miniQuiz: [
      {
        question: '1916-yilgi xalq qo‘zg‘olonining asosiy sababi nima edi?',
        options: ['Soliqlarning bekor qilinishi', 'Aholini front orti mardikorlik ishlariga majburan olish farmoni', 'Yangi maktablarning ochilishi', 'Konstitutsiya qabul qilinishi'],
        answer: 1,
        explanation: '1916-yil 25-iyundagi mardikorlik to‘g‘risidagi imperator farmoni xalq g‘azabini qo‘zg‘atgan.',
      },
    ],
  },
  {
    id: 'uzbekistan-turkiston-autonomy',
    title: '1917-yil inqiloblari va Turkiston Muxtoriyatining fojiali qulashi',
    period: '1917 — 1918-yillar',
    section: 'uzbekistan',
    summary: 'Rossiyadagi Fevral va Oktyabr inqiloblari, Qo‘qonda Turkiston Muxtoriyatining tuzilishi va bolsheviklar tomonidan qonga botirilishi.',
    accent: 'from-emerald-700 to-rose-900',
    status: 'available',
    source: 'Mustafo Cho‘qay xotiralari & O‘zbekiston tarixi ilmiy nashrlari',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    image: '/images/history/turkiston-autonomy.svg',
    imageCaption: '1917-yil Turkiston Muxtoriyati bayrog‘i va ozodlik uchun kurash',
    overview: '1917-yilda Chor Rossiyasida inqilob yuz berib, podsho monarxiyasi ag‘darildi. Turkiston ziyolilari fursatdan foydalanib, 1917-yil 27-noyabrda Qo‘qon shahrida birinchi demokratik davlat — Turkiston Muxtoriyatini tuzdilar. Biroq 1918-yil fevralda Toshkentdagi bolsheviklar Qo‘qonni to‘pga tutib, bu davlatni shafqatsizlarcha qulatdi.',
    detailedSections: [
      {
        title: '1. 1917-yilgi inqiloblar va podsholikning qulashi',
        content: 'Fevral inqilobida podsho Nikolay II taxtdan voz kechdi. Oktyabr to‘ntarishi bilan hokimiyat Lenin boshchiligidagi bolsheviklar qo‘liga o‘tdi. Toshkentda sovet hokimiyati o‘rnatildi, ammo ular tub yerli aholini boshqaruvga kiritmadi.',
      },
      {
        title: '2. Turkiston Muxtoriyatining e’lon qilinishi (1917-yil 27-noyabr)',
        content: 'Qo‘qonda IV Umumturkiston musulmonlari qurultoyi chaqirildi. Unda Turkiston Muxtoriyati (Turkiston avtonomiyasi) e’lon qilindi. Hukumat boshliqlari etib Muhammadjon Tinishboyev, so‘ng Mustafo Cho‘qay saylandi.',
      },
      {
        title: '3. Qo‘qon fojiasi va davlatning qulashi (1918-yil fevral)',
        content: 'Qizil gvardiyachilar va arman doshnoqlari birlashib, 1918-yil fevralda Qo‘qon shahriga bostirib kirdi. Uch kun davomida shahar yoqib yuborildi, 10 mingdan ortiq begunoh aholi qatl etildi va Muxtoriyat quladi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Turkiston Muxtoriyatining milliy mustaqillikka intilishi va bolsheviklar mustabid siyosati',
        event: '1918-yil fevralda Qo‘qon shahrining to‘pga tutilishi va bosib olinishi',
        effect: 'Muxtoriyat qulatildi; bunga javoban butun Turkistonda istiqlolchilik (bosmachilik) harakati boshlandi',
      },
    ],
    keyFigures: ['Mustafo Cho‘qay', 'Muhammadjon Tinishboyev', 'Mahmudxo‘ja Behbudiy', 'Ubaydullaxo‘ja Asadullaxo‘jayev'],
    keyDates: [
      { date: '1917-yil fevral', event: 'Rossiyada monarxiyaning ag‘darilishi' },
      { date: '1917-yil 27-noyabr', event: 'Turkiston Muxtoriyatining e’lon qilinishi' },
      { date: '1918-yil 18–22-fevral', event: 'Qo‘qon qirg‘ini va Turkiston Muxtoriyatining qulatilishi' },
    ],
    keyTerms: [
      { term: 'Turkiston Muxtoriyati', definition: '1917-yil Qo‘qonda tashkil etilgan ilk demokratik milliy respublika.' },
      { term: 'Doshnoqlar', definition: 'Bolsheviklar tomonida turib Qo‘qon aholisini qirg‘in qilgan jangarilar to‘dasi.' },
    ],
    miniQuiz: [
      {
        question: '1917-yil 27-noyabrda qaysi shaharda Turkiston Muxtoriyati e’lon qilingan?',
        options: ['Toshkent', 'Samarqand', 'Qo‘qon', 'Buxoro'],
        answer: 2,
        explanation: 'IV Favqulodda Umumturkiston qurultoyi Qo‘qon shahrida bo‘lib o‘tgan va Muxtoriyatni e’lon qilgan.',
      },
    ],
  },
  {
    id: 'uzbekistan-soviet-ww2',
    title: 'O‘zbekiston Ikkinchi jahon urushida va qatag‘on fojialari',
    period: '1937 — 1945-yillar',
    section: 'uzbekistan',
    summary: '1937–38-yillardagi "Katta qirg‘in" qatag‘onlari hamda xalqimizning II Jahon urushidagi buyuk qahramonligi.',
    accent: 'from-zinc-700 to-red-950',
    status: 'available',
    source: 'O‘zbekiston xalqining Ikkinchi jahon urushidagi g‘alabaga qo‘shgan hissasi kitobi',
    sourceUrl: 'https://ziyonet.uz/',
    verificationStatus: 'verified',
    image: '/images/history/ww2.svg',
    imageCaption: '1939–1945: Antifashistik g‘alaba va jangchilar qahramonligi',
    overview: '1930-yillarda sovet mustabid tuzumi o‘zbek ziyolilarini qatag‘on qildi (Fitrat, Cho‘lpon, Qodiriy qatl etildi). 1941–1945-yillardagi Ikkinchi jahon urushida esa O‘zbekiston 1.9 milliondan ortiq farzandini frontga jo‘natdi, 1.5 milliondan ortiq evakuatsiya qilingan insonlar va bolalarni bag‘riga oldi.',
    detailedSections: [
      {
        title: '1. 1937–1938-yillar: Qatag‘on va milliy ziyolilar qirg‘ini',
        content: 'Stalin boshchiligidagi tuzum "xalq dushmani" tamg‘asi ostida Abdulla Qodiriy, Abdulhamid Cho‘lpon, Abdurauf Fitrat kabi yuzlab jadidlar va arboblarni otuvga hukm qildi.',
      },
      {
        title: '2. O‘zbekistonlik jangchilarning frontdagi mardligi',
        content: 'O‘zbekistondan 1 million 951 ming kishi urushga safarbar qilindi. Ulardan 538 mingdan ziyodi halok bo‘ldi. General Sobir Rahimov, Ahmadjon Shukurov kabi yuzlab qahramonlar shon-sharaf qozondi.',
      },
      {
        title: '3. Front ortidagi bag‘rikenglik',
        content: 'Respublika qisqa muddatda harbiy sanoat bazasiga aylandi. Shoahmad Shomahmudovlar oilasi 14 nafar turli millatga mansub yetim bolalarni o‘z tarbiyasiga olib, butun dunyoga o‘zbek xalqining bag‘rikengligini namoyish etdi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Fashistik Germaniyaning tajovuzkorona bostirib kirishi',
        event: 'O‘zbekiston xalqining frontda va front ortida umumiy kurashga kirishi',
        effect: 'Fashizm tor-mor etildi, 338 nafar o‘zbekistonlik Qahramon unvoniga sazovor bo‘ldi',
      },
    ],
    keyFigures: ['General Sobir Rahimov', 'Abdulla Qodiriy', 'Cho‘lpon', 'Fitrat', 'Shoahmad Shomahmudov'],
    keyDates: [
      { date: '1937–1938-yillar', event: 'O‘zbekistonda ommaviy "Katta qatag‘on" fojiasi' },
      { date: '1941-yil 22-iyun', event: 'Urushning boshlanishi va safarbarlik' },
      { date: '1945-yil 9-may', event: 'Fashizm ustidan qozonilgan g‘alaba kuni' },
    ],
    keyTerms: [
      { term: 'Qatag‘on', definition: 'Mustabid davlat tomonidan o‘z fuqarolari va ziyolilariga qarshi uyushtirilgan siyosiy jazo.' },
      { term: 'Evakuatsiya', definition: 'Urush hududidan aholi, korxona va bolalarni tinch mintaqalarga ko‘chirish.' },
    ],
    miniQuiz: [
      {
        question: 'Ikkinchi jahon urushida jasorat ko‘rsatib "Temir general" nomini olgan o‘zbek generali kim?',
        options: ['Sobir Rahimov', 'To‘lagan Qosimov', 'Fayzulla Xo‘jayev', 'Sulton Jo‘ra'],
        answer: 0,
        explanation: 'General-mayor Sobir Rahimov o‘zining jasorati va harbiy mahorati bilan "Temir general" deb atalgan.',
      },
    ],
  },
  {
    id: 'uzbekistan-modern',
    title: 'SSSRning qulashi va Mustaqil O‘zbekistonning qayta tiklanishi',
    period: '1991-yildan hozirgacha',
    section: 'uzbekistan',
    summary: 'Sovet imperiyasining qulashi, 1991-yil 31-avgust mustaqillik bayonoti, davlat ramzlari va Bosh qomus.',
    accent: 'from-emerald-600 to-teal-800',
    status: 'available',
    source: 'O‘zbekiston Respublikasi Qonunchilik ma’lumotlari milliy bazasi (Lex.uz)',
    sourceUrl: 'https://lex.uz/',
    verificationStatus: 'verified',
    image: '/images/history/ussr-fall-independence.svg',
    imageCaption: '1991-yil: Mustaqillik monumenti va suveren O‘zbekiston davlati',
    overview: '1991-yilda iqtisodiy va siyosiy inqiroz tufayli SSSR (Sovet Ittifoqi) parchalanib quladi. 1991-yil 31-avgustda O‘zbekiston Respublikasi o‘z davlat mustaqilligini e’lon qildi va jahon xaritasida suveren davlat sifatida qayta tiklandi.',
    detailedSections: [
      {
        title: '1. SSSRning inqirozi va qulashi (1985–1991)',
        content: 'Iqtisodiy tanglik, soxta "paxta ishi" tazyiqlari va markazning mustabid siyosati sovet tuzumini halokatga olib keldi. 1991-yil dekabrda Belovejsk bitimi bilan SSSR rasman tugatildi.',
      },
      {
        title: '2. Mustaqillikning e’lon qilinishi va davlat ramzlari',
        content: '1991-yil 31-avgustda Oliy Kengashda O‘zbekiston mustaqilligi e’lon qilindi. 1991-yil 18-noyabrda Davlat bayrog‘i, 1992-yil 2-iyulda Davlat gerbi, 1992-yil 10-dekabrda Davlat madhiyasi qabul qilindi.',
      },
      {
        title: '3. Konstitutsiya va BMTga a’zo bo‘lish',
        content: '1992-yil 2-martda O‘zbekiston BMT a’zosi bo‘ldi. 1992-yil 8-dekabrda qabul qilingan Konstitutsiya inson huquqlari va qonun ustuvorligining oliy kafolati bo‘lib xizmat qila boshladi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Sovet totalitar tizimining iqtisodiy-siyosiy halokati va milliy ozodlik talabi',
        event: '1991-yil 31-avgustda Mustaqillik deklaratsiyasining qabul qilinishi',
        effect: 'O‘zbekiston xalqaro huquqning teng huquqli a’zosiga aylandi',
      },
    ],
    keyFigures: ['Mustaqillik asoschilari', 'O‘zbekiston xalqi'],
    keyDates: [
      { date: '1991-yil 31-avgust', event: 'O‘zbekiston davlat mustaqilligining e’lon qilinishi' },
      { date: '1991-yil 18-noyabr', event: 'Davlat bayrog‘ining qabul qilinishi' },
      { date: '1992-yil 2-mart', event: 'O‘zbekistonning BMT a’zoligiga qabul qilinishi' },
      { date: '1992-yil 8-dekabr', event: 'O‘zbekiston Respublikasi Konstitutsiyasining qabul qilinishi' },
    ],
    keyTerms: [
      { term: 'Suverenitet', definition: 'Davlatning o‘z ichki va tashqi siyosatida to‘la erkinligi va mustaqilligi.' },
      { term: 'Konstitutsiya', definition: 'Davlatning oliy yuridik kuchga ega Bosh qonuni.' },
    ],
    miniQuiz: [
      {
        question: 'O‘zbekiston Respublikasi qachon BMTga to‘la huquqli a’zo bo‘ldi?',
        options: ['1991-yil 31-avgust', '1992-yil 2-mart', '1992-yil 8-dekabr', '1993-yil 1-yanvar'],
        answer: 1,
        explanation: '1992-yil 2-martda BMT Bosh Assambleyasi qarori bilan O‘zbekiston BMT a’zoligiga qabul qilingan.',
      },
    ],
  },

  // --- JAHON TARIXI ---
  {
    id: 'world-ancient',
    title: 'Qadimgi Sharq sivilizatsiyalari va Ilk Qonunlar',
    period: 'Mil. avv. IV — I mingyillik',
    section: 'world',
    summary: 'Misr piramidalari, Shumer mixxati, Bobil podsholigi va Hammurapi qonunlar to‘plami.',
    accent: 'from-amber-600 to-yellow-800',
    status: 'available',
    source: 'Britannica ensiklopediyasi & Qadimgi dunyo tarixi',
    sourceUrl: 'https://www.britannica.com/',
    verificationStatus: 'verified',
    overview: 'Nil, Dajla va Frot daryolari havzasida insoniyatning ilk davlatlari va yozuvi shakllandi. Bobil shohi Hammurapi tomonidan yaratilgan 282 moddali qonunlar to‘plami davlat boshqaruvi va huquqiy tartibotning tamal toshini qo‘ydi.',
    detailedSections: [
      {
        title: '1. Qadimgi Misr va daryo sivilizatsiyasi',
        content: 'Nil daryosining yillik toshqinlari Misrda yuksak sug‘orma dehqonchilik va piramidalar me’morchiligini vujudga keltirdi. Iyeroglif yozuvi va tibbiy bilimlar rivojlandi.',
      },
      {
        title: '2. Shumerlar va mixxat yozuvi',
        content: 'Mesopotamiyada shumerlar g‘ildirakni, kulolchilik charxini va ilk mixxat (klinopis) yozuvini ixtiro qildilar.',
      },
      {
        title: '3. Hammurapi qonunlari (Mil. avv. XVIII asr)',
        content: 'Bobil podshosi Hammurapi qora bazalt toshga 282 moddadan iborat qonunlarni o‘yib yozdirdi. Unda mulk huquqi, savdo, oila va jazo qoidalari aks etgan.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Ijtimoiy tabaqalanish va mulkiy munosabatlarning murakkablashuvi',
        event: 'Hammurapi qonunlarining qabul qilinishi',
        effect: 'Insoniyat tarixidagi ilk yozma huquqiy tizim shakllandi',
      },
    ],
    keyFigures: ['Hammurapi', 'Ramses II', 'Exnaton'],
    keyDates: [
      { date: 'Mil. avv. IV mingyillik', event: 'Misr va Mesopotamiyada ilk davlatlarning paydo bo‘lishi' },
      { date: 'Mil. avv. XVIII asr', event: 'Bobilda Hammurapi qonunlarining yaratilishi' },
    ],
    keyTerms: [
      { term: 'Mixxat', definition: 'Loy taxtachalarga yozilgan shumerlarning ilk yozuv turi.' },
      { term: 'Hammurapi kodeksi', definition: 'Tosh ustunga o‘yilgan eng qadimgi yaxlit qonunlar to‘plami.' },
    ],
    miniQuiz: [
      {
        question: 'Tarixdagi eng mashhur toshga o‘yilgan ilk qonunlar to‘plami qaysi shohga tegishli?',
        options: ['Yuliy Sezar', 'Hammurapi', 'Kir II', 'Aleksandr'],
        answer: 1,
        explanation: 'Bobil podshosi Hammurapi mil. avv. XVIII asrda 282 moddali qonunlar to‘plamini yaratgan.',
      },
    ],
  },
  {
    id: 'world-rome-fall',
    title: 'Rim imperiyasi va uning qulashi',
    period: 'Mil. avv. 509 — milodiy 476-yil',
    section: 'world',
    summary: 'Rim Respublikasidan Imperiyagacha, ichki ijtimoiy inqiroz va 476-yilda G‘arbiy Rim imperiyasining qulashi.',
    accent: 'from-stone-700 to-red-900',
    status: 'available',
    source: 'Britannica ensiklopediyasi (Fall of Rome)',
    sourceUrl: 'https://www.britannica.com/',
    verificationStatus: 'verified',
    image: '/images/history/rome-fall.svg',
    imageCaption: 'Milodiy 476-yil: Rim kolizeyi va buyuk imperiyaning qulashi',
    overview: 'Rim kichik polisdan uch qit’ani birlashtirgan qudratli imperiyaga aylandi. Biroq qullik tuzumining inqirozi, iqtisodiy tanazzul va Buyuk xalqlar ko‘chishi oqibatida 476-yilda G‘arbiy Rim imperiyasi butunlay quladi va antik dunyo davri yakunlandi.',
    detailedSections: [
      {
        title: '1. Rim Respublikasi va Senat boshqaruvi',
        content: 'Mil. avv. 509-yilda Rimda shohlar haydalib, respublika e’lon qilindi. Senat va konsullar orqali O‘rta Yer dengizida Rim hukmronligi o‘rnatildi.',
      },
      {
        title: '2. Sezar, Avgust va Imperiyaning oltin davri',
        content: 'Fuqarolar urushlaridan so‘ng Yuliy Sezar va Oktavian Avgust davrida respublika o‘rniga Rim imperiyasi qaror topdi.',
      },
      {
        title: '3. Qulash sabablari va 476-yil fojiasi',
        content: 'Qullarning mehnatga qiziqmasligi, soliqlar og‘irligi va Buyuk xalqlar ko‘chishi (vestgotlar, vandallar, gunnlar) Rimni holdan toydirdi. 476-yilda sarkarda Odoakr Rimning so‘nggi imperatori Romul Avgustulni taxtdan ag‘dardi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Quldorlik inqirozi, imperiyaning bo‘linishi va vahshiylar qabilalarining hujumlari',
        event: '476-yilda Odoakrning so‘nggi imperator Romul Avgustulni ag‘darishi',
        effect: 'G‘arbiy Rim imperiyasi quladi; Qadimgi dunyo tugab, O‘rta asrlar davri boshlandi',
      },
    ],
    keyFigures: ['Yuliy Sezar', 'Oktavian Avgust', 'Odoakr', 'Romul Avgustul'],
    keyDates: [
      { date: 'Mil. avv. 509-yil', event: 'Rim Respublikasining o‘rnatilishi' },
      { date: 'Mil. avv. 27-yil', event: 'Rim imperiyasining shakllanishi' },
      { date: 'Milodiy 476-yil', event: 'G‘arbiy Rim imperiyasining qulashi' },
    ],
    keyTerms: [
      { term: 'Senat', definition: 'Qadimgi Rimda oqsoqollar va zodagonlarning oliy davlat organi.' },
      { term: 'Buyuk xalqlar ko‘chishi', definition: 'IV–VII asrlarda xalqlarning Yevropaga ommaviy ko‘chishi va Rim chegaralarini buzib kirishi.' },
    ],
    miniQuiz: [
      {
        question: 'G‘arbiy Rim imperiyasi qaysi yili rasman qulagan?',
        options: ['Mil. avv. 27-yil', 'Milodiy 395-yil', 'Milodiy 476-yil', 'Milodiy 1453-yil'],
        answer: 2,
        explanation: 'Milodiy 476-yilda so‘nggi Rim imperatori taxtdan qulatilib, imperiya qulagan.',
      },
    ],
  },
  {
    id: 'world-french-revolution',
    title: 'Buyuk Fransuz inqilobi va Sanoat to‘ntarishi',
    period: '1789 — 1815-yillar',
    section: 'world',
    summary: 'Bastiliyaning olinishi, monarxiyaning ag‘darilishi, Inson va fuqaro huquqlari deklaratsiyasi hamda Sanoat inqilobi.',
    accent: 'from-blue-700 to-rose-700',
    status: 'available',
    source: 'Britannica ensiklopediyasi (French Revolution)',
    sourceUrl: 'https://www.britannica.com/',
    verificationStatus: 'verified',
    image: '/images/history/french-revolution.svg',
    imageCaption: '1789: Bastiliya qal’asi va Ozodlik mash’ali',
    overview: '1789-yilda Fransiyada asriy feodal monarxiyani ag‘dargan buyuk inqilob yuz berdi. "Ozodlik, Tenglik, Birodarlik" shiori ostida Inson va fuqaro huquqlari deklaratsiyasi qabul qilindi. Ayni shu davrda Angliyada boshlangan Sanoat to‘ntarishi esa insoniyatni mashinalashgan davrga olib kirdi.',
    detailedSections: [
      {
        title: '1. Inqilob sabablari va Bastiliyaning olinishi (1789-yil 14-iyul)',
        content: 'Qirol Lyudovik XVI ning mutlaq hukmronligi, uchinchi tabaqa (xalq)ning og‘ir soliqlari xalq qo‘zg‘oloniga sabab bo‘ldi. 1789-yil 14-iyulda zulm ramzi bo‘lgan Bastiliya qal’asi zabt etildi.',
      },
      {
        title: '2. Inson va fuqaro huquqlari deklaratsiyasi',
        content: '1789-yil avgustda qabul qilingan Deklaratsiyada "Barcha insonlar tug‘ilishidan erkin va teng huquqlidirlar" degan tarixiy tamoyil e’lon qilindi.',
      },
      {
        title: '3. Napoleon Bonapart davri va Sanoat inqilobi',
        content: 'Inqilob to‘lqinida hokimiyatga kelgan Napoleon Bonapart Yevropa bo‘ylab feodal tartiblarni yo‘qotishga hissa qo‘shdi. Jeyms Uatt tomonidan bug‘ dvigatelining ixtiro qilinishi esa sanoat inqilobining boshlanishiga turtki bo‘ldi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Mutlaq monarxiya zulmi va xalqning huquqsizligi',
        event: '1789-yilgi Buyuk Fransuz inqilobi',
        effect: 'Feodal monarxiya ag‘darildi, inson huquqlari va respublika tuzumi Yevropada qaror topdi',
      },
    ],
    keyFigures: ['Lyudovik XVI', 'Maksimilian Robespyer', 'Napoleon Bonapart', 'Jeyms Uatt'],
    keyDates: [
      { date: '1789-yil 14-iyul', event: 'Bastiliya qal’asining olinishi va inqilob boshlanishi' },
      { date: '1789-yil 26-avgust', event: 'Inson va fuqaro huquqlari deklaratsiyasining qabul qilinishi' },
      { date: '1804-yil', event: 'Napoleon fuqarolik kodeksining joriy etilishi' },
    ],
    keyTerms: [
      { term: 'Bastiliya', definition: 'Parijdagi qirollik qamoqxonasi; mutlaq hokimiyat zulmining ramzi.' },
      { term: 'Sanoat inqilobi', definition: 'Qo‘l mehnatidan yirik mashinalashgan zavod-fabrika ishlab chiqarishiga o‘tish.' },
    ],
    miniQuiz: [
      {
        question: 'Buyuk Fransuz inqilobining bosh ramzi hisoblangan voqea qaysi?',
        options: ['Napoleon toj kiyishi', '1789-yil 14-iyulda Bastiliya qal’asining olinishi', 'Vaterloo jangi', 'BMT tuzilishi'],
        answer: 1,
        explanation: '1789-yil 14-iyulda xalq Bastiliya qal’asini ishg‘ol qilgan va bu kun Fransiyada milliy bayram hisoblanadi.',
      },
    ],
  },
  {
    id: 'world-ww1-empires-fall',
    title: 'Birinchi jahon urushi va To‘rt imperiyaning qulashi',
    period: '1914 — 1918-yillar',
    section: 'world',
    summary: 'Sarayevo suiqasdi, Antanta va Uchlar ittifoqi, yangi qirg‘in qurollari hamda 4 ta ulkan imperiyaning barbod bo‘lishi.',
    accent: 'from-slate-700 to-zinc-950',
    status: 'available',
    source: 'Britannica & Jahon tarixi o‘quv adabiyotlari',
    sourceUrl: 'https://www.britannica.com/',
    verificationStatus: 'verified',
    image: '/images/history/ww1.svg',
    imageCaption: '1914–1918: Xandaqlar urushi, tanklar va to‘rt imperiyaning qulashi',
    overview: '1914–1918-yillardagi Birinchi jahon urushi dunyoni qayta taqsimlash uchun olib borilgan ilk global to‘qnashuv bo‘ldi. Urush natijasida qit’adagi to‘rtta eng qudratli monarxiya — Rossiya, Usmonli, Avstriya-Vengriya va Germaniya imperiyalari butunlay quladi.',
    detailedSections: [
      {
        title: '1. Urush sabablari va Sarayevo hodisasi (1914)',
        content: 'Yevropaning yirik davlatlari ikki blokka — Antanta (Angliya, Fransiya, Rossiya) va Uchlar ittifoqi (Germaniya, Avstriya-Vengriya, Italiya)ga bo‘lindi. 1914-yil 28-iyunda Sarayevoda Avstriya taxt vorisi Frans Ferdinandning o‘ldirilishi urushga bahona bo‘ldi.',
      },
      {
        title: '2. Urush xarakteri: Tanklar, aviatsiya va kimyoviy qurol',
        content: 'Tarixda ilk bor zaharli gazlar (Ipr jangi), tanklar, suvosti kemalari va harbiy aviatsiya ommaviy ishlatildi. Xandaq urushi millionlab odamlarning yostig‘ini quritdi.',
      },
      {
        title: '3. To‘rt imperiyaning qulashi (1917–1918)',
        content: 'Urush mashaqqatlari inqiloblarni keltirib chiqardi. 1917-yilda Rossiya imperiyasi, 1918-yilda Avstriya-Vengriya va Germaniya imperiyalari, ko‘p o‘tmay Usmonli imperiyasi quladi va ularning o‘rnida yangi respublikalar tuzildi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Mustamlakalar va jahon bozorlarini qayta bo‘lib olish kurashi',
        event: 'Birinchi jahon urushi va 20 milliondan ortiq qurbonlar',
        effect: 'Rossiya, Usmonli, Germaniya va Avstriya-Vengriya imperiyalari quladi; Millatlar Ligasi tuzildi',
      },
    ],
    keyFigures: ['Frans Ferdinand', 'Kayzer Vilgelm II', 'Vudro Vilson', 'Nikolay II'],
    keyDates: [
      { date: '1914-yil 28-iyun', event: 'Sarayevo suiqasdi' },
      { date: '1914-yil 28-iyul', event: 'Birinchi jahon urushining boshlanishi' },
      { date: '1918-yil 11-noyabr', event: 'Kompenn sulhi va urushning yakunlanishi' },
      { date: '1919-yil', event: 'Versal tinchlik shartnomasi' },
    ],
    keyTerms: [
      { term: 'Antanta', definition: 'Buyuk Britaniya, Fransiya va Rossiya harbiy-siyosiy ittifoqi.' },
      { term: 'Millatlar Ligasi', definition: 'Urushdan so‘ng xalqaro tinchlikni saqlash uchun 1919-yilda tuzilgan ilk tashkilot.' },
    ],
    miniQuiz: [
      {
        question: 'Birinchi jahon urushi natijasida qaysi to‘rtta ulkan imperiya qulagan?',
        options: [
          'Britaniya, Fransiya, AQSh, Yaponiya',
          'Rossiya, Germaniya, Avstriya-Vengriya, Usmonli',
          'Xitoy, Hindiston, Fors, Misr',
          'Ispaniya, Portugaliya, Shvetsiya, Rim',
        ],
        answer: 1,
        explanation: 'Urush oqibatida Rossiya, Germaniya, Avstriya-Vengriya va Usmonli imperiyalari parchalanib ketgan.',
      },
    ],
  },
  {
    id: 'world-ww2',
    title: 'Ikkinchi jahon urushi va fashizm ustidan g‘alaba',
    period: '1939 — 1945-yillar',
    section: 'world',
    summary: 'Tarixdagi eng dahshatli qonli to‘qnashuv, antifashistik koalitsiya g‘alabasi va BMTning tashkil topishi.',
    accent: 'from-red-700 via-zinc-900 to-black',
    status: 'available',
    source: 'BMT tarixi & Britannica (World War II)',
    sourceUrl: 'https://www.un.org/about-us/history-of-the-un',
    verificationStatus: 'verified',
    image: '/images/history/ww2.svg',
    imageCaption: '1939–1945: Qahramonlik, fashizmning tor-mor etilishi va BMT',
    overview: 'Ikkinchi jahon urushi insoniyat tarixidagi eng yirik va eng qonli fojea bo‘lib, 61 davlatni qamrab oldi va 60–70 million kishining umriga zomin bo‘ldi. Fashizm va natsizm ustidan qozonilgan g‘alaba zamonaviy xalqaro xavfsizlik va BMT tizimini yaratdi.',
    detailedSections: [
      {
        title: '1. Urushning boshlanishi va fashizm agressiyasi (1939)',
        content: '1939-yil 1-sentabrda fashistik Germaniyaning Polshaga bostirib kirishi bilan urush boshlandi. Gitler qo‘shinlari Yevropaning katta qismini ishg‘ol qildi.',
      },
      {
        title: '2. Burilish janglari: Moskva, Stalingrad va Kursk',
        content: '1941–1943-yillarda Moskva ostonasidagi mudofaa, Stalingrad qamali va Kursk jangidagi g‘alaba urush taqdirini hal qildi. 1944-yilda Normandiyada ikkinchi front ochildi.',
      },
      {
        title: '3. Fashizmning tor-mor etilishi va BMTning tashkil etilishi',
        content: '1945-yil mayda Berlin olinib, Germaniya so‘zsiz taslim bo‘ldi. 1945-yil avgustda Xirosima va Nagasakiga atom bombasi tashlangach, Yaponiya ham taslim bo‘ldi. 1945-yil 24-oktabrda BMT Ustavi kuchga kirdi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Gitler natsizmi va fashistik blokning dunyoni bosib olish tajovuzi',
        event: 'Antifashistik koalitsiyaning jipslashuvi va g‘alabasi',
        effect: 'Fashizm yo‘q qilindi; 1945-yilda BMT tuzilib, xalqaro huquq ustuvorligi o‘rnatildi',
      },
    ],
    keyFigures: ['Franklin Ruzvelt', 'Uinston Cherchill', 'Iosif Stalin', 'General Eyzenxauer'],
    keyDates: [
      { date: '1939-yil 1-sentabr', event: 'Ikkinchi jahon urushining boshlanishi' },
      { date: '1942–1943-yillar', event: 'Stalingrad jangi va tub burilish' },
      { date: '1945-yil 9-may', event: 'Germaniyaning so‘zsiz taslim bo‘lishi' },
      { date: '1945-yil 2-sentabr', event: 'Yaponiyaning taslim bo‘lishi va urushning to‘liq yakunlanishi' },
      { date: '1945-yil 24-oktabr', event: 'Birlashgan Millatlar Tashkilotining tashkil topishi' },
    ],
    keyTerms: [
      { term: 'Fashizm va Natsizm', definition: 'Irqiy ayirmachilik, bosqinchilik va insoniyatga qarshi tajovuzkor mafkura.' },
      { term: 'Antifashistik koalitsiya', definition: 'AQSh, Buyuk Britaniya, SSSR va boshqa ozodliksevar davlatlar ittifoqi.' },
    ],
    miniQuiz: [
      {
        question: 'Ikkinchi jahon urushi qaysi sanada boshlangan?',
        options: ['1914-yil 28-iyul', '1939-yil 1-sentabr', '1941-yil 22-iyun', '1945-yil 9-may'],
        answer: 1,
        explanation: '1939-yil 1-sentabrda Germaniyaning Polshaga hujumi bilan Ikkinchi jahon urushi boshlangan.',
      },
    ],
  },
  {
    id: 'world-cold-war-ussr-fall',
    title: 'Sovuq urush, BMT va SSSRning qulashi',
    period: '1945 — 1991-yillar',
    section: 'world',
    summary: 'Ikki qutbli dunyo, yadroviy poyga, Berlin devorining qulashi va 1991-yil SSSRning parchalanishi.',
    accent: 'from-cyan-900 via-slate-900 to-blue-950',
    status: 'available',
    source: 'BMT xalqaro huquq arxivi & Britannica',
    sourceUrl: 'https://www.un.org/',
    verificationStatus: 'verified',
    image: '/images/history/ussr-fall-independence.svg',
    imageCaption: '1991: Sovuq urushning yakunlanishi va yangi mustaqil davlatlar',
    overview: 'Ikkinchi jahon urushidan so‘ng dunyo AQSh va SSSR boshchiligidagi ikki qutbga bo‘lindi. Yadroviy qurollanish poygasi va mafkuraviy qarama-qarshilik "Sovuq urush" deb nomlandi. 1989-yilda Berlin devori quladi, 1991-yilda esa SSSRning tarqalib ketishi bilan ikki qutbli dunyo barham topdi.',
    detailedSections: [
      {
        title: '1. Ikki qutbli dunyo va "Sovuq urush"',
        content: 'AQSh yetakchiligidagi NATO va SSSR boshchiligidagi Varshava shartnomasi tashkiloti yadro qurollari poygasini boshladi. Karib inqirozi (1962) dunyoni yadro urushi yoqasiga keltirib qo‘ydi.',
      },
      {
        title: '2. Berlin devorining qulashi (1989)',
        content: 'Sharqiy va G‘arbiy Germaniyani ajratib turgan Berlin devorining tinch yo‘l bilan buzib tashlanishi sotsialistik blokning parchalanish boshlanishi bo‘ldi.',
      },
      {
        title: '3. 1991-yil: SSSRning qulashi va Yangi dunyo tartibi',
        content: 'Iqtisodiy turg‘unlik va mustabid tizim inqirozi tufayli 1991-yil 8-dekabrda Belovejsk o‘rmonida SSSR rasman tugatildi. 15 ta yangi mustaqil davlat, jumladan O‘zbekiston vujudga keldi.',
      },
    ],
    causeAndEffect: [
      {
        cause: 'Sovet iqtisodiy modelining samarasizligi va millatlarning ozodlik intilishi',
        event: '1991-yilda SSSRning butunlay qulashi va parchalanishi',
        effect: 'Sovuq urush tugadi, 15 ta suveren respublika o‘z mustaqilligini e’lon qildi',
      },
    ],
    keyFigures: ['Mixail Gorbachyov', 'Ronald Reygan', 'Jon Kennedi', 'BMT Bosh kotiblari'],
    keyDates: [
      { date: '1949-yil', event: 'NATO harbiy blokining tuzilishi' },
      { date: '1962-yil', event: 'Karib inqirozi' },
      { date: '1989-yil 9-noyabr', event: 'Berlin devorining qulashi' },
      { date: '1991-yil 26-dekabr', event: 'SSSRning rasman qulashi va tugatilishi' },
    ],
    keyTerms: [
      { term: 'Sovuq urush', definition: 'AQSh va SSSR o‘rtasidagi to‘g‘ridan-to‘g‘ri qurolli to‘qnashuvsiz global qarama-qarshilik.' },
      { term: 'Berlin devori', definition: 'Sovuq urush va dunyoning ikki mafkuraga bo‘linganligining asosiy ramzi.' },
    ],
    miniQuiz: [
      {
        question: 'Berlin devori qaysi yili qulagan?',
        options: ['1945-yil', '1962-yil', '1989-yil', '1991-yil'],
        answer: 2,
        explanation: '1989-yil 9-noyabrda Berlin devori buzib tashlangan va Germaniya birlashgan.',
      },
    ],
  },
];

export { people } from './peopleData';
export { dates } from './datesData';

export const comparisons: ComparisonItem[] = [
  {
    id: 'ww1-ww2',
    title: 'Birinchi va Ikkinchi jahon urushlari',
    category: 'Urushlar tarixi',
    leftTitle: 'Birinchi jahon urushi (1914–1918)',
    rightTitle: 'Ikkinchi jahon urushi (1939–1945)',
    source: 'Britannica & BMT xalqaro huquq manbalari',
    sourceUrl: 'https://www.un.org/about-us/history-of-the-un',
    rows: [
      ['Boshlanish sababi', 'Mustamlakalar va dunyoni qayta taqsimlash kurashi', 'Fashizm va natsizmning agressiv dunyoni bosib olish g‘oyalari'],
      ['Ishtirokchilar ko‘lami', '38 ta davlat, asosan Yevropa qit’asida', '61 ta davlat, barcha qit’alar va okeanlarda'],
      ['Qurbonlar soni', 'Taxminan 20 million kishi', 'Taxminan 60–70 million kishi'],
      ['Yiqilgan imperiyalar', 'Rossiya, Usmonli, Avstriya-Vengriya, Germaniya', 'Fashistik Germaniya va Yaponiya militarizmi yo‘q qilindi'],
      ['Xalqaro tashkilot', 'Millatlar Ligasi (1919-yil)', 'Birlashgan Millatlar Tashkiloti (BMT, 1945-yil)'],
    ],
  },
  {
    id: 'revolutions-compare',
    title: 'Fransuz inqilobi (1789) va Rossiya inqiloblari (1917)',
    category: 'Inqiloblar va davlatlar qulashi',
    leftTitle: 'Buyuk Fransuz inqilobi (1789)',
    rightTitle: 'Rossiyadagi inqiloblar (1917)',
    source: 'Jahon tarixi ilmiy nashrlari',
    sourceUrl: 'https://www.britannica.com/',
    rows: [
      ['Ag‘darilgan tuzum', 'Lyudovik XVI ning mutlaq feodal monarxiyasi', 'Nikolay II ning podsholik samoderjaviye monarxiyasi'],
      ['Asosiy shiorlar', '«Ozodlik, Tenglik, Birodarlik»', '«Barcha hokimiyat sovetlarga!», «Zavodlar ishchilarga, yer dehqonlarga!»'],
      ['Inson huquqlari hujjati', 'Inson va fuqaro huquqlari deklaratsiyasi (1789)', 'Mehnatkash va ekspluatatsiya qilinuvchi xalq huquqlari deklaratsiyasi'],
      ['Tarixiy oqibati', 'Yevropada feodalizmga zarba berildi, fuqarolik jamiyati shakllandi', 'Sovet sotsialistik imperiyasi va totalitar tuzum qaror topdi'],
    ],
  },
  {
    id: 'empires-fall-compare',
    title: 'Rim imperiyasining qulashi va SSSRning qulashi',
    category: 'Davlatlar inqirozi va qulashi',
    leftTitle: 'G‘arbiy Rim imperiyasining qulashi (476-yil)',
    rightTitle: 'Sovet Ittifoqining (SSSR) qulashi (1991-yil)',
    source: 'Tarixiy tadqiqotlar & Britannica',
    sourceUrl: 'https://www.britannica.com/',
    rows: [
      ['Inqirozning asosiy sababi', 'Quldorlik inqirozi, iqtisodiy parokandalik va tashqi bosqinlar', 'Rejali iqtisodiyot inqirozi, qurollanish poygasi va milliy erkinlik intilishi'],
      ['Qulashdagi so‘nggi voqea', '476-yilda Odoakrning Romul Avgustulni ag‘darishi', '1991-yil dekabrda Belovejsk bitimi imzolanishi'],
      ['Siyosiy natijasi', 'Yevropada mayda varvar qirolliklari va feodalizm shakllandi', '15 ta mustaqil suveren respublikalar (jumladan O‘zbekiston) vujudga keldi'],
      ['Madaniy va huquqiy merosi', 'Rim huquqi Yevropa qonunchiligiga asos bo‘ldi', 'Mustaqillik deklaratsiyalari va bozor iqtisodiyotiga o‘tish boshlandi'],
    ],
  },
  {
    id: 'bukhara-kokand',
    title: 'Buxoro amirligi va Qo‘qon xonligi',
    category: 'O‘zbek xonliklari',
    leftTitle: 'Buxoro amirligi (Mang‘itlar)',
    rightTitle: 'Qo‘qon xonligi (Minglar)',
    source: 'O‘zbekiston tarixi darsliklari',
    sourceUrl: 'https://ziyonet.uz/',
    rows: [
      ['Poytaxti', 'Buxoro shahri', 'Qo‘qon shahri'],
      ['Boshqaruv unvoni', 'Amir', 'Xon'],
      ['Bosib olinishi', '1868-yilda protektoratga aylandi, 1920-yilda ag‘darildi', '1876-yilda Chor Rossiyasi tomonidan butunlay bekor qilindi'],
    ],
  },
  {
    id: 'athens-sparta',
    title: 'Afina va Sparta',
    category: 'Qadimgi Yunoniston',
    leftTitle: 'Afina davlati',
    rightTitle: 'Sparta davlati',
    source: 'Jahon tarixi adabiyotlari',
    sourceUrl: 'https://www.britannica.com/',
    rows: [
      ['Boshqaruv', 'Demokratiya', 'Oligarxiya'],
      ['Iqtisodiyot', 'Dengiz savdosi va san’at', 'Quruqlik qo‘shini va harbiy intizom'],
    ],
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Temuriylar davri',
    category: 'Temuriylar',
    difficulty: 'Oson',
    question: 'Mirzo Ulug‘bek Samarqandda qaysi soha taraqqiyotida jahon miqyosida o‘chmas iz qoldirgan?',
    options: ['Astronomiya va matematika', 'Dengiz kemasozligi', 'Metall quyish', 'Rim huquqi'],
    answer: 0,
    explanation: 'Ulug‘bek Samarqandda rasadxona barpo etib, 1018 ta yulduz harakatini o‘z ichiga olgan "Zij" jadvalini yaratgan.',
    source: 'O‘zbekiston Milliy Ensiklopediyasi',
    sourceUrl: 'https://ziyonet.uz/',
  },
  {
    id: 'q2',
    topic: 'Birinchi jahon urushi',
    category: 'Urushlar va inqiloblar',
    difficulty: 'O‘rta',
    question: 'Birinchi jahon urushi (1914–1918) natijasida qaysi to‘rtta qudratli imperiya quladi?',
    options: [
      'Rossiya, Germaniya, Avstriya-Vengriya va Usmonli imperiyalari',
      'Britaniya, Fransiya, AQSh va Yaponiya',
      'Xitoy, Hindiston, Misr va Fors',
      'Ispaniya, Portugaliya, Shvetsiya va Niderlandiya',
    ],
    answer: 0,
    explanation: 'Urush natijasida Rossiya, Germaniya, Avstriya-Vengriya va Usmonli imperiyalari parchalanib ketdi.',
    source: 'Britannica ensiklopediyasi',
    sourceUrl: 'https://www.britannica.com/',
  },
  {
    id: 'q3',
    topic: 'Ikkinchi jahon urushi',
    category: 'Urushlar va inqiloblar',
    difficulty: 'Oson',
    question: 'Ikkinchi jahon urushi fashizm ustidan qozonilgan g‘alabadan so‘ng xalqaro tinchlikni ta’minlash uchun qaysi global tashkilot tuzildi?',
    options: ['Millatlar Ligasi', 'Birlashgan Millatlar Tashkiloti (BMT)', 'NATO', 'Varshava shartnomasi'],
    answer: 1,
    explanation: '1945-yil 24-oktabrda tinchlik va xavfsizlikni kafolatlovchi BMT Ustavi kuchga kirdi.',
    source: 'BMT rasmiy veb-sayti',
    sourceUrl: 'https://www.un.org/',
  },
  {
    id: 'q4',
    topic: 'Fransuz inqilobi',
    category: 'Urushlar va inqiloblar',
    difficulty: 'Oson',
    question: '1789-yil 14-iyulda Fransiyada qaysi mashhur qal’aning olinishi inqilobning boshlanish ramzi bo‘ldi?',
    options: ['Versal saroyi', 'Bastiliya qal’asi', 'Luvr qasri', 'Notr-Dam ibodatxonasi'],
    answer: 1,
    explanation: 'Bastiliya qal’asining xalq tomonidan ishg‘ol qilinishi mutlaq monarxiyaga qarshi inqilob timsoli bo‘ldi.',
    source: 'Britannica ensiklopediyasi',
    sourceUrl: 'https://www.britannica.com/',
  },
  {
    id: 'q5',
    topic: 'Davlatlar qulashi',
    category: 'Jahon tarixi',
    difficulty: 'O‘rta',
    question: 'Milodiy 476-yilda sarkarda Odoakr so‘nggi imperator Romul Avgustulni ag‘darishi bilan qaysi davlat qulagan?',
    options: ['Vizantiya imperiyasi', 'G‘arbiy Rim imperiyasi', 'Misr podsholigi', 'Bobil davlati'],
    answer: 1,
    explanation: '476-yilda G‘arbiy Rim imperiyasi butunlay qulagan va Antik davr yakunlangan.',
    source: 'Britannica ensiklopediyasi',
    sourceUrl: 'https://www.britannica.com/',
  },
  {
    id: 'q6',
    topic: 'Turkiston Muxtoriyati',
    category: 'O‘zbekiston tarixi',
    difficulty: 'O‘rta',
    question: '1917-yil 27-noyabrda Qo‘qonda tuzilgan va 1918-yil fevralda bolsheviklar tomonidan ag‘darilgan ilk demokratik respublika qaysi?',
    options: ['Turkiston general-gubernatorligi', 'Turkiston Muxtoriyati', 'Buxoro Xalq Sovet Respublikasi', 'Xorazm Xalq Sovet Respublikasi'],
    answer: 1,
    explanation: 'Mustafo Cho‘qay boshchiligidagi Turkiston Muxtoriyati Qo‘qon shahrida tuzilgan edi.',
    source: 'O‘zbekiston tarixi',
    sourceUrl: 'https://ziyonet.uz/',
  },
  {
    id: 'q7',
    topic: 'Xonliklarning qulashi',
    category: 'O‘zbekiston tarixi',
    difficulty: 'Oson',
    question: '1876-yilda Chor Rossiyasi tomonidan butunlay bekor qilingan o‘zbek davlati qaysi edi?',
    options: ['Xiva xonligi', 'Qo‘qon xonligi', 'Buxoro amirligi', 'Qarshi bekligi'],
    answer: 1,
    explanation: '1876-yil 19-fevralda Qo‘qon xonligi batamom bekor qilinib, Farg‘ona viloyati deb atalgan.',
    source: 'O‘zbekiston tarixi darsligi',
    sourceUrl: 'https://ziyonet.uz/',
  },
  {
    id: 'q8',
    topic: 'SSSRning qulashi',
    category: 'Yangi davr',
    difficulty: 'Oson',
    question: 'O‘zbekiston Respublikasining davlat mustaqilligi qaysi sanada e’lon qilingan?',
    options: ['1990-yil 20-iyun', '1991-yil 31-avgust', '1991-yil 8-dekabr', '1992-yil 2-mart'],
    answer: 1,
    explanation: 'Mustaqillik 1991-yil 31-avgustda e’lon qilingan va 1-sentabr Mustaqillik kuni etib belgilangan.',
    source: 'Lex.uz qonunchilik bazasi',
    sourceUrl: 'https://lex.uz/',
  },
  {
    id: 'q9',
    topic: 'Mo‘g‘ullar istilosi',
    category: 'O‘zbekiston tarixi',
    difficulty: 'Murakkab',
    question: 'Chingizxon qo‘shinlariga qarshi 1221-yilda Parvon dashtida qahramonona g‘alaba qozongan sarkarda kim?',
    options: ['Jaloliddin Manguberdi', 'Temur Malik', 'Mahmud Torobiy', 'Spitamen'],
    answer: 0,
    explanation: 'Jaloliddin Manguberdi Parvon jangida mo‘g‘ul qo‘shinlarini tor-mor keltirgan.',
    source: 'Nasaviy "Sulton Jaloliddin Manguberdi hayoti"',
    sourceUrl: 'https://ziyonet.uz/',
  },
  {
    id: 'q10',
    topic: 'Jadidchilik harakati',
    category: 'Yangi davr',
    difficulty: 'Oson',
    question: 'O‘zbek milliy dramaturgiyasining ilk namunasi bo‘lgan "Padarkush" pyesasining muallifi kim?',
    options: ['Mahmudxo‘ja Behbudiy', 'Munavvarqori Abdurashidxonov', 'Abdurauf Fitrat', 'Cho‘lpon'],
    answer: 0,
    explanation: 'Mahmudxo‘ja Behbudiy 1911-yilda "Padarkush" asarini yozgan.',
    source: 'O‘zbekiston Milliy Ensiklopediyasi',
    sourceUrl: 'https://ziyonet.uz/',
  },
];

export const sectionMeta: Record<Exclude<HistorySection, 'all'>, { title: string; description: string }> = {
  uzbekistan: {
    title: 'O‘zbekiston tarixi',
    description: 'Qadimgi davrdan boshlab, davlatlarning yuksalishi va inqirozi, Temuriylar Renessansi, inqiloblar va Mustaqillik tarixi.',
  },
  world: {
    title: 'Jahon tarixi',
    description: 'Qadimgi sivilizatsiyalar, Rim imperiyasining qulashi, Buyuk inqiloblar, I va II Jahon urushlari hamda global jarayonlar.',
  },
  people: {
    title: 'Tarixiy shaxslar',
    description: 'Tarix sahnasida o‘chmas iz qoldirgan sarkardalar, allomalar, inqilobchilar va ma’rifatparvarlar kutubxonasi.',
  },
  dates: {
    title: 'Sanalar va xronologiya',
    description: 'Urushlar, inqiloblar, davlatlar tuzilishi va qulashiga oid muhim sanalarni vaqt chizig‘ida ko‘ring.',
  },
  maps: {
    title: 'Tarixiy xaritalar',
    description: 'O‘zbekistonning qadimgi tarixiy-madaniy viloyatlari va Buyuk Ipak Yo‘li marshrutlari interaktiv xaritada.',
  },
  glossary: {
    title: 'Atamalar lug‘ati',
    description: 'Tarixiy atamalar, unvonlar, inqilobiy va harbiy tushunchalarning aniq ilmiy izohlari.',
  },
  certificate: {
    title: 'Milliy sertifikat',
    description: 'Tarix fanidan milliy sertifikat imtihoni tuzilishi, baholash mezonlari va amaliy mashqlar tizimi.',
  },
};
