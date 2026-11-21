import { LegalDocument, Part } from '@/types';
import { OFFICIAL_CODES_CATALOG } from './codesCatalog';

type OutlineArticle = [number, string];

interface OutlineChapter {
  id: string;
  number: number;
  title: string;
  articles: OutlineArticle[];
}

interface OutlinePart {
  id: string;
  title: string;
  chapters: OutlineChapter[];
}

/**
 * Creates a navigable, verified outline for codes whose complete text is kept
 * on Lex.uz. Article titles are useful for search and navigation; readers are
 * always sent to the official source for the current full wording.
 */
function createOfficialOutline(slug: string, outline: OutlinePart[]): LegalDocument {
  const catalogDocument = OFFICIAL_CODES_CATALOG.find((code) => code.slug === slug);

  if (!catalogDocument) {
    throw new Error(`Kodeks katalogda topilmadi: ${slug}`);
  }

  const parts: Part[] = outline.map((part) => ({
    ...part,
    chapters: part.chapters.map((chapter) => ({
      ...chapter,
      articles: chapter.articles.map(([number, articleTitle]) => ({
        id: `${number}-modda`,
        number,
        title: `${number}-modda. ${articleTitle}`,
        content:
          'Mazkur modda ko‘rsatilgan masalani tartibga soladi. Moddaning amaldagi to‘liq tahririni sahifadagi rasmiy Lex.uz manbasidan tekshiring.',
        notes: ['Qisqa indeks ma’lumoti. Huquqiy qo‘llashdan oldin Lex.uz dagi amaldagi tahrir bilan solishtiring.'],
      })),
    })),
  }));

  return { ...catalogDocument, parts };
}

export const DETAILED_LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  konstitutsiya: {
    ...OFFICIAL_CODES_CATALOG.find((c) => c.slug === 'konstitutsiya')!,
    parts: [
      {
        id: 'asosiy-prinsiplar',
        title: 'Birinchi bo‘lim. Asosiy prinsiplar',
        titleRu: 'Раздел первый. Основные принципы',
        chapters: [
          {
            id: '1-bob',
            number: 1,
            title: 'I bob. Davlat suvereniteti',
            titleRu: 'Глава I. Государственный суверенитет',
            articles: [
              {
                id: '1-modda',
                number: 1,
                title: '1-modda',
                titleRu: 'Статья 1',
                content: 'O‘zbekiston — boshqaruvning respublika shakliga ega bo‘lgan suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlat. Davlatning "O‘zbekiston Respublikasi" va "O‘zbekiston" degan nomlari bir ma’noni anglatadi.',
                contentRu: 'Узбекистан — суверенное, демократическое, правовое, социальное и светское государство с республиканской формой правления. Названия государства «Республика Узбекистан» и «Узбекистан» равнозначны.',
                parts: [
                  'O‘zbekiston — boshqaruvning respublika shakliga ega bo‘lgan suveren, demokratik, huquqiy, ijtimoiy va dunyoviy davlat.',
                  'Davlatning "O‘zbekiston Respublikasi" va "O‘zbekiston" degan nomlari bir ma’noni anglatadi.',
                ],
                notes: ['Ushbu modda 2023-yil 30-aprelda o‘tkazilgan referendumda qabul qilingan tahrirda berilgan.'],
              },
              {
                id: '2-modda',
                number: 2,
                title: '2-modda',
                titleRu: 'Статья 2',
                content: 'Davlat xalq irodasini ifoda etib, uning manfaatlariga xizmat qiladi. Davlat organlari va mansabdor shaxslar jamiyat va fuqarolar oldida mas’uldirlar.',
                contentRu: 'Государство выражает волю народа, служит его интересам. Государственные органы и должностные лица ответственны перед обществом и гражданами.',
                parts: [
                  'Davlat xalq irodasini ifoda etib, uning manfaatlariga xizmat qiladi.',
                  'Davlat organlari va mansabdor shaxslar jamiyat va fuqarolar oldida mas’uldirlar.',
                ],
              },
            ],
          },
          {
            id: '2-bob',
            number: 2,
            title: 'II bob. Xalq hokimiyatchiligi',
            titleRu: 'Глава II. Народовластие',
            articles: [
              {
                id: '13-modda',
                number: 13,
                title: '13-modda',
                titleRu: 'Статья 13',
                content: 'O‘zbekiston Respublikasida demokratiya umuminsoniy prinsiplarga asoslanadi, ularga ko‘ra inson, uning hayoti, erkinligi, sha’ni, qadr-qimmati va boshqa ajralmas huquqlari oliy qadriyat hisoblanadi. Demokratik huquq va erkinliklar Konstitutsiya va qonunlar bilan himoya qilinadi.',
                contentRu: 'В Республике Узбекистан демократия базируется на общечеловеческих принципах, согласно которым высшей ценностью является человек, его жизнь, свобода, честь, достоинство и другие неотъемлемые права. Демократические права и свободы защищаются Конституцией и законами.',
              },
              {
                id: '15-modda',
                number: 15,
                title: '15-modda',
                titleRu: 'Статья 15',
                content: 'O‘zbekiston Respublikasida O‘zbekiston Respublikasi Konstitutsiyasi va qonunlarining ustunligi so‘zsiz tan olinadi. O‘zbekiston Respublikasi Konstitutsiyasi mamlakatning butun hududida oliy yuridik kuchga ega, to‘g‘ridan-to‘g‘ri amal qiladi va yagona huquqiy makonning asosini tashkil etadi.',
                contentRu: 'В Республике Узбекистан безусловно признается верховенство Конституции и законов Республики Узбекистан. Конституция Республики Узбекистан имеет высшую юридическую силу, прямое действие и образует основу единого правового пространства на всей территории страны.',
              },
            ],
          },
        ],
      },
      {
        id: 'inson-va-fuqaro-huquqlari',
        title: 'Ikkinchi bo‘lim. Inson va fuqaroning asosiy huquqlari, erkinliklari va burchlari',
        titleRu: 'Раздел второй. Основные права, свободы и обязанности человека и гражданина',
        chapters: [
          {
            id: '5-bob',
            number: 5,
            title: 'V bob. Umumiy qoidalar',
            titleRu: 'Глава V. Общие положения',
            articles: [
              {
                id: '19-modda',
                number: 19,
                title: '19-modda',
                titleRu: 'Статья 19',
                content: 'O‘zbekiston Respublikasida insonning hamda fuqaroning huquqlari va erkinliklari xalqaro huquqning umumiy e’tirof etilgan normalariga muvofiq hamda ushbu Konstitutsiyaga muvofiq e’tirof etiladi va kafolatlanadi. Inson huquq va erkinliklari har kimga tug‘ilganidan boshlab tegishli bo‘ladi.',
                contentRu: 'В Республике Узбекистан признаются и гарантируются права и свободы человека и гражданина согласно общепризнанным нормам международного права и в соответствии с настоящей Конституцией. Права и свободы человека принадлежат каждому от рождения.',
              },
              {
                id: '20-modda',
                number: 20,
                title: '20-modda',
                titleRu: 'Статья 20',
                content: 'Insonning Konstitutsiya va qonunlarda mustahkamlangan huquq va erkinliklari daxlsizdir hamda ulardan sud qarorisiz mahrum etishga yoki ularni cheklab qo‘yishga hech kim haqli emas. Insonning huquq va erkinliklari bevosita amal qiladi. Insonning huquq va erkinliklarini ta’minlash davlatning oliy maqsadidir.',
                contentRu: 'Права и свободы человека, закрепленные в Конституции и законах, неприкосновенны, и никто не вправе без решения суда лишать или ограничивать их. Права и свободы человека действуют непосредственно. Обеспечение прав и свобод человека — высшая цель государства.',
              },
            ],
          },
          {
            id: '9-bob',
            number: 9,
            title: 'IX bob. Iqtisodiy, ijtimoiy, madaniy va ekologik huquqlar',
            titleRu: 'Глава IX. Экономические, социальные, культурные и экологические права',
            articles: [
              {
                id: '41-modda',
                number: 41,
                title: '41-modda',
                titleRu: 'Статья 41',
                content: 'Har kim ta’lim olish huquqiga ega. Davlat bepul umumiy o‘rta ta’lim va boshlang‘ich professional ta’lim olishni kafolatlaydi. Umumiy o‘rta ta’lim majburiydir. Maktabgacha ta’lim va tarbiya, umumiy o‘rta ta’lim davlat nazoratidadir. Ta’lim tashkilotlarida alohida ta’lim ehtiyojlariga ega bo‘lgan bolalar uchun inklyuziv ta’lim va tarbiya ta’minlanadi.',
                contentRu: 'Каждый имеет право на образование. Государство гарантирует получение бесплатного общего среднего и начального профессионального образования. Общее среднее образование обязательно. Дошкольное образование и воспитание, общее среднее образование находятся под надзором государства.',
                parts: [
                  'Har kim ta’lim olish huquqiga ega.',
                  'Davlat bepul umumiy o‘rta ta’lim va boshlang‘ich professional ta’lim olishni kafolatlaydi. Umumiy o‘rta ta’lim majburiydir.',
                  'Maktabgacha ta’lim va tarbiya, umumiy o‘rta ta’lim davlat nazoratidadir.',
                  'Ta’lim tashkilotlarida alohida ta’lim ehtiyojlariga ega bo‘lgan bolalar uchun inklyuziv ta’lim va tarbiya ta’minlanadi.',
                ],
              },
              {
                id: '42-modda',
                number: 42,
                title: '42-modda',
                titleRu: 'Статья 42',
                content: 'Har bir fuqaro davlat ta’lim tashkilotlarida tanlov asosida davlat budjeti mablag‘lari hisobidan oliy ma’lumot olish huquqiga ega. Oliy ta’lim tashkilotlari qonunga muvofiq akademik erkinlik, o‘zini o‘zi boshqarish, tadqiqotlar o‘tkazish va o‘qitish erkinligi huquqiga ega.',
                contentRu: 'Каждый гражданин имеет право на получение высшего образования в государственных образовательных организациях на конкурсной основе за счет средств государственного бюджета.',
              },
              {
                id: '54-modda',
                number: 54,
                title: '54-modda',
                titleRu: 'Статья 54',
                content: 'Har bir shaxs mulkdor bo‘lishga haqli. Bank operatsiyalarining, omonatlarning va hisobvaraqlarning sir tutilishi, shuningdek meros huquqi qonun bilan kafolatlanadi.',
                contentRu: 'Каждый имеет право быть собственником. Тайна банковских операций, вкладов и счетов, а также право наследования гарантируются законом.',
              },
              {
                id: '65-modda',
                number: 65,
                title: '65-modda',
                titleRu: 'Статья 65',
                content: 'Fuqarolar jamiyat va davlat ishlarini boshqarishda bevosita hamda o‘z vakillari orqali ishtirok etish huquqiga ega. Bunday ishtirok etish o‘zini o‘zi boshqarish, referendumlar o‘tkazish va davlat organlarini demokratik tarzda shakllantirish, shuningdek davlat organlarining faoliyati ustidan jamoatchilik nazorati vositasida amalga oshiriladi.',
                contentRu: 'Граждане имеют право участвовать в управлении делами общества и государства как непосредственно, так и через своих представителей.',
              },
            ],
          },
        ],
      },
    ],
  },

  'jinoyat-kodeksi': {
    ...OFFICIAL_CODES_CATALOG.find((c) => c.slug === 'jinoyat-kodeksi')!,
    parts: [
      {
        id: 'umumiy-qism',
        title: 'Umumiy qism',
        titleRu: 'Общая часть',
        sections: [
          {
            id: '1-bolim',
            number: 1,
            title: 'I bo‘lim. Asosiy qoidalar',
            titleRu: 'Раздел I. Основные положения',
            chapters: [
              {
                id: '1-bob',
                number: 1,
                title: '1-bob. Jinoyat qonunchiligi vazifalari va prinsiplari',
                titleRu: 'Глава 1. Задачи и принципы уголовного законодательства',
                articles: [
                  {
                    id: '1-modda',
                    number: 1,
                    title: '1-modda. O‘zbekiston Respublikasining jinoyat qonunchiligi',
                    titleRu: 'Статья 1. Уголовное законодательство Республики Узбекистан',
                    content: 'O‘zbekiston Respublikasining Jinoyat kodeksi O‘zbekiston Respublikasi Konstitutsiyasi va xalqaro huquqning umum e’tirof etilgan qoidalariga asoslanadi hamda ushbu Kodeksdan iboratdir.',
                    contentRu: 'Уголовный кодекс Республики Узбекистан основывается на Конституции Республики Узбекистан и общепризнанных нормах международного права и состоит из настоящего Кодекса.',
                  },
                  {
                    id: '2-modda',
                    number: 2,
                    title: '2-modda. Jinoyat kodeksining vazifalari',
                    titleRu: 'Статья 2. Задачи Уголовного кодекса',
                    content: 'Jinoyat kodeksining vazifalari shaxsni, uning huquq va erkinliklarini, jamiyat va davlat manfaatlarini, mulkni, tabiiy muhitni, tinchlikni, insoniyat xavfsizligini jinoiy tajovuzlardan qo‘riqlash, shuningdek jinoyatlarning oldini olishdan, fuqarolarni respublika Konstitutsiyasi va qonunlariga rioya etish ruhida tarbiyalashdan iboratdir.',
                    contentRu: 'Задачами Уголовного кодекса являются охрана личности, ее прав и свобод, интересов общества и государства, собственности, природной среды, мира и безопасности человечества от преступных посягательств, а также предупреждение преступлений.',
                  },
                ],
              },
              {
                id: '3-bob',
                number: 3,
                title: '3-bob. Jinoyat tushunchasi va jinoyatlarning tasnifi',
                titleRu: 'Глава 3. Понятие преступления и классификация преступлений',
                articles: [
                  {
                    id: '14-modda',
                    number: 14,
                    title: '14-modda. Jinoyat tushunchasi',
                    titleRu: 'Статья 14. Понятие преступления',
                    content: 'Ushbu Kodeks bilan taqiqlangan, aybli ijtimoiy xavfli qilmish (harakat yoki harakatsizlik) jazo qo‘llash tahdidi bilan jinoyat deb topiladi.',
                    contentRu: 'Преступлением признается виновное общественно опасное деяние (действие или бездействие), запрещенное настоящим Кодексом под угрозой применения наказания.',
                  },
                  {
                    id: '15-modda',
                    number: 15,
                    title: '15-modda. Jinoyatlarning tasnifi',
                    titleRu: 'Статья 15. Классификация преступлений',
                    content: 'Jinoyatlar o‘z xususiyati va ijtimoiy xavflilik darajasiga ko‘ra: ijtimoiy xavfi katta bo‘lmagan; uncha og‘ir bo‘lmagan; og‘ir; o‘ta og‘ir jinoyatlarga bo‘linadi.',
                    contentRu: 'Преступления в зависимости от характера и степени общественной опасности подразделяются на: преступления, не представляющие большой общественной опасности; менее тяжкие; тяжкие; особо тяжкие преступления.',
                    parts: [
                      'Ijtimoiy xavfi katta bo‘lmagan jinoyatlarga qasddan sodir etilib, qonunda uch yildan ko‘p bo‘lmagan muddatga ozodlikdan mahrum qilish nazarda tutilgan jinoyatlar, shuningdek ehtiyotsizlik oqibatida sodir etilib, besh yildan ko‘p bo‘lmagan muddatga ozodlikdan mahrum qilish nazarda tutilgan jinoyatlar kiradi.',
                      'Uncha og‘ir bo‘lmagan jinoyatlarga qasddan sodir etilib, qonunda uch yildan ortiq, lekin besh yildan ko‘p bo‘lmagan muddatga ozodlikdan mahrum qilish nazarda tutilgan jinoyatlar, shuningdek ehtiyotsizlik oqibatida besh yildan ortiq muddatga ozodlikdan mahrum qilish nazarda tutilgan jinoyatlar kiradi.',
                      'Og‘ir jinoyatlarga qasddan sodir etilib, qonunda besh yildan ortiq, lekin o‘n yildan ko‘p bo‘lmagan muddatga ozodlikdan mahrum qilish nazarda tutilgan jinoyatlar kiradi.',
                      'O‘ta og‘ir jinoyatlarga qasddan sodir etilib, qonunda o‘n yildan ortiq muddatga ozodlikdan mahrum qilish yoxud umrbod ozodlikdan mahrum qilish jazosi nazarda tutilgan jinoyatlar kiradi.',
                    ],
                  },
                  {
                    id: '16-modda',
                    number: 16,
                    title: '16-modda. Jinoiy javobgarlikning asosi',
                    titleRu: 'Статья 16. Основание уголовной ответственности',
                    content: 'Ushbu Kodeksda nazarda tutilgan jinoyat tarkibining barcha alomatlari mavjud bo‘lgan qilmishni sodir etish jinoiy javobgarlikning asosi hisoblanadi.',
                    contentRu: 'Основанием уголовной ответственности является совершение деяния, содержащего все признаки состава преступления, предусмотренного настоящим Кодексом.',
                  },
                  {
                    id: '17-modda',
                    number: 17,
                    title: '17-modda. Javobgarlikka tortish yoshi',
                    titleRu: 'Статья 17. Возраст, с которого наступает уголовная ответственность',
                    content: 'Jinoyat sodir etgunga qadar o‘n olti yoshga to‘lgan, aqli raso jismoniy shaxslar javobgarlikka tortiladilar. O‘n to‘rt yoshga to‘lgan shaxslar faqat og‘ir va o‘ta og‘ir oqibatli qasddan sodir etilgan jinoyatlar (odam o‘ldirish, bosqinchilik, terrorizm va h.k.) uchun javobgarlikka tortiladilar.',
                    contentRu: 'Уголовной ответственности подлежит вменяемое физическое лицо, которому до совершения преступления исполнилось шестнадцать лет. Лица, достигшие четырнадцатилетнего возраста, подлежат ответственности лишь за отдельные тяжкие и особо тяжкие преступления.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'maxsus-qism',
        title: 'Maxsus qism',
        titleRu: 'Особенная часть',
        sections: [
          {
            id: '1-bolim-shaxs',
            number: 1,
            title: 'I bo‘lim. Shaxsga qarshi jinoyatlar',
            titleRu: 'Раздел I. Преступления против личности',
            chapters: [
              {
                id: '1-bob-hayot',
                number: 1,
                title: '1-bob. Hayotga qarshi jinoyatlar',
                titleRu: 'Глава 1. Преступления против жизни',
                articles: [
                  {
                    id: '97-modda',
                    number: 97,
                    title: '97-modda. Qasddan odam o‘ldirish',
                    titleRu: 'Статья 97. Умышленное убийство',
                    content: 'Qasddan odam o‘ldirish — o‘n yildan o‘n besh yilgacha ozodlikdan mahrum qilish bilan jazolanadi.',
                    contentRu: 'Умышленное убийство — наказывается лишением свободы от десяти до пятнадцати лет.',
                    sanctions: [
                      '1-qism: o‘n yildan o‘n besh yilgacha ozodlikdan mahrum qilish.',
                      '2-qism (og‘irlashtiruvchi holatlarda): o‘n besh yildan yigirma besh yilgacha ozodlikdan mahrum qilish yoki umrbod ozodlikdan mahrum qilish.',
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: '4-bolim-iqtisodiyot',
            number: 4,
            title: 'IV bo‘lim. Iqtisodiyot sohasidagi jinoyatlar',
            titleRu: 'Раздел IV. Преступления в сфере экономики',
            chapters: [
              {
                id: '10-bob-talon-toroj',
                number: 10,
                title: 'X bob. O‘zganing mulkini talon-toroj qilish',
                titleRu: 'Глава X. Хищение чужого имущества',
                articles: [
                  {
                    id: '168-modda',
                    number: 168,
                    title: '168-modda. Firibgarlik',
                    titleRu: 'Статья 168. Мошенничество',
                    content: 'Firibgarlik, ya’ni aldash yoki ishonchni suiiste’mol qilish yo‘li bilan o‘zganing mulkini yoki o‘zganing mulkiga bo‘lgan huquqni qo‘lga kiritish.',
                    contentRu: 'Мошенничество, то есть завладение чужим имуществом или правом на чужое имущество путем обмана или злоупотребления доверием.',
                    sanctions: [
                      '1-qism: bazaviy hisoblash miqdorining ellik baravaridan yuz baravarigacha miqdorda jarima yoki ikki yilgacha axloq tuzatish ishlari yoxud bir yildan uch yilgacha ozodlikni cheklash yoki uch yilgacha ozodlikdan mahrum qilish.',
                      'Axborot texnologiyalaridan (kiberjinoyatchilik) foydalanib sodir etilgan bo‘lsa: bazaviy hisoblash miqdorining yuz baravaridan uch yuz baravarigacha miqdorda jarima yoki uch yildan besh yilgacha ozodlikdan mahrum qilish.',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  'mehnat-kodeksi': {
    ...OFFICIAL_CODES_CATALOG.find((c) => c.slug === 'mehnat-kodeksi')!,
    parts: [
      {
        id: 'umumiy-qism-mehnat',
        title: 'Umumiy qism',
        titleRu: 'Общая часть',
        chapters: [
          {
            id: '1-bob-mehnat',
            number: 1,
            title: '1-bob. Asosiy qoidalar',
            titleRu: 'Глава 1. Основные положения',
            articles: [
              {
                id: '1-modda',
                number: 1,
                title: '1-modda. Ushbu Kodeksning maqsadi',
                titleRu: 'Статья 1. Цель настоящего Кодекса',
                content: 'Ushbu Kodeksning maqsadi xodimlar, ish beruvchilar va davlat manfaatlarining muvozanatini ta’minlash asosida yakka tartibdagi mehnatga oid munosabatlarni hamda ular bilan bevosita bog‘liq bo‘lgan ijtimoiy munosabatlarni tartibga solishdan iboratdir.',
                contentRu: 'Целью настоящего Кодекса является регулирование индивидуальных трудовых отношений и непосредственно связанных с ними общественных отношений на основе обеспечения баланса интересов работников, работодателей и государства.',
              },
              {
                id: '4-modda',
                number: 4,
                title: '4-modda. Mehnat sohasidagi asosiy prinsiplar',
                titleRu: 'Статья 4. Основные принципы правового регулирования труда',
                content: 'Yakka tartibdagi mehnat munosabatlarini va ular bilan bevosita bog‘liq bo‘lgan ijtimoiy munosabatlarni huquqiy tartibga solishning asosiy prinsiplari quyidagilardan iborat: mehnat huquqlarining tengligi, mehnat va mashg‘ulotlar sohasida kamsitishni taqiqlash; mehnat erkinligi va majburiy mehnatni taqiqlash; mehnat sohasidagi ijtimoiy sheriklik; mehnat huquqlari ta’minlanishi va majburiyatlar bajarilishining kafolatlanganligi; xodimning huquqiy holati yomonlashishiga yo‘l qo‘yilmasligi.',
                contentRu: 'Основными принципами правового регулирования трудовых отношений являются: равенство трудовых прав, запрещение дискриминации; свобода труда и запрещение принудительного труда; социальное партнерство; гарантии обеспечения прав.',
              },
            ],
          },
          {
            id: '7-bob-mehnat-shartnomasi',
            number: 7,
            title: '7-bob. Mehnat shartnomasini bekor qilish',
            titleRu: 'Глава 7. Прекращение трудового договора',
            articles: [
              {
                id: '100-modda',
                number: 100,
                title: '100-modda. Mehnat shartnomasining bekor qilinishi to‘g‘risida xodimni ogohlantirish',
                titleRu: 'Статья 100. Предупреждение работника о прекращении трудового договора',
                content: 'Ish beruvchi xodimni mehnat shartnomasini o‘z tashabbusi bilan bekor qilish to‘g‘risida quyidagi muddatlarda yozma shaklda (imzo qo‘ydirib) ogohlantirishi shart: texnologiyadagi, ishlab chiqarish va mehnatni tashkil etishdagi o‘zgarishlar, xodimlar soni yoki shtati qisqarganligi munosabati bilan — kamida ikki oy oldin; xodimning malakasi yetarli bo‘lmaganligi sababli egallab turgan lavozimiga loyiq emasligi munosabati bilan — kamida ikki hafta oldin; xodim o‘z mehnat majburiyatlarini muntazam ravishda buzganligi munosabati bilan — kamida uch kun oldin.',
                contentRu: 'Работодатель обязан предупредить работника о прекращении трудового договора по своей инициативе в письменной форме: при сокращении численности или штата — не менее чем за два месяца; при несоответствии должности вследствие недостаточной квалификации — не менее чем за две недели; при систематическом нарушении трудовых обязанностей — не менее чем за три дня.',
                parts: [
                  'Tashkilot tugatilganligi yoki shtat qisqarganligi munosabati bilan — kamida ikki oy oldin;',
                  'Xodim malakasi yetarli emasligi sababli — kamida ikki hafta oldin;',
                  'Xodim mehnat intizomini qo‘pol yoki muntazam buzganligi sababli — kamida uch kun oldin.',
                ],
                notes: ['Ogohlantirish muddati davrida xodimga boshqa ish qidirish uchun haftada kamida bir kun ish haqi saqlangan holda bo‘sh vaqt beriladi.'],
              },
              {
                id: '161-modda',
                number: 161,
                title: '161-modda. Ish vaqtining normal muddati',
                titleRu: 'Статья 161. Нормальная продолжительность рабочего времени',
                content: 'Xodim uchun ish vaqtining normal muddati haftasiga qirq soatdan ortiq bo‘lishi mumkin emas. Olti kunlik ish haftasida har kungi ishning muddati yetti soatdan, besh kunlik ish haftasida esa sakkiz soatdan ortib ketmasligi lozim.',
                contentRu: 'Нормальная продолжительность рабочего времени для работника не может превышать сорока часов в неделю. При шестидневной рабочей неделе продолжительность ежедневной работы не может превышать семи часов, а при пятидневной рабочей неделе — восьми часов.',
              },
              {
                id: '216-modda',
                number: 216,
                title: '216-modda. Har yilgi asosiy eng kam mehnat ta’tili',
                titleRu: 'Статья 216. Ежегодный основной минимальный трудовой отпуск',
                content: 'Har yilgi asosiy eng kam mehnat ta’tilining muddati yigirma bir kalendar kundan iborat bo‘ladi. (Eski tahrirda 15 ish kuni bo‘lgan).',
                contentRu: 'Продолжительность ежегодного основного минимального трудового отпуска составляет двадцать один календарный день.',
                notes: ['Yangi Mehnat kodeksiga binoan eng kam ta’til muddati 21 kalendar kuni etib belgilangan.'],
              },
            ],
          },
        ],
      },
    ],
  },

  'fuqarolik-kodeksi': {
    ...OFFICIAL_CODES_CATALOG.find((c) => c.slug === 'fuqarolik-kodeksi')!,
    parts: [
      {
        id: '1-qism-fk',
        title: 'I bo‘lim. Umumiy qoidalar',
        titleRu: 'Раздел I. Общие положения',
        chapters: [
          {
            id: '1-bob-fk',
            number: 1,
            title: '1-bob. Fuqarolik qonunchiligi',
            titleRu: 'Глава 1. Гражданское законодательство',
            articles: [
              {
                id: '1-modda',
                number: 1,
                title: '1-modda. Fuqarolik qonunchiligi bilan tartibga solinadigan munosabatlar',
                titleRu: 'Статья 1. Отношения, регулируемые гражданским законодательством',
                content: 'Fuqarolik qonunchiligi fuqarolik muomalasi ishtirokchilarining huquqiy holatini, mulk huquqi va boshqa ashyoviy huquqlarning, intellektual faoliyat natijalariga bo‘lgan huquqlarning vujudga kelish asoslarini hamda ularni amalga oshirish tartibini belgilaydi, shartnoma va o‘zga majburiyatlarni tartibga soladi.',
                contentRu: 'Гражданское законодательство определяет правовое положение участников гражданского оборота, основания возникновения и порядок осуществления права собственности и других вещных прав.',
              },
              {
                id: '9-modda',
                number: 9,
                title: '9-modda. Fuqarolik huquqlarini amalga oshirish',
                titleRu: 'Статья 9. Осуществление гражданских прав',
                content: 'Fuqarolar va yuridik shaxslar o‘zlariga qarashli fuqarolik huquqlarini, shu jumladan ularni himoya qilish huquqini o‘z xohishlaricha amalga oshiradilar.',
                contentRu: 'Граждане и юридические лица по своему усмотрению осуществляют принадлежащие им гражданские права, в том числе право на их защиту.',
              },
              {
                id: '17-modda',
                number: 17,
                title: '17-modda. Fuqaroning huquq layoqati',
                titleRu: 'Статья 17. Правоспособность гражданина',
                content: 'Barcha fuqarolarning fuqarolik huquq va burchlariga ega bo‘lish qobiliyati (fuqarolik huquq layoqati) teng ravishda e’tirof etiladi. Fuqaroning huquq layoqati u tug‘ilgan paytdan e’tiboran vujudga keladi va vafot etishi bilan tugaydi.',
                contentRu: 'Способность иметь гражданские права и обязанности (гражданская правоспособность) признается в равной мере за всеми гражданами. Правоспособность гражданина возникает в момент его рождения и прекращается со смертью.',
              },
              {
                id: '22-modda',
                number: 22,
                title: '22-modda. Fuqaroning muomala layoqati',
                titleRu: 'Статья 22. Дееспособность гражданина',
                content: 'Fuqaroning o‘z harakatlari bilan fuqarolik huquqlariga ega bo‘lish va ularni amalga oshirish, o‘zi uchun fuqarolik burchlarini vujudga keltirish va ularni bajarish layoqati (fuqarolik muomala layoqati) u voyaga yetgach, ya’ni o‘n sakkiz yoshga to‘lgach to‘la hajmda vujudga keladi.',
                contentRu: 'Способность гражданина своими действиями приобретать и осуществлять гражданские права, создавать для себя гражданские обязанности и исполнять их (гражданская дееспособность) возникает в полном объеме с наступлением совершеннолетия, то есть по достижении восемнадцатилетнего возраста.',
              },
            ],
          },
        ],
      },
    ],
  },

  'mamuriy-javobgarlik-kodeksi': {
    ...OFFICIAL_CODES_CATALOG.find((c) => c.slug === 'mamuriy-javobgarlik-kodeksi')!,
    parts: [
      {
        id: 'umumiy-qism-mjtk',
        title: 'Umumiy qism',
        titleRu: 'Общая часть',
        chapters: [
          {
            id: '2-bob-mjtk',
            number: 2,
            title: '2-bob. Ma’muriy huquqbuzarlik va ma’muriy javobgarlik',
            titleRu: 'Глава 2. Административное правонарушение и административная ответственность',
            articles: [
              {
                id: '10-modda',
                number: 10,
                title: '10-modda. Ma’muriy huquqbuzarlik tushunchasi',
                titleRu: 'Статья 10. Понятие административного правонарушения',
                content: 'Qonunchilikka xilof bo‘lgan, aybli (qasddan yoki ehtiyotsizlik orqasida) sodir etilgan, davlat yoki jamoat tartibiga, fuqarolarning huquqlari va erkinliklariga tajovuz qiluvchi, qonunchilikda ma’muriy javobgarlik nazarda tutilgan harakat yoki harakatsizlik ma’muriy huquqbuzarlik hisoblanadi.',
                contentRu: 'Административным правонарушением признается противоправное, виновное (умышленное или неосторожное) действие либо бездействие, посягающее на государственный или общественный порядок, права и свободы граждан.',
              },
              {
                id: '13-modda',
                number: 13,
                title: '13-modda. Ma’muriy javobgarlikka tortish yoshi',
                titleRu: 'Статья 13. Возраст, по достижении которого наступает административная ответственность',
                content: 'Ma’muriy huquqbuzarlik sodir etgan paytda o‘n olti yoshga to‘lgan shaxslar ma’muriy javobgarlikka tortiladilar.',
                contentRu: 'Административной ответственности подлежат лица, достигшие к моменту совершения административного правонарушения шестнадцатилетнего возраста.',
              },
              {
                id: '40-modda',
                number: 40,
                title: '40-modda. Tuhmat',
                titleRu: 'Статья 40. Клевета',
                content: 'Tuhmat, ya’ni bila turib boshqa shaxsni sharmanda qiladigan uydirmalar tarqatish — bazaviy hisoblash miqdorining yigirma baravaridan oltmish baravarigacha miqdorda jarima solishga sabab bo‘ladi.',
                contentRu: 'Клевета, то есть распространение заведомо ложных, позорящих другое лицо измышлений — влечет наложение штрафа от двадцати до шестидесяти базовых расчетных величин.',
              },
              {
                id: '41-modda',
                number: 41,
                title: '41-modda. Haqorat qilish',
                titleRu: 'Статья 41. Оскорбление',
                content: 'Haqorat qilish, ya’ni shaxsning sha’ni va qadr-qimmatini qasddan kamsitish — bazaviy hisoblash miqdorining yigirma baravaridan qirq baravarigacha miqdorda jarima solishga sabab bo‘ladi.',
                contentRu: 'Оскорбление, то есть умышленное унижение чести и достоинства личности — влечет наложение штрафа от двадцати до сорока базовых расчетных величин.',
              },
            ],
          },
        ],
      },
    ],
  },

  'oila-kodeksi': {
    ...OFFICIAL_CODES_CATALOG.find((c) => c.slug === 'oila-kodeksi')!,
    parts: [
      {
        id: '1-qism-ok',
        title: 'I bo‘lim. Umumiy qoidalar',
        titleRu: 'Раздел I. Общие положения',
        chapters: [
          {
            id: '1-bob-ok',
            number: 1,
            title: '1-bob. Oila to‘g‘risidagi qonunchilik',
            titleRu: 'Глава 1. Законодательство о семье',
            articles: [
              {
                id: '1-modda',
                number: 1,
                title: '1-modda. Oila to‘g‘risidagi qonunchilikning asosiy qoidalari',
                titleRu: 'Статья 1. Основные начала семейного законодательства',
                content: 'Oila jamiyatning asosiy bo‘g‘inidir hamda u jamiyat va davlat muhofazasida bo‘lish huquqiga ega. Oila munosabatlari erkak va ayolning ixtiyoriy ravishda nikohlanib tuzgan ittifoqiga, er va xotinning shaxsiy hamda mulkiy huquqlari tengligiga, oila ichki masalalarining o‘zaro kelishuv yo‘li bilan hal etilishiga asoslanadi.',
                contentRu: 'Семья является основной ячейкой общества и имеет право на защиту общества и государства. Семейные отношения строятся на добровольности брачного союза мужчины и женщины, равенстве личных и имущественных прав супругов.',
              },
              {
                id: '14-modda',
                number: 14,
                title: '14-modda. Nikoh tuzish tartibi',
                titleRu: 'Статья 14. Порядок заключения брака',
                content: 'Nikoh fuqarolik holati dalolatnomalarini qayd etish organlarida tuziladi. Diniy rasm-rusumlarga binoan tuzilgan nikoh qonuniy ahamiyatga ega emas.',
                contentRu: 'Брак заключается в органах записи актов гражданского состояния. Брак, заключенный по религиозным обрядам, не имеет правового значения.',
              },
              {
                id: '15-modda',
                number: 15,
                title: '15-modda. Nikoh yoshi',
                titleRu: 'Статья 15. Брачный возраст',
                content: 'Nikoh yoshi erkaklar va ayollar uchun o‘n sakkiz yosh etib belgilanadi. Uzrli sabablar bo‘lganda, alohida hollarda tuman, shahar hokimi nikoh yoshini ko‘pi bilan bir yilga kamaytirishi mumkin.',
                contentRu: 'Брачный возраст устанавливается для мужчин и женщин в восемнадцать лет. При наличии уважительных причин хоким района, города может снизить брачный возраст не более чем на один год.',
              },
            ],
          },
        ],
      },
    ],
  },

  'soliq-kodeksi': {
    ...OFFICIAL_CODES_CATALOG.find((c) => c.slug === 'soliq-kodeksi')!,
    parts: [
      {
        id: '1-qism-sk',
        title: 'I bo‘lim. Umumiy qoidalar',
        titleRu: 'Раздел I. Общие положения',
        chapters: [
          {
            id: '1-bob-sk',
            number: 1,
            title: '1-bob. Asosiy qoidalar',
            titleRu: 'Глава 1. Основные положения',
            articles: [
              {
                id: '1-modda',
                number: 1,
                title: '1-modda. Ushbu Kodeks bilan tartibga solinadigan munosabatlar',
                titleRu: 'Статья 1. Отношения, регулируемые настоящим Кодексом',
                content: 'Ushbu Kodeks soliqlarni va yig‘imlarni belgilash, joriy etish hamda to‘lash, shuningdek soliq majburiyatlarini bajarish bilan bog‘liq bo‘lgan munosabatlarni tartibga soladi.',
                contentRu: 'Настоящий Кодекс регулирует отношения по установлению, введению и уплате налогов и сборов, а также исполнению налоговых обязательств.',
              },
              {
                id: '17-modda',
                number: 17,
                title: '17-modda. Soliqlar va yig‘imlarning turlari',
                titleRu: 'Статья 17. Виды налогов и сборов',
                content: 'O‘zbekiston Respublikasida quyidagi soliqlar belgilanadi: 1) qo‘shilgan qiymat solig‘i; 2) aksiz solig‘i; 3) foyda solig‘i; 4) jismoniy shaxslardan olinadigan daromad solig‘i; 5) yer qa’ridan foydalanganlik uchun soliq; 6) suv resurslaridan foydalanganlik uchun soliq; 7) mol-mulk solig‘i; 8) yer solig‘i; 9) ijtimoiy soliq.',
                contentRu: 'В Республике Узбекистан устанавливаются следующие налоги: 1) налог на добавленную стоимость; 2) акцизный налог; 3) налог на прибыль; 4) налог на доходы физических лиц; 5) налог за пользование недрами; 6) налог за пользование водными ресурсами; 7) налог на имущество; 8) земельный налог; 9) социальный налог.',
              },
            ],
          },
        ],
      },
    ],
  },

  'jinoyat-protsessual-kodeksi': createOfficialOutline('jinoyat-protsessual-kodeksi', [
    {
      id: 'umumiy-qism-jpk',
      title: 'Umumiy qism',
      chapters: [
        {
          id: '1-bob-jpk', number: 1, title: '1-bob. Jinoyat-protsessual qonunchiligi', articles: [
            [1, 'Jinoyat ishlarini yuritish tartibi'],
            [2, 'Jinoyat-protsessual qonunchiligining vazifalari'],
          ],
        },
        {
          id: '2-bob-jpk', number: 2, title: '2-bob. Jinoyat protsessi prinsiplari', articles: [
            [11, 'Qonuniylik'],
            [12, 'Odil sudlovning faqat sud tomonidan amalga oshirilishi'],
          ],
        },
      ],
    },
    {
      id: 'maxsus-qism-jpk',
      title: 'Maxsus qism',
      chapters: [
        {
          id: '20-bob-jpk', number: 20, title: '20-bob. Jinoyat ishini qo‘zg‘atish', articles: [
            [321, 'Jinoyat ishini qo‘zg‘atish uchun sabablar va asoslar'],
            [322, 'Jinoyat to‘g‘risidagi arizalar, xabarlar va boshqa ma’lumotlarni ko‘rib chiqish'],
          ],
        },
      ],
    },
  ]),

  'fuqarolik-protsessual-kodeksi': createOfficialOutline('fuqarolik-protsessual-kodeksi', [
    {
      id: '1-bolim-fpk',
      title: 'I bo‘lim. Umumiy qoidalar',
      chapters: [
        {
          id: '1-bob-fpk', number: 1, title: '1-bob. Asosiy qoidalar', articles: [
            [1, 'Fuqarolik sud ishlarini yuritish to‘g‘risidagi qonunchilik'],
            [2, 'Fuqarolik sud ishlarini yuritish vazifalari'],
            [3, 'Sud orqali himoyalanish huquqi'],
          ],
        },
        {
          id: '2-bob-fpk', number: 2, title: '2-bob. Fuqarolik sud ishlarini yuritish prinsiplari', articles: [
            [7, 'Odil sudlovning faqat sud tomonidan amalga oshirilishi'],
            [8, 'Qonun va sud oldida tenglik'],
          ],
        },
      ],
    },
    {
      id: '2-bolim-fpk', title: 'II bo‘lim. Birinchi instansiya sudida ish yuritish', chapters: [
        {
          id: '16-bob-fpk', number: 16, title: '16-bob. Da’vo qo‘zg‘atish', articles: [
            [188, 'Da’vo arizasini berish'],
            [189, 'Da’vo arizasining shakli va mazmuni'],
          ],
        },
      ],
    },
  ]),

  'iqtisodiy-protsessual-kodeksi': createOfficialOutline('iqtisodiy-protsessual-kodeksi', [
    {
      id: '1-bolim-ipk', title: 'I bo‘lim. Umumiy qoidalar', chapters: [
        {
          id: '1-bob-ipk', number: 1, title: '1-bob. Asosiy qoidalar', articles: [
            [1, 'Iqtisodiy sud ishlarini yuritish to‘g‘risidagi qonunchilik'],
            [2, 'Iqtisodiy sud ishlarini yuritish vazifalari'],
            [3, 'Iqtisodiy sudga murojaat qilish huquqi va murojaatning shakli'],
          ],
        },
        {
          id: '2-bob-ipk', number: 2, title: '2-bob. Iqtisodiy sud ishlarini yuritish prinsiplari', articles: [
            [7, 'Odil sudlovning faqat sud tomonidan amalga oshirilishi'],
            [8, 'Qonun va sud oldida tenglik'],
          ],
        },
      ],
    },
    {
      id: '2-bolim-ipk', title: 'II bo‘lim. Iqtisodiy ishda ishtirok etuvchi shaxslar', chapters: [
        {
          id: '4-bob-ipk', number: 4, title: '4-bob. Iqtisodiy ishda ishtirok etuvchi shaxslar', articles: [
            [39, 'Ishda ishtirok etuvchi shaxslar'],
            [40, 'Taraflar'],
          ],
        },
      ],
    },
  ]),

  'mamuriy-sud-ishlarini-yuritish-kodeksi': createOfficialOutline('mamuriy-sud-ishlarini-yuritish-kodeksi', [
    {
      id: '1-bolim-msiyk', title: 'I bo‘lim. Umumiy qoidalar', chapters: [
        {
          id: '1-bob-msiyk', number: 1, title: '1-bob. Asosiy qoidalar', articles: [
            [1, 'Ma’muriy sud ishlarini yuritish to‘g‘risidagi qonunchilik'],
            [2, 'Ma’muriy sud ishlarini yuritish vazifalari'],
            [4, 'Sudga murojaat qilish huquqi'],
          ],
        },
        {
          id: '2-bob-msiyk', number: 2, title: '2-bob. Ma’muriy sud ishlarini yuritish prinsiplari', articles: [
            [8, 'Odil sudlovning faqat sud tomonidan amalga oshirilishi'],
            [11, 'Sudning faol ishtiroki'],
          ],
        },
      ],
    },
    {
      id: '2-bolim-msiyk', title: 'II bo‘lim. Sudga taalluqlilik va sudlovga tegishlilik', chapters: [
        {
          id: '3-bob-msiyk', number: 3, title: '3-bob. Ma’muriy ishlarning sudga taalluqliligi', articles: [
            [26, 'Ma’muriy sudlarga taalluqli ishlar'],
            [27, 'Sudga taalluqlilikni o‘zgartirishga yo‘l qo‘yilmasligi'],
          ],
        },
      ],
    },
  ]),

  'bojxona-kodeksi': createOfficialOutline('bojxona-kodeksi', [
    {
      id: '1-bolim-bk', title: 'I bo‘lim. Umumiy qoidalar', chapters: [
        {
          id: '1-bob-bk', number: 1, title: '1-bob. Asosiy qoidalar', articles: [
            [1, 'Ushbu Kodeks bilan tartibga solinadigan munosabatlar'],
            [2, 'Bojxona to‘g‘risidagi qonunchilik'],
            [4, 'Tashqi iqtisodiy faoliyat ishtirokchisi huquqlarining ustuvorligi'],
          ],
        },
        {
          id: '2-bob-bk', number: 2, title: '2-bob. Ushbu Kodeksda qo‘llaniladigan asosiy tushunchalar', articles: [
            [5, 'O‘zbekiston Respublikasining bojxona hududi va bojxona chegarasi'],
            [7, 'Vakolatli shaxs'],
          ],
        },
      ],
    },
    {
      id: '2-bolim-bk', title: 'II bo‘lim. Bojxona nazorati', chapters: [
        {
          id: '10-bob-bk', number: 10, title: '10-bob. Bojxona nazoratini amalga oshirishning umumiy qoidalari', articles: [
            [181, 'Bojxona nazorati'],
            [182, 'Bojxona nazoratini o‘tkazish joyi va vaqti'],
          ],
        },
      ],
    },
  ]),

  'yer-kodeksi': createOfficialOutline('yer-kodeksi', [
    {
      id: 'umumiy-qoidalar-yk', title: 'Umumiy qoidalar', chapters: [
        {
          id: '1-bob-yk', number: 1, title: '1-bob. Umumiy qoidalar', articles: [
            [1, 'Yer to‘g‘risidagi qonunchilikning asosiy vazifalari'],
            [2, 'Yer to‘g‘risidagi qonunchilikning asosiy prinsiplari'],
          ],
        },
        {
          id: '2-bob-yk', number: 2, title: '2-bob. Yer fondi', articles: [
            [8, 'Yer fondi toifalari'],
            [10, 'Yer uchastkasi'],
          ],
        },
      ],
    },
    {
      id: 'yerga-egalik-yk', title: 'Yerga egalik qilish va undan foydalanish', chapters: [
        {
          id: '4-bob-yk', number: 4, title: '4-bob. Yer uchastkalariga bo‘lgan huquqlar', articles: [
            [17, 'Yer uchastkalariga bo‘lgan huquqlar'],
            [18, 'Yer uchastkalariga bo‘lgan huquqlarning vujudga kelishi'],
          ],
        },
      ],
    },
  ]),

  'uy-joy-kodeksi': createOfficialOutline('uy-joy-kodeksi', [
    {
      id: '1-bolim-ujk', title: 'I bo‘lim. Umumiy qoidalar', chapters: [
        {
          id: '1-bob-ujk', number: 1, title: '1-bob. Asosiy qoidalar', articles: [
            [1, 'Uy-joy to‘g‘risidagi qonunchilik'],
            [2, 'Uy-joy to‘g‘risidagi qonunchilik bilan tartibga solinadigan munosabatlar'],
          ],
        },
        {
          id: '2-bob-ujk', number: 2, title: '2-bob. Uy-joy fondi. Turar joy', articles: [
            [7, 'Uy-joy fondi'],
            [9, 'Turar joy, undan foydalanish maqsadi'],
            [11, 'Turar joyga bo‘lgan mulk huquqi'],
          ],
        },
      ],
    },
    {
      id: 'turar-joydan-foydalanish-ujk', title: 'Turar joydan foydalanish', chapters: [
        {
          id: '8-bob-ujk', number: 8, title: '8-bob. Turar joyni ijaraga berish', articles: [
            [86, 'Turar joyni ijaraga berish shartnomasi'],
            [87, 'Turar joyni ijaraga berish shartnomasining predmeti'],
          ],
        },
      ],
    },
  ]),

  'budjet-kodeksi': createOfficialOutline('budjet-kodeksi', [
    {
      id: 'umumiy-qism-budjet', title: 'Umumiy qism', chapters: [
        {
          id: '1-bob-budjet', number: 1, title: '1-bob. Asosiy qoidalar', articles: [
            [1, 'Ushbu Kodeks bilan tartibga solinadigan munosabatlar'],
            [2, 'Budjet to‘g‘risidagi qonunchilik'],
            [3, 'Ushbu Kodeksda qo‘llaniladigan asosiy tushunchalar'],
          ],
        },
        {
          id: '2-bob-budjet', number: 2, title: '2-bob. Budjet tizimining tushunchasi va prinsiplari', articles: [
            [6, 'Budjet tizimi tushunchasi'],
            [7, 'Budjet tizimi prinsiplari'],
            [8, 'Budjet tizimining yagonaligi prinsipi'],
          ],
        },
      ],
    },
    {
      id: 'maxsus-qism-budjet', title: 'Maxsus qism', chapters: [
        {
          id: '6-bob-budjet', number: 6, title: '6-bob. Davlat budjeti', articles: [
            [59, 'Davlat budjeti'],
            [60, 'Davlat budjeti daromadlari'],
          ],
        },
      ],
    },
  ]),

  'shaharsozlik-kodeksi': createOfficialOutline('shaharsozlik-kodeksi', [
    {
      id: 'umumiy-qoidalar-shk', title: 'Umumiy qoidalar', chapters: [
        {
          id: '1-bob-shk', number: 1, title: '1-bob. Umumiy qoidalar', articles: [
            [1, 'Ushbu Kodeksning maqsadi'],
            [2, 'Shaharsozlik to‘g‘risidagi qonunchilik'],
            [3, 'Shaharsozlik faoliyatining asosiy prinsiplari'],
          ],
        },
        {
          id: '2-bob-shk', number: 2, title: '2-bob. Shaharsozlik faoliyatini davlat tomonidan tartibga solish', articles: [
            [8, 'Shaharsozlik faoliyatini davlat tomonidan tartibga solish'],
            [9, 'Shaharsozlik faoliyati sohasidagi maxsus vakolatli davlat organi'],
          ],
        },
      ],
    },
    {
      id: 'shaharsozlik-hujjatlari-shk', title: 'Shaharsozlik hujjatlari', chapters: [
        {
          id: '5-bob-shk', number: 5, title: '5-bob. Shaharsozlik hujjatlari', articles: [
            [27, 'Shaharsozlik hujjatlarining turlari'],
            [28, 'Shaharsozlik hujjatlarini ishlab chiqish'],
          ],
        },
      ],
    },
  ]),

  'saylov-kodeksi': createOfficialOutline('saylov-kodeksi', [
    {
      id: 'umumiy-qoidalar-saylov', title: 'Umumiy qoidalar', chapters: [
        {
          id: '1-bob-saylov', number: 1, title: '1-bob. Umumiy qoidalar', articles: [
            [1, 'Ushbu Kodeks bilan tartibga solinadigan munosabatlar'],
            [2, 'Saylov to‘g‘risidagi qonunchilik'],
            [3, 'O‘zbekistonda saylov o‘tkazishning asosiy prinsiplari'],
            [4, 'Umumiy saylov huquqi'],
            [7, 'Yashirin ovoz berish'],
          ],
        },
        {
          id: '2-bob-saylov', number: 2, title: '2-bob. Saylov okruglari va uchastkalari', articles: [
            [9, 'Saylov okruglarini tuzish'],
            [10, 'Saylov uchastkalarini tuzish tartibi va normasi'],
          ],
        },
      ],
    },
    {
      id: 'saylov-jarayoni', title: 'Saylov jarayoni', chapters: [
        {
          id: '10-bob-saylov', number: 10, title: '10-bob. Ovoz berishni tashkil etish va o‘tkazish', articles: [
            [49, 'Ovoz berish binolari hamda uchastka saylov komissiyalari binolari'],
            [51, 'Ovoz berish vaqti va joyi'],
          ],
        },
      ],
    },
  ]),

};
