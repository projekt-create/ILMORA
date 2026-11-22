export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'O‘zbekiston tarixi' | 'Jahon tarixi' | 'Harbiy atamalar' | 'Davlat va huquq' | 'Madaniyat va din';
  definition: string;
  origin?: string;
  period?: string;
}

export const fullGlossary: GlossaryTerm[] = [
  // --- A ---
  { id: '1', term: 'Avesto', category: 'Madaniyat va din', definition: 'Zardushtiylik dinining muqaddas kitoblari to‘plami; O‘rta Osiyo, Eron va Ozarbayjon xalqlarining eng qadimiy yozma yodgorligi.', origin: 'Forscha/Avestiycha', period: 'Mil. avv. I mingyillik' },
  { id: '2', term: 'Ahamoniylar', category: 'Davlat va huquq', definition: 'Qadimgi Eronda vujudga kelgan va Kir II tomonidan asos solingan qudratli sulola (mil. avv. 558–330).', period: 'Mil. avv. VI–IV asrlar' },
  { id: '3', term: 'Amir', category: 'Davlat va huquq', definition: 'Arabcha "hukmdor", "boshliq"; musulmon sharqida harbiy qo‘mondon yoki davlat boshlig‘i unvoni (masalan, Buxoro amirligi).', origin: 'Arabcha' },
  { id: '4', term: 'Antanta', category: 'Harbiy atamalar', definition: 'Birinchi jahon urushida Buyuk Britaniya, Fransiya va Rossiya imperiyalari boshchiligidagi harbiy-siyosiy blok.', origin: 'Fransuzcha: Entente — rozilik', period: '1904–1918' },
  { id: '5', term: 'Apartheid', category: 'Davlat va huquq', definition: 'Janubiy Afrika Respublikasida 1948–1994-yillarda oq tanli bo‘lmagan aholiga qarshi qo‘llanilgan irqiy ayirmachilik tizimi.', origin: 'Afrikaans: ayirish' },
  { id: '6', term: 'Arxeologiya', category: 'Madaniyat va din', definition: 'Moddiy manbalar (qurollar, idishlar, manzilgohlar) asosida insoniyat o‘tmishini o‘rganuvchi tarix fani tarmog‘i.', origin: 'Yunoncha: arxaios — qadimiy' },
  { id: '7', term: 'Ark', category: 'Davlat va huquq', definition: 'O‘rta asr sharq shaharlarining ichki mustahkamlangan qal’asi; hukmdor saroyi joylashgan qismi (masalan, Buxoro Arki).', origin: 'Arabcha/Forscha' },
  { id: '8', term: 'Aravachilik (Kolyaska)', category: 'Harbiy atamalar', definition: 'Bronza davrida kashf qilingan ikki g‘ildirakli tezkor jangovar arava.', period: 'Mil. avv. II mingyillik' },
  { id: '9', term: 'Arxont', category: 'Davlat va huquq', definition: 'Qadimgi Afinada eng yuqori mansabdor shaxs, hukumat boshlig‘i.', origin: 'Yunoncha' },
  { id: '10', term: 'Aristokratiya', category: 'Davlat va huquq', definition: 'Jamiyatning imtiyozli aslzodalar tabaqasi va ularning hukmronligiga asoslangan davlat shakli.', origin: 'Yunoncha' },
  { id: '11', term: 'Ashtarxoniylar (Joniylar)', category: 'Davlat va huquq', definition: '1601–1756-yillarda Buxoro xonligini boshqargan Ashtarxon (Astraxan) xonlari sulolasi.', period: 'XVII–XVIII asrlar' },
  { id: '12', term: 'Autokratiya', category: 'Davlat va huquq', definition: 'Bir shaxsning mutlaq, cheklanmagan yakka hukmronligi.', origin: 'Yunoncha' },
  { id: '13', term: 'Arg‘umoq', category: 'O‘zbekiston tarixi', definition: 'Qadimgi Farg‘ona (Davan) davlatining mashhur "samoviy tulporlari" deb atalgan zotdor jangovar oti.', period: 'Antik davr' },
  { id: '14', term: 'Avtonomiya (Muxtoriyat)', category: 'Davlat va huquq', definition: 'Muayyan hududning yagona davlat tarkibida o‘z ichki ishlarini mustaqil boshqarish huquqi.', origin: 'Yunoncha' },
  { id: '15', term: 'Agressiya', category: 'Harbiy atamalar', definition: 'Bir davlatning boshqa davlat suvereniteti va hududiy yaxlitligiga qarshi qurolli hujumi.', origin: 'Lotincha' },

  // --- B ---
  { id: '16', term: 'Baqtriya', category: 'O‘zbekiston tarixi', definition: 'Amudaryoning o‘rta va yuqori havzasida joylashgan, markazi Baqtra (Balx) bo‘lgan eng qadimgi tarixiy viloyat va davlat.', period: 'Mil. avv. I mingyillik' },
  { id: '17', term: 'Bastiliya', category: 'Jahon tarixi', definition: 'Parijdagi qirollik qamoqxona-qal’asi; 1789-yil 14-iyulda xalq tomonidan olinishi Fransuz inqilobining ramziga aylangan.', period: '1789-yil' },
  { id: '18', term: 'Barshchina', category: 'Davlat va huquq', definition: 'Feodalizm davrida krepostnoy dehqonning yer egasi (pomeshchik) xo‘jaligida majburiy tekin mehnati.', origin: 'Slavyancha' },
  { id: '19', term: 'Bek', category: 'Davlat va huquq', definition: 'Turkiy xalqlarda ma’muriy hudud (beklik) yoki qabila boshlig‘i unvoni.', origin: 'Turkiy' },
  { id: '20', term: 'Beklik', category: 'O‘zbekiston tarixi', definition: 'Buxoro amirligi va Qo‘qon xonligida bek tomonidan boshqarilgan ma’muriy-hududiy birlik.', period: 'XVIII–XIX asrlar' },
  { id: '21', term: 'Birlashgan Millatlar Tashkiloti (BMT)', category: 'Jahon tarixi', definition: '1945-yil 24-oktabrda tinchlik va xavfsizlikni ta’minlash maqsadida tuzilgan global xalqaro tashkilot.', period: '1945-yildan hozirgacha' },
  { id: '22', term: 'Blitzkrieg (Yashin tezligidagi urush)', category: 'Harbiy atamalar', definition: 'Harbiy kuchlarning kutilmagan kuchli zarbasi orqali dushmanni qisqa kunlarda tor-mor etish strategiyasi.', origin: 'Nemischa' },
  { id: '23', term: 'Bobil (Vavilon)', category: 'Jahon tarixi', definition: 'Mesopotamiyadagi Dajla va Frot oralig‘ida joylashgan qadimgi dunyoning eng yirik madaniy va siyosiy markazi.', period: 'Mil. avv. II–I mingyillik' },
  { id: '24', term: 'Bolsheviklar', category: 'Jahon tarixi', definition: 'Rossiya sotsial-demokratik partiyasining Lenin boshchiligidagi qanoti; 1917-yil oktyabr to‘ntarishi orqali hokimiyatni egallagan.', origin: 'Ruscha: bolshinstvo' },
  { id: '25', term: 'Bosmachilik (Istiqlolchilik)', category: 'O‘zbekiston tarixi', definition: '1918–1930-yillarda Turkistonda sovet bosqinchi tuzumiga qarshi milliy mustaqillik uchun olib borilgan qurolli harakat.', period: '1918–1930' },
  { id: '26', term: 'Bronza davri', category: 'Madaniyat va din', definition: 'Mis va qalay qotishmasidan (bronza) qurollar va mehnat anjomlari yasalgan insoniyat davri.', period: 'Mil. avv. III–II mingyillik' },
  { id: '27', term: 'Buxoro amirligi', category: 'O‘zbekiston tarixi', definition: '1756–1920-yillarda Mang‘itlar sulolasi boshqargan markazi Buxoro bo‘lgan o‘zbek davlati.', period: '1756–1920' },
  { id: '28', term: 'Burjuaziya', category: 'Davlat va huquq', definition: 'Kapitalistik jamiyatda ishlab chiqarish vositalariga egalik qiluvchi va yollanma mehnatdan foydalanuvchi mulkdorlar sinfi.', origin: 'Fransuzcha' },
  { id: '29', term: 'Buyuk Ipak Yo‘li', category: 'O‘zbekiston tarixi', definition: 'Mil. avv. II asrdan milodiy XVI asrgacha Xitoydan O‘rta Yer dengiziga qadar cho‘zilgan transqit’aviy karvon savdo yo‘li.', period: 'Mil. avv. II — milodiy XVI asr' },
  { id: '30', term: 'Buyuk xalqlar ko‘chishi', category: 'Jahon tarixi', definition: 'IV–VII asrlarda hunnlar, germanlar va slavyanlarning Yevropaga ommaviy ko‘chishi va Rim imperiyasining qulashiga sabab bo‘lgan jarayon.', period: 'IV–VII asrlar' },

  // --- C / CH ---
  { id: '31', term: 'Choch (Shosh)', category: 'O‘zbekiston tarixi', definition: 'Toshkent vohasi va Chirchiq havzasining qadimgi va o‘rta asrlardagi tarixiy nomi.', period: 'Antik davr — o‘rta asrlar' },
  { id: '32', term: 'Cherkov bo‘linishi (Sxizma)', category: 'Madaniyat va din', definition: '1054-yilda xristian dinining Pravoslav (Sharqiy) va Katolik (G‘arbiy) cherkovlariga rasman bo‘linishi.', period: '1054-yil' },
  { id: '33', term: 'Chig‘atoy ulusi', category: 'O‘zbekiston tarixi', definition: 'Chingizxon imperiyasi parchalanishidan so‘ng uning o‘g‘li Chig‘atoyga berilgan Markaziy Osiyo hududidagi davlat.', period: '1227–1370' },
  { id: '34', term: 'Chin (Tsin) imperiyasi', category: 'Jahon tarixi', definition: 'Mil. avv. III asrda Xitoyni ilk bor birlashtirgan va Buyuk Xitoy devorini qurdirgan imperiya.', period: 'Mil. avv. 221–206' },

  // --- D ---
  { id: '35', term: 'Davan (Parkana)', category: 'O‘zbekiston tarixi', definition: 'Qadimgi Farg‘ona vodiysida vujudga kelgan, poytaxti Ershi bo‘lgan mustaqil qadimgi dehqonchilik davlati.', period: 'Mil. avv. III asr — mil. IV asr' },
  { id: '36', term: 'Deklaratsiya', category: 'Davlat va huquq', definition: 'Davlat yoki xalqaro tashkilotning asosiy qonuniy tamoyillari va maqsadlarini tantanali e’lon qiluvchi rasmiy hujjat.', origin: 'Lotincha: declaratio' },
  { id: '37', term: 'Demokratiya', category: 'Davlat va huquq', definition: 'Hokimiyat xalqqa tegishli bo‘lgan, fuqarolar teng huquqli va rahbarlar saylanadigan siyosiy tuzum.', origin: 'Yunoncha: demos — xalq, kratos — hokimiyat' },
  { id: '38', term: 'Devon', category: 'Davlat va huquq', definition: 'Musulmon Sharqida markaziy davlat mahkamasi, vazirlik yoki boshqaruv organi.', origin: 'Forscha/Arabcha' },
  { id: '39', term: 'Diktatura', category: 'Davlat va huquq', definition: 'Bir shaxs yoki guruhning hech qanday qonun bilan cheklanmagan mutlaq zo‘ravonlikka asoslangan hokimiyati.', origin: 'Lotincha' },
  { id: '40', term: 'Doshnoqlar (Doshnaksutyun)', category: 'O‘zbekiston tarixi', definition: '1918-yilda bolsheviklar tomonida turib Qo‘qon shahrini vayron qilgan va tinch aholini qirg‘in qilgan arman millatchi partiyasi qurolli kuchlari.', period: '1918-yil' },
  { id: '41', term: 'Dualizm', category: 'Madaniyat va din', definition: 'Borliqning ikki asosiy ibtidosi — ezgulik va yovuzlik (masalan, Zardushtiylikda Axuramazda va Axriman) kurashiga asoslangan qarash.', origin: 'Lotincha' },
  { id: '42', term: 'Duma', category: 'Davlat va huquq', definition: 'Rossiya imperiyasida 1905-yilgi inqilobdan so‘ng ta’sis etilgan vakillik qonun chiqaruvchi organi.', origin: 'Ruscha' },

  // --- E ---
  { id: '43', term: 'Eftaliylar davlati', category: 'O‘zbekiston tarixi', definition: 'V–VI asrlarda O‘rta Osiyo, Afg‘oniston va Shimoliy Hindistonni birlashtirgan qudratli ko‘chmanchilar davlati.', period: 'V–VI asrlar' },
  { id: '44', term: 'Ellinizm', category: 'Madaniyat va din', definition: 'Aleksandr Makedonskiy istilolaridan so‘ng qadimgi yunon madaniyatining Sharq madaniyatlari bilan sintezi davri.', period: 'Mil. avv. IV–I asrlar' },
  { id: '45', term: 'Eksport / Import', category: 'Davlat va huquq', definition: 'Mahsulotlarni chet elga sotish (eksport) va chet eldan sotib olib olib kirish (import).', origin: 'Lotincha' },
  { id: '46', term: 'Ekspansiya', category: 'Harbiy atamalar', definition: 'Bir davlatning boshqa hududlar va davlatlarga o‘z ta’sirini, hududini yoki iqtisodiy hukmronligini kengaytirishi.', origin: 'Lotincha' },
  { id: '47', term: 'Evakuatsiya', category: 'Harbiy atamalar', definition: 'Urush, ofat xavfi ostidagi hududlardan aholi, zavodlar va boyliklarni xavfsiz joylarga rejaviy ko‘chirish.', origin: 'Lotincha' },

  // --- F ---
  { id: '48', term: 'Fashizm', category: 'Jahon tarixi', definition: 'Mutlaq totalitarizm, irqiy ustunlik, tajovuzkor bosqinchilik va inson erkinliklarini yo‘q qilishga asoslangan o‘ta reaksion siyosiy oqim.', origin: 'Italyancha: fascio — birlik, dasta' },
  { id: '49', term: 'Falanga', category: 'Harbiy atamalar', definition: 'Qadimgi Yunoniston va Makedoniyada nayzador piyodalarning qat’iy zich saf tortgan harbiy jangovar tartibi.', origin: 'Yunoncha' },
  { id: '50', term: 'Fevral inqilobi', category: 'Jahon tarixi', definition: '1917-yil fevralda Rossiyada podsho Nikolay II monarxiyasini ag‘dargan demokratik inqilob.', period: '1917-yil fevral' },
  { id: '51', term: 'Feod (Len)', category: 'Davlat va huquq', definition: 'O‘rta asrlarda harbiy xizmat evaziga shartli ravishda beriladigan va merosiy o‘tadigan yer mulki.', origin: 'Lotincha' },
  { id: '52', term: 'Feodalizm', category: 'Davlat va huquq', definition: 'Yer egalari (feodallar) va ularga qaram bo‘lgan dehqonlar munosabatiga asoslangan ijtimoiy-iqtisodiy tuzum.', period: 'V–XVII asrlar' },
  { id: '53', term: 'Fitna (Fraksiya)', category: 'Harbiy atamalar', definition: 'Davlatga yoki qonuniy boshqaruvga qarshi yashirin til biriktirish va isyon ko‘tarish.', origin: 'Arabcha' },
  { id: '54', term: 'Fransuz kodeksi (Napoleon kodeksi)', category: 'Davlat va huquq', definition: '1804-yilda Napoleon tomonidan qabul qilingan va zamonaviy fuqarolik huquqiga asos bo‘lgan qonunlar to‘plami.', period: '1804-yil' },

  // --- G ---
  { id: '55', term: 'Gandimiyon shartnomasi', category: 'O‘zbekiston tarixi', definition: '1873-yil 12-avgustda Xiva xoni Muhammad Rahimxon II va general Kaufman o‘rtasida imzolangan, Xivani Rossiya protektoratiga aylantirgan bitim.', period: '1873-yil' },
  { id: '56', term: 'Genotsid (Qirg‘in)', category: 'Harbiy atamalar', definition: 'Muayyan milliy, etnik, irqiy yoki diniy guruhni qasddan butunlay yoki qisman yo‘q qilish jinoyati.', origin: 'Yunoncha: genos — urug‘, caedo — o‘ldirmoq' },
  { id: '57', term: 'Gerusiya', category: 'Davlat va huquq', definition: 'Qadimgi Spartadagi 28 nafar oqsoqol (60 yoshdan oshgan) va 2 shohdan iborat oqsoqollar kengashi.', origin: 'Yunoncha' },
  { id: '58', term: 'Gildiya', category: 'Madaniyat va din', definition: 'O‘rta asrlarda Yevropa shaharlarida savdogarlar yoki hunarmandlarning o‘z huquqlarini himoya qilish uchun tuzgan uyushmasi.', origin: 'Nemischa' },
  { id: '59', term: 'Gubernator', category: 'Davlat va huquq', definition: 'Rossiya imperiyasida ma’muriy viloyat yoki general-gubernatorlikning oliy harbiy-fuqarolik boshlig‘i.', origin: 'Lotincha' },

  // --- H ---
  { id: '60', term: 'Hammurapi qonunlari', category: 'Jahon tarixi', definition: 'Mil. avv. XVIII asrda Bobil shohi Hammurapi tomonidan bazalt toshga o‘yib yozilgan 282 moddali qadimgi qonunlar to‘plami.', period: 'Mil. avv. 1750-yillar' },
  { id: '61', term: 'Haqiqat sudi (Inkvizitsiya)', category: 'Madaniyat va din', definition: 'O‘rta asrlarda katolik cherkovi tomonidan dahriylar va bid’atchilarga qarshi kurash uchun tuzilgan shafqatsiz sud tizimi.', period: 'XIII–XIX asrlar' },
  { id: '62', term: 'Harbiy kommunizm', category: 'Jahon tarixi', definition: '1918–1921-yillarda sovet hukumati tomonidan fuqarolar urushi sharoitida joriy etilgan qat’iy oziq-ovqat taqsimoti va xususiy mulkni taqiqlash siyosati.', period: '1918–1921' },
  { id: '63', term: 'Hegemoniya', category: 'Harbiy atamalar', definition: 'Bir davlat yoki guruhning boshqalar ustidan to‘la rahbarligi va yetakchi siyosiy ustunligi.', origin: 'Yunoncha' },
  { id: '64', term: 'Hieroglif (Iyeroglif)', category: 'Madaniyat va din', definition: 'Qadimgi Misr, Xitoy va mayya xalqlarida butun so‘z yoki tushunchani ifodalovchi rasmli yozuv belgisi.', origin: 'Yunoncha' },

  // --- I ---
  { id: '65', term: 'Ichan qal’a', category: 'O‘zbekiston tarixi', definition: 'Xiva xonligining mustahkam devor bilan o‘ralgan ichki shahar me’moriy majmuasi; YuNESKO butunjahon merosi obidasi.', period: 'O‘rta asrlar' },
  { id: '66', term: 'Imperiya', category: 'Davlat va huquq', definition: 'Yagona markaziy mutlaq hokimiyat (imperator) ostida bir nechta mustamlakalar va xalqlarni zo‘rlik bilan birlashtirgan qudratli davlat.', origin: 'Lotincha: imperium — hokimiyat' },
  { id: '67', term: 'Industrializatsiya', category: 'Jahon tarixi', definition: 'Iqtisodiyotda mashinalashgan yirik sanoat korxonalari, zavod-fabrikalar va temir yo‘llarning jadal rivojlanish jarayoni.', period: 'XVIII–XX asrlar' },
  { id: '68', term: 'Inqilob (Revolyutsiya)', category: 'Davlat va huquq', definition: 'Jamiyatning siyosiy, ijtimoiy va iqtisodiy tuzumini tubdan, ko‘pincha qurolli yo‘l bilan butunlay o‘zgartiruvchi sakrash.', origin: 'Lotincha: revolutio — to‘ntarilish' },
  { id: '69', term: 'Inson va fuqaro huquqlari deklaratsiyasi', category: 'Jahon tarixi', definition: '1789-yil 26-avgustda Fransiyada qabul qilingan, insonning daxlsiz tabiiy erkinliklarini kafolatlagan tarixiy hujjat.', period: '1789-yil' },
  { id: '70', term: 'Inson huquqlari umumjahon deklaratsiyasi', category: 'Jahon tarixi', definition: '1948-yil 10-dekabrda BMT Bosh Assambleyasi tomonidan qabul qilingan universal xalqaro huquqiy hujjat.', period: '1948-yil' },
  { id: '71', term: 'Intervensiya', category: 'Harbiy atamalar', definition: 'Bir yoki bir nechta davlatning boshqa mustaqil davlatning ichki ishlariga zo‘rlik bilan, qurolli aralashuvi.', origin: 'Lotincha' },
  { id: '72', term: 'Irredentizm', category: 'Davlat va huquq', definition: 'Muayyan xalq yashaydigan hududlarni o‘zining tarixiy vataniga qaytarib qo‘shib olishga qaratilgan harakat.', origin: 'Italyancha' },

  // --- J ---
  { id: '73', term: 'Jadidchilik', category: 'O‘zbekiston tarixi', definition: 'XIX asr oxiri — XX asr boshida Turkistonda ma’rifat, maktab islohoti, matbuot va milliy ozodlik uchun kurashgan ma’rifatparvarlik harakati.', origin: 'Arabcha: jadid — yangi', period: '1890–1920-yillar' },
  { id: '74', term: 'Jarqo‘ton', category: 'O‘zbekiston tarixi', definition: 'Surxondaryo viloyatidagi bronza davriga oid ilk shahar alomatlari va otashparastlik ibodatxonasi topilgan arxeologik yodgorlik.', period: 'Mil. avv. II mingyillik' },
  { id: '75', term: 'Jangovar ittifoq (Koalitsiya)', category: 'Harbiy atamalar', definition: 'Umumiy dushmanga qarshi birgalikda urush olib borish uchun davlatlar o‘rtasida tuzilgan vaqtinchalik harbiy birlashma.', origin: 'Lotincha' },
  { id: '76', term: 'Jizya', category: 'Madaniyat va din', definition: 'Musulmon davlatlarida musulmon bo‘lmagan fuqarolar (ahli zimma)dan ularning xavfsizligini ta’minlash evaziga olinadigan jon solig‘i.', origin: 'Arabcha' },

  // --- K ---
  { id: '77', term: 'Kamolon darvozasi', category: 'O‘zbekiston tarixi', definition: '1865-yil iyunida general Chernyayev boshchiligidagi chor qo‘shinlariga qarshi Toshkent himoyachilari qattiq qarshilik ko‘rsatgan tarixiy darvoza.', period: '1865-yil' },
  { id: '78', term: 'Karib inqirozi', category: 'Jahon tarixi', definition: '1962-yil oktabrda AQSh va SSSR o‘rtasida Kubada sovet yadroviy raketalari joylashtirilishi tufayli kelib chiqqan o‘ta xavfli keskinlik.', period: '1962-yil' },
  { id: '79', term: 'Karta (Xarita)', category: 'Madaniyat va din', definition: 'Yer yuzasi yoki uning qismining kichraytirilgan, umumlashtirilgan shartli belgilar orqali tekislikda tasvirlanishi.', origin: 'Yunoncha' },
  { id: '80', term: 'Kesh', category: 'O‘zbekiston tarixi', definition: 'Qadimgi va o‘rta asrlarda Shahrisabz shahrining tarixiy nomi; Amir Temur tavallud topgan voha markazi.', period: 'O‘rta asrlar' },
  { id: '81', term: 'Klinopis (Mixxat)', category: 'Madaniyat va din', definition: 'Loy taxtachalarga maxsus qamish qalam bilan bosib yoziladigan qadimgi Shumer va Bobil yozuvi.', period: 'Mil. avv. IV–I mingyillik' },
  { id: '82', term: 'Konfederatsiya', category: 'Davlat va huquq', definition: 'Mustaqil davlatlarning muayyan umumiy (asosan tashqi siyosat va mudofaa) maqsadlar uchun tuzgan ittifoqi.', origin: 'Lotincha' },
  { id: '83', term: 'Konstitutsiya', category: 'Davlat va huquq', definition: 'Davlatning siyosiy tuzilishi, inson huquqlari va hokimiyat vakolatlarini belgilovchi oliy yuridik kuchga ega Bosh qonun.', origin: 'Lotincha: constitutio — tuzilish' },
  { id: '84', term: 'Konsul', category: 'Davlat va huquq', definition: 'Qadimgi Rim Respublikasida xalq majlisi tomonidan har yili bir yil muddatga saylanadigan 2 nafar oliy hukumat boshlig‘i.', origin: 'Lotincha' },
  { id: '85', term: 'Kompenn sulhi', category: 'Harbiy atamalar', definition: '1918-yil 11-noyabrda Antanta va Germaniya o‘rtasida Birinchi jahon urushini to‘xtatgan sulh bitimi.', period: '1918-yil' },
  { id: '86', term: 'Kushon imperiyasi', category: 'O‘zbekiston tarixi', definition: 'Milodiy I–III asrlarda Kanishka boshchiligida O‘rta Osiyo, Afg‘oniston va Hindistonni birlashtirgan buyuk davlat.', period: 'Milodiy I–III asrlar' },
  { id: '87', term: 'Kuch — adolatdadir (Rosti-rusti)', category: 'O‘zbekiston tarixi', definition: 'Amir Temur davlatining bosh tamoyili va davlat muhriga o‘yib yozilgan asosiy qonuniy shior.', period: '1370–1405' },

  // --- L ---
  { id: '88', term: 'Legion', category: 'Harbiy atamalar', definition: 'Qadimgi Rim armiyasining asosiy harbiy-taktik birligi (taxminan 4000–6000 piyoda va otliq askar).', origin: 'Lotincha: legio — yig‘moq' },
  { id: '89', term: 'Lend-Liz (Lend-Lease)', category: 'Harbiy atamalar', definition: 'Ikkinchi jahon urushida AQShning o‘z ittifoqchilariga (SSSR, Buyuk Britaniya) qurol-yarog‘, xomashyo va oziq-ovqat yetkazib berish dasturi.', period: '1941–1945' },
  { id: '90', term: 'Liberalizm', category: 'Davlat va huquq', definition: 'Inson erkinligi, xususiy mulk daxlsizligi va erkin bozor qoidalarini ustuvor deb biluvchi ijtimoiy-falsafiy oqim.', origin: 'Lotincha: liberalis — erkin' },
  { id: '91', term: 'Loy jangi', category: 'O‘zbekiston tarixi', definition: '1365-yil 22-mayda Chinoz yaqinida Amir Temur va Amir Husayn qo‘shinlarining mo‘g‘ul xoni Ilyosxo‘jaga qarshi olib borgan shiddatli jangi.', period: '1365-yil' },

  // --- M ---
  { id: '92', term: 'Madalixon', category: 'O‘zbekiston tarixi', definition: '1822–1842-yillarda Qo‘qon xonligini boshqargan, xonlik hududini kengaytirgan ma’rifatparvar xon (Nodirabegimning o‘g‘li).', period: 'XIX asr' },
  { id: '93', term: 'Magna Charta (Erkinliklar buyuk xartiyasi)', category: 'Jahon tarixi', definition: '1215-yilda Angliya qiroli Ioann Yersiz tomonidan imzolangan, qirol hokimiyatini qonun bilan cheklagan tarixiy hujjat.', period: '1215-yil' },
  { id: '94', term: 'Mang‘itlar sulolasi', category: 'O‘zbekiston tarixi', definition: '1756–1920-yillarda Buxoro amirligida hukmronlik qilgan o‘zbek sulolasi (Muhammad Rahim, Shohmurod, Nasrullo, Olimxon).', period: '1756–1920' },
  { id: '95', term: 'Ma’mun akademiyasi', category: 'O‘zbekiston tarixi', definition: '1004-yilda Xorazmshoh Ali ibn Ma’mun va Ma’mun II tomonidan asos solingan, Beruniy va Ibn Sino ishlagan buyuk ilmiy markaz.', period: 'XI asr' },
  { id: '96', term: 'Marafon jangi', category: 'Harbiy atamalar', definition: 'Mil. avv. 490-yilda yunonlar sarkardasi Miltiadning forslar ustidan qozongan tarixiy g‘alabasi.', period: 'Mil. avv. 490-yil' },
  { id: '97', term: 'Mardikorlik', category: 'O‘zbekiston tarixi', definition: 'Birinchi jahon urushida chor Rossiyasi hukumatining Turkiston tub aholisini front ortidagi qora ishlarga majburiy safarbar qilishi.', period: '1916-yil' },
  { id: '98', term: 'Metropoliya', category: 'Davlat va huquq', definition: 'O‘zga mamlakat va hududlarni bosib olib, ularni o‘z mustamlakasiga aylantirgan davlat (masalan, Buyuk Britaniya Hindistonga nisbatan).', origin: 'Yunoncha' },
  { id: '99', term: 'Mezolit', category: 'Madaniyat va din', definition: 'O‘rta tosh davri; o‘q-yoy kashf etilgan va hayvonlar xonakilashtirila boshlangan davr.', period: 'Mil. avv. XII–VII mingyillik' },
  { id: '100', term: 'Millatlar Ligasi', category: 'Jahon tarixi', definition: 'Birinchi jahon urushidan keyin (1919) xalqaro tinchlikni ta’minlash uchun tuzilgan xalqaro tashkilot.', period: '1919–1946' },
  { id: '101', term: 'Minglar sulolasi', category: 'O‘zbekiston tarixi', definition: '1709–1876-yillarda Qo‘qon xonligini boshqargan o‘zbek urug‘i va sulolasi (Shohruxbiy, Umarxon, Xudoyorxon).', period: '1709–1876' },
  { id: '102', term: 'Monarxiya', category: 'Davlat va huquq', definition: 'Oliy davlat hokimiyati bir kishi (podsho, qirol, xon, amir) qo‘lida bo‘lgan va merosiy o‘tadigan boshqaruv shakli.', origin: 'Yunoncha' },
  { id: '103', term: 'Mustamlakachilik (Kolonializm)', category: 'Davlat va huquq', definition: 'Iqtisodiy va harbiy jihatdan kuchli davlatlarning ojiz mamlakatlarni bosib olib, ularning boyliklarini talash tizimi.', period: 'XVI–XX asrlar' },
  { id: '104', term: 'Muxtoriyat (Turkiston Muxtoriyati)', category: 'O‘zbekiston tarixi', definition: '1917-yil 27-noyabrda Qo‘qonda tuzilgan va 1918-yil fevralda bolsheviklar tomonidan ag‘darilgan ilk demokratik respublika.', period: '1917–1918' },

  // --- N ---
  { id: '105', term: 'Natsizm (Milliy-sotsializm)', category: 'Jahon tarixi', definition: 'Gitler boshchiligidagi fashistik Germaniyaning agressiv, irqiy ustunlikka asoslangan jinoiy davlat mafkurasi.', period: '1933–1945' },
  { id: '106', term: 'Neandertal odami', category: 'Madaniyat va din', definition: 'O‘rta paleolit (mustye) davrida yashagan qadimgi odam turi; qoldiqlari Surxondaryodagi Teshiktosh g‘oridan topilgan.', period: 'Mil. avv. 100–40 ming yillik' },
  { id: '107', term: 'Neolit inqilobi', category: 'Madaniyat va din', definition: 'Insoniyatning tayyor narsani o‘zlashtirishdan o‘zi dehqonchilik va chorvachilik bilan mahsulot yetishtirishga o‘tish davri.', period: 'Mil. avv. VI–IV mingyillik' },
  { id: '108', term: 'NATO (Shimoliy Atlantika Ittifoqi)', category: 'Harbiy atamalar', definition: '1949-yilda AQSh va G‘arbiy Yevropa davlatlari tomonidan tuzilgan harbiy-siyosiy blok.', period: '1949-yildan hozirgacha' },
  { id: '109', term: 'Normandiya desanti (Overlord operatsiyasi)', category: 'Harbiy atamalar', definition: '1944-yil 6-iyunda AQSh va Buyuk Britaniya qo‘shinlarining Fransiyaga tushirilishi bilan Ikkinchi frontning ochilishi.', period: '1944-yil' },
  { id: '110', term: 'Noib', category: 'Davlat va huquq', definition: 'Musulmon davlatlarida hukmdor nomidan viloyat yoki shaharni boshqaruvchi o‘rinbosar amaldor.', origin: 'Arabcha' },

  // --- O / O‘ ---
  { id: '111', term: 'Oligarxiya', category: 'Davlat va huquq', definition: 'Davlat hokimiyati bir hovuch boy va nufuzli aslzodalar qo‘lida bo‘lgan boshqaruv shakli (masalan, qadimgi Sparta).', origin: 'Yunoncha' },
  { id: '112', term: 'Oltin O‘rda', category: 'O‘zbekiston tarixi', definition: 'Chingizxonning nabirasi Botuxon tomonidan asos solingan ulkan dasht davlati; Amir Temur zarbalari natijasida zaiflashgan.', period: '1240–1502' },
  { id: '113', term: 'Oqsaroy', category: 'O‘zbekiston tarixi', definition: 'Amir Temur tomonidan Shahrisabzda bunyod etilgan muhtasham qarorgoh va saroy majmuasi.', period: 'XIV asr' },
  { id: '114', term: 'Ostrakizm', category: 'Davlat va huquq', definition: 'Qadimgi Afinada demokratiyaga xavf solgan shaxslarni sopol parchasiga (ostrakon) ovoz berib, shahardan 10 yilga quvg‘in qilish usuli.', origin: 'Yunoncha' },
  { id: '115', term: 'O‘tror fojiasi', category: 'O‘zbekiston tarixi', definition: '1218-yilda Xorazmshoh noibi G‘oyirxon tomonidan Chingizxon savdo karvoni va elchilarining qatl etilishi; mo‘g‘ul bosqiniga sabab bo‘lgan voqea.', period: '1218-yil' },
  { id: '116', term: 'O‘nlik tizimi', category: 'Harbiy atamalar', definition: 'Qadimgi ko‘chmanchilar va Amir Temur qo‘shinlarining 10, 100, 1000 va 10 000 (tuman) kishilik bo‘linmalarga ajratilgan harbiy tuzilishi.', period: 'Antik davr — o‘rta asrlar' },

  // --- P ---
  { id: '117', term: 'Padarkush', category: 'O‘zbekiston tarixi', definition: 'Mahmudxo‘ja Behbudiy tomonidan 1911-yilda yozilgan, jaholat oqibatlarini fosh etgan birinchi o‘zbek milliy dramasi.', period: '1911-yil' },
  { id: '118', term: 'Paleolit', category: 'Madaniyat va din', definition: 'Qadimgi tosh davri; inson paydo bo‘lishidan to mil. avv. XII mingyillikkacha davom etgan eng uzoq davr.', origin: 'Yunoncha: palaios — qadimiy, lithos — tosh' },
  { id: '119', term: 'Parvon jangi', category: 'O‘zbekiston tarixi', definition: '1221-yilda Jaloliddin Manguberdining mo‘g‘ul sarkardasi Shiki Xutuxu ustidan qozongan yirik g‘alabasi.', period: '1221-yil' },
  { id: '120', term: 'Patrisiy', category: 'Davlat va huquq', definition: 'Qadimgi Rimda to‘la huquqli tub joy aslzodalar tabaqasiga mansub fuqaro.', origin: 'Lotincha: pater — ota' },
  { id: '121', term: 'Plebey', category: 'Davlat va huquq', definition: 'Qadimgi Rimda patrisiylardan keyin kelgan, dastlab siyosiy huquqlari cheklangan oddiy erkin xalq tabaqasi.', origin: 'Lotincha: plebs' },
  { id: '122', term: 'Polis', category: 'Davlat va huquq', definition: 'Qadimgi Yunoniston va Italiyadagi mustaqil shahar-davlat (masalan, Afina, Sparta, Korinf).', origin: 'Yunoncha' },
  { id: '123', term: 'Protektorat', category: 'Davlat va huquq', definition: 'Bir davlatning boshqa kuchli davlatga tashqi aloqalar va harbiy sohada to‘la qaram bo‘lib qolishi (masalan, 1868-yildan Buxoro amirligi).', origin: 'Lotincha' },
  { id: '124', term: 'Proletariat', category: 'Davlat va huquq', definition: 'Kapitalistik jamiyatda o‘z ishlab chiqarish vositalariga ega bo‘lmagan, yollanib ishlovchi ishchilar sinfi.', origin: 'Lotincha' },
  { id: '125', term: 'Piramidalar', category: 'Jahon tarixi', definition: 'Qadimgi Misr fir’avnlari (Xufu, Xafra, Menkaura) uchun Nil vodiysida toshdan barpo etilgan ulkan maqbaralar.', period: 'Mil. avv. III mingyillik' },

  // --- Q ---
  { id: '126', term: 'Qang‘ davlati', category: 'O‘zbekiston tarixi', definition: 'Mil. avv. III asr — milodiy V asrlarda Sirdaryo havzasida hukm surgan, poytaxti Bityan bo‘lgan qudratli davlat.', period: 'Antik davr' },
  { id: '127', term: 'Qatag‘on (Repressiya)', category: 'O‘zbekiston tarixi', definition: '1937–1938-yillarda sovet mustabid tuzumi tomonidan o‘zbek milliy ziyolilarini ommaviy hibsga olish va qatl etish fojiasi.', period: '1937–1938' },
  { id: '128', term: 'Qo‘qon xonligi', category: 'O‘zbekiston tarixi', definition: '1709–1876-yillarda Farg‘ona vodiysi, Toshkent va Yettisuv hududida hukm surgan o‘zbek xonligi.', period: '1709–1876' },
  { id: '129', term: 'Qo‘shbegi', category: 'O‘zbekiston tarixi', definition: 'Buxoro amirligi va Qo‘qon xonligida bosh vazir va ichki ishlar boshqaruvchisining oliy unvoni.', origin: 'Turkiy' },
  { id: '130', term: 'Qoraxoniylar davlati', category: 'O‘zbekiston tarixi', definition: '999–1212-yillarda Movarounnahr va Yettisuvda hukmronlik qilgan ilk islomiy turkiy sulola davlati.', period: '999–1212' },
  { id: '131', term: 'Qurultoy', category: 'Davlat va huquq', definition: 'Turkiy va mo‘g‘ul xalqlarida oliy harbiy-feodal zodagonlar kengashi (masalan, 1370-yilgi Balx qurultoyi).', origin: 'Turkiy' },

  // --- R ---
  { id: '132', term: 'Rasadxona', category: 'O‘zbekiston tarixi', definition: 'Osmon jismlari va yulduzlar harakatini kuzatish uchun maxsus asboblar (sekstant) bilan jihozlangan ilmiy bino (masalan, Ulug‘bek rasadxonasi).', origin: 'Arabcha: rasad — kuzatmoq' },
  { id: '133', term: 'Renessans (Uyg‘onish)', category: 'Madaniyat va din', definition: 'Ilm-fan, falsafa, adabiyot va san’atning umuminsoniy qadriyatlar asosida yuksak rivojlanishi va yangilanishi davri.', origin: 'Fransuzcha: Renaissance' },
  { id: '134', term: 'Reparatsiya', category: 'Harbiy atamalar', definition: 'Urushda yengilgan tajovuzkor davlat tomonidan yetkazilgan zararni qoplash uchun g‘olib davlatlarga to‘lanadigan tovon puli.', origin: 'Lotincha' },
  { id: '135', term: 'Respublika', category: 'Davlat va huquq', definition: 'Oliy hokimiyat organlari xalq tomonidan muayyan muddatga saylanadigan davlat boshqaruv shakli.', origin: 'Lotincha: res publica — umumiy ish' },
  { id: '136', term: 'Rim huquqi', category: 'Davlat va huquq', definition: 'Qadimgi Rimda shakllangan va keyinchalik butun dunyo fuqarolik qonunchiligi asosiga aylangan huquqiy tizim.', period: 'Antik davr' },
  { id: '137', term: 'Rostlik — najotdir (Rosti-rusti)', category: 'O‘zbekiston tarixi', definition: 'Amir Temur davlat boshqaruvining asosiy axloqiy va siyosiy shiori.', origin: 'Forscha' },

  // --- S ---
  { id: '138', term: 'Salib yurishlari', category: 'Jahon tarixi', definition: '1096–1291-yillarda G‘arbiy Yevropa ritsarlarining "Muqaddas qabrni qutqarish" shiori ostida Yaqin Sharqqa uyushtirgan harbiy bosqinlari.', period: 'XI–XIII asrlar' },
  { id: '139', term: 'Samoderjaviye', category: 'Davlat va huquq', definition: 'Rossiya imperiyasida podshoning hech qanday qonun bilan cheklanmagan mutlaq yakka hokimiyati.', origin: 'Ruscha' },
  { id: '140', term: 'Sanoat to‘ntarishi (inqilobi)', category: 'Jahon tarixi', definition: 'XVIII asr oxiri — XIX asrda qo‘l mehnatidan yirik mashinalashgan sanoat ishlab chiqarishiga o‘tish jarayoni.', period: 'XVIII–XIX asrlar' },
  { id: '141', term: 'Sarayevo suiqasdi', category: 'Harbiy atamalar', definition: '1914-yil 28-iyunda Avstriya taxt vorisi Frans Ferdinandning o‘ldirilishi; Birinchi jahon urushining boshlanishiga bahona bo‘lgan voqea.', period: '1914-yil' },
  { id: '142', term: 'Satrap / Satrapiya', category: 'Davlat va huquq', definition: 'Qadimgi Ahamoniylar (Fors) davlatida viloyat hokimi (satrap) va unga qarashli ma’muriy viloyat (satrapiya).', origin: 'Forscha' },
  { id: '143', term: 'Sekstant', category: 'O‘zbekiston tarixi', definition: 'Yulduzlarning ufqdan balandligini o‘lchash uchun rasadxonalarga o‘rnatilgan yirik doiraviy astronomik asbob.', origin: 'Lotincha' },
  { id: '144', term: 'Selung‘ur', category: 'O‘zbekiston tarixi', definition: 'Farg‘ona vodiysida joylashgan, ilk paleolit davriga oid eng qadimgi odam suyaklari topilgan manzilgoh.', period: 'Ilk paleolit' },
  { id: '145', term: 'Senat', category: 'Davlat va huquq', definition: 'Qadimgi Rimda oqsoqollar va zodagonlarning oliy davlat organi; zamonaviy davlatlarda parlamentning yuqori palatasi.', origin: 'Lotincha: senex — qariya' },
  { id: '146', term: 'Sivilizatsiya', category: 'Madaniyat va din', definition: 'Jamiyatning yozuv, shaharlar, davlat va ma’naviy madaniyat rivoji bilan tavsiflanuvchi taraqqiyot bosqichi.', origin: 'Lotincha: civilis — fuqarolik' },
  { id: '147', term: 'So‘g‘diyona (So‘g‘d)', category: 'O‘zbekiston tarixi', definition: 'Zarafshon va Qashqadaryo vohasida joylashgan, markazi Samarqand bo‘lgan qadimgi tarixiy o‘lka.', period: 'Mil. avv. I mingyillik' },
  { id: '148', term: 'Somoniylar davlati', category: 'O‘zbekiston tarixi', definition: '875–999-yillarda Movarounnahr va Xurosonda hukm surgan, poytaxti Buxoro bo‘lgan markazlashgan davlat.', period: '875–999' },
  { id: '149', term: 'Soyurg‘ol', category: 'O‘zbekiston tarixi', definition: 'Temuriylar davrida davlat yoki harbiy xizmat evaziga beriladigan merosiy yer mulki.', origin: 'Mo‘g‘ulcha: in’om' },
  { id: '150', term: 'Sovuq urush', category: 'Jahon tarixi', definition: '1945–1991-yillarda AQSh va SSSR boshchiligidagi ikki blok o‘rtasidagi global mafkuraviy va harbiy poyga.', period: '1945–1991' },
  { id: '151', term: 'SSSR (Sovet Ittifoqi)', category: 'Jahon tarixi', definition: '1922–1991-yillarda mavjud bo‘lgan kommunistik totalitar tuzumga asoslangan 15 respublikadan iborat davlat.', period: '1922–1991' },
  { id: '152', term: 'Stalingrad jangi', category: 'Harbiy atamalar', definition: '1942–1943-yillarda fashistik qo‘shinlarning Volga bo‘yida tor-mor etilishi va Ikkinchi jahon urushidagi tub burilish jangi.', period: '1942–1943' },
  { id: '153', term: 'Suverenitet', category: 'Davlat va huquq', definition: 'Davlatning o‘z hududida to‘la hokimiyatga egaligi va tashqi munosabatlarda mustaqilligi.', origin: 'Fransuzcha: souverainete' },
  { id: '154', term: 'Strateg', category: 'Harbiy atamalar', definition: 'Qadimgi Afinada xalq majlisi tomonidan saylanadigan oliy harbiy boshliq va lashkarboshi.', origin: 'Yunoncha' },

  // --- T ---
  { id: '155', term: 'Taqsimot (Reyxstag)', category: 'Harbiy atamalar', definition: 'Berlindagi parlament binosi; 1945-yil 30-aprelda uning ustiga g‘alaba bayrog‘i qadalgan.', period: '1945-yil' },
  { id: '156', term: 'Temur tuzuklari', category: 'O‘zbekiston tarixi', definition: 'Amir Temur tomonidan yaratilgan, davlat boshqaruvi, qo‘shin tuzilishi va qonunchilikka oid tarixiy asar.', period: 'XIV asr' },
  { id: '157', term: 'Teshiktosh', category: 'O‘zbekiston tarixi', definition: 'Boysun tog‘laridagi neandertal odami suyagi va dafn qabri ochilgan o‘rta paleolit manzilgohi.', period: 'Mustye davri' },
  { id: '158', term: 'Totalitarizm', category: 'Davlat va huquq', definition: 'Davlat jamiyat va inson hayotining barcha sohalarini to‘liq nazorat qiladigan mustabid siyosiy rejim.', origin: 'Lotincha: totalis — butun, to‘liq' },
  { id: '159', term: 'Triyera', category: 'Harbiy atamalar', definition: 'Qadimgi Yunoniston va Rimda uch qator eshkakli tez suzuvchi harbiy kema.', origin: 'Yunoncha' },
  { id: '160', term: 'Turk xoqonligi', category: 'O‘zbekiston tarixi', definition: '552–744-yillarda Oltoy, Markaziy Osiyo va Dashti Qipchoqda hukm surgan ulkan turkiy imperiya.', period: 'VI–VIII asrlar' },
  { id: '161', term: 'Tarkhon (Tarxon)', category: 'O‘zbekiston tarixi', definition: 'O‘rta asrlarda soliqlardan ozod qilingan va oliy imtiyozlarga ega bo‘lgan zodagon unvoni.', origin: 'Turkiy' },

  // --- U / V ---
  { id: '162', term: 'Uchlar ittifoqi', category: 'Harbiy atamalar', definition: '1882-yilda Germaniya, Avstriya-Vengriya va Italiya o‘rtasida tuzilgan harbiy blok.', period: '1882–1915' },
  { id: '163', term: 'Urug‘chilik tuzumi', category: 'Madaniyat va din', definition: 'Qon-qardoshlik aloqalari, umumiy mehnat va mulkka asoslangan ibtidoiy jamoa shakli.', period: 'Ibtidoiy davr' },
  { id: '164', term: 'Usuli jadid', category: 'O‘zbekiston tarixi', definition: 'Tovush (savtiya) metodiga asoslangan, dunyoviy bilimlarni o‘rgatuvchi jadid yangi usul maktabi.', period: 'XIX asr oxiri — XX asr' },
  { id: '165', term: 'Usmonli imperiyasi', category: 'Jahon tarixi', definition: '1299–1922-yillarda mavjud bo‘lgan, poytaxti Istanbul bo‘lgan uch qit’aga yoyilgan ulkan musulmon imperiyasi.', period: '1299–1922' },
  { id: '166', term: 'Uyg‘onish davri (Renessans)', category: 'Madaniyat va din', definition: 'Gumanizm va antik merosga qiziqish asosida san’at va ilm-fanning qayta gullab-yashnash davri.', period: 'XIV–XVI asrlar' },
  { id: '167', term: 'Vassallik', category: 'Davlat va huquq', definition: 'O‘rta asrlarda kichik feodalning (vassal) yirik feodalga (senor) yer va himoya evaziga harbiy xizmat o‘tashga asoslangan qaramligi.', origin: 'Lotincha' },
  { id: '168', term: 'Versal sulhi', category: 'Jahon tarixi', definition: '1919-yil 28-iyunda imzolangan, Birinchi jahon urushining rasmiy natijalarini belgilab bergan tinchlik shartnomasi.', period: '1919-yil' },
  { id: '169', term: 'Vizantiya imperiyasi', category: 'Jahon tarixi', definition: 'Sharqiy Rim imperiyasining tarixiy nomi; poytaxti Konstantinopol (395–1453).', period: '395–1453' },

  // --- X ---
  { id: '170', term: 'Xalifalik (Arab xalifaligi)', category: 'Jahon tarixi', definition: 'VII asrda Arabiston yarimorolida paydo bo‘lib, Shimoliy Afrika, Yaqin Sharq va Movarounnahrni qamrab olgan teokratik davlat.', period: 'VII–XIII asrlar' },
  { id: '171', term: 'Xiva xonligi', category: 'O‘zbekiston tarixi', definition: 'XVI asr boshidan 1920-yilgacha Xorazm hududida mavjud bo‘lgan o‘zbek davlati.', period: '1511–1920' },
  { id: '172', term: 'Xorazmshohlar davlati', category: 'O‘zbekiston tarixi', definition: 'Anushteginiylar sulolasi boshqargan, XIII asr boshida mo‘g‘ullar bosqini natijasida qulagan qudratli saltanat.', period: '1097–1231' },
  { id: '173', term: 'Xiroj', category: 'Davlat va huquq', definition: 'Musulmon Sharqida qishloq xo‘jaligi mahsulotlaridan olinadigan asosiy yer solig‘i.', origin: 'Arabcha' },

  // --- Y / Z ---
  { id: '174', term: 'Yadro poygasi', category: 'Harbiy atamalar', definition: 'Sovuq urush davrida AQSh va SSSR o‘rtasida ommaviy qirg‘in qurollarini to‘xtovsiz ko‘paytirish kurashi.', period: '1945–1991' },
  { id: '175', term: 'Yangi iqtisodiy siyosat (NEP)', category: 'Jahon tarixi', definition: '1921-yilda sovet hukumati tomonidan qisman bozor munosabatlari va xususiy savdoga ruxsat bergan siyosat.', period: '1921–1928' },
  { id: '176', term: 'Yasa (Chingizxon yasasi)', category: 'Davlat va huquq', definition: 'Chingizxon tomonidan imperiyada qat’iy tartib o‘rnatish uchun joriy qilingan harbiy va fuqarolik qonunlar to‘plami.', period: 'XIII asr' },
  { id: '177', term: 'Yurt', category: 'O‘zbekiston tarixi', definition: 'Ko‘chmanchi xalqlarning yig‘ma kigiz uyi; shuningdek, vatan, hudud ma’nosida ishlatilgan tushuncha.', origin: 'Turkiy' },
  { id: '178', term: 'Zardushtiylik', category: 'Madaniyat va din', definition: 'O‘rta Osiyo va qadimgi Eronda vujudga kelgan, olovni ulug‘lagan va "Ezgu fikr, ezgu so‘z, ezgu amal" shioriga asoslangan qadimgi din.', period: 'Mil. avv. II–I mingyillik' },
  { id: '179', term: 'Zij (Ziji Ko‘ragoniy)', category: 'O‘zbekiston tarixi', definition: 'Mirzo Ulug‘bek tomonidan 1018 ta yulduz harakati hisoblangan dunyoga mashhur astronomik jadval.', period: 'XV asr' },
  { id: '180', term: 'Zirabuloq jangi', category: 'O‘zbekiston tarixi', definition: '1868-yil 2-iyunda Buxoro amiri qo‘shinlari bilan general fon Kaufman qo‘shinlari o‘rtasida bo‘lib o‘tgan va Buxoroning mag‘lubiyati bilan yakunlangan jang.', period: '1868-yil' },

  // --- Yangi boyitilgan atamalar (181 - 240) ---
  { id: '181', term: 'Hammurapi qonunlari', category: 'Davlat va huquq', definition: 'Mil. avv. XVIII asrda Bobil podshosi Hammurapi tomonidan qora bazalt toshga o‘yib yozilgan, 282 moddadan iborat insoniyat tarixidagi eng mukammal ilk qonunlar majmuasi.', period: 'Mil. avv. 1750-yillar' },
  { id: '182', term: 'Rozetta toshi', category: 'Madaniyat va din', definition: '1799-yilda Misrda topilgan, uch xil yozuvda (iyeroglif, demotik, yunoncha) yozilgan va Jan-Fransua Shampolyon tomonidan Misr xatining sirini ochishga yordam bergan tosh lavha.', period: 'Mil. avv. 196-yil' },
  { id: '183', term: 'Marafon jangi', category: 'Harbiy atamalar', definition: 'Mil. avv. 490-yilda afinaliklarning Doro I forslar qo‘shini ustidan qozongan g‘alabasi; xushxabarchi chopar yugurib o‘tgan 42 km masofa hozirgi marafon yugurishiga asos bo‘lgan.', period: 'Mil. avv. 490-yil' },
  { id: '184', term: 'Fermopil jangi', category: 'Harbiy atamalar', definition: 'Mil. avv. 480-yilda Sparta podshosi Leonid boshchiligidagi 300 spartalik jangchining Kserksning yuz minglik fors armiyasiga qarshi afsonaviy mudofaa jangi.', period: 'Mil. avv. 480-yil' },
  { id: '185', term: 'Punik urushlari', category: 'Harbiy atamalar', definition: 'Mil. avv. 264–146-yillarda Rim Respublikasi bilan Karfagen o‘rtasida O‘rta Yer dengizida hukmronlik uchun kechgan uchta yirik urush; Karfagenning to‘liq yo‘q qilinishi bilan yakunlangan.', period: 'Mil. avv. III–II asrlar' },
  { id: '186', term: 'Magna Charta (Erkinliklarning buyuk xartiyasi)', category: 'Davlat va huquq', definition: '1215-yilda Angliya qiroli Ioann Yersiz tomonidan imzolangan, qirol hokimiyatini qonun bilan cheklagan va inson huquqlariga poydevor qo‘ygan tarixiy hujjat.', period: '1215-yil' },
  { id: '187', term: 'Yuz yillik urush', category: 'Harbiy atamalar', definition: '1337–1453-yillarda Angliya va Fransiya o‘rtasida hududlar uchun olib borilgan va Janna d’Ark qahramonligi bilan Fransiyaning g‘alabasi bilan tugagan urush.', period: '1337–1453' },
  { id: '188', term: 'Konstantinopolning fath etilishi', category: 'Jahon tarixi', definition: '1453-yil 29-mayda Usmonli sultoni Mehmed II Fotih tomonidan Vizantiya poytaxtining egallanishi va O‘rta asrlar tugab, Yangi davr boshlanishi ramzi.', period: '1453-yil' },
  { id: '189', term: 'Vaterloo jangi', category: 'Harbiy atamalar', definition: '1815-yil 18-iyunda Belgiya yaqinida Napoleon Bonapart qo‘shinlarining ingliz-pruss armiyasi tomonidan so‘nggi bor mag‘lub etilishi.', period: '1815-yil' },
  { id: '190', term: 'Millatlar Ligasi', category: 'Jahon tarixi', definition: 'Birinchi jahon urushidan so‘ng (1919) xalqaro tinchlikni saqlash maqsadida tuzilgan ilk xalqaro tashkilot; BMTning salaflari sanaladi.', period: '1919–1946' },
  { id: '191', term: 'Nyurnberg xalqaro harbiy tribunali', category: 'Davlat va huquq', definition: '1945–1946-yillarda fashistik Germaniyaning bosh urush jinoyatchilari ustidan o‘tkazilgan xalqaro sud jarayoni.', period: '1945–1946' },
  { id: '192', term: 'NATO (Shimoliy Atlantika Alyansi)', category: 'Harbiy atamalar', definition: '1949-yilda Vashingtonda tuzilgan, a’zo davlatlarning kollektiv mudofaasini ta’minlovchi harbiy-siyosiy ittifoq.', period: '1949-yildan hozirgacha' },
  { id: '193', term: 'Varshava shartnomasi tashkiloti', category: 'Harbiy atamalar', definition: '1955–1991-yillarda sovet bloki davlatlarini NATOga qarshi birlashtirgan harbiy ittifoq.', period: '1955–1991' },
  { id: '194', term: 'Karib inqirozi', category: 'Harbiy atamalar', definition: '1962-yil oktabrida AQSh va SSSR o‘rtasida Kubaga sovet yadroviy raketalarining joylashtirilishi oqibatida yuzaga kelgan yadro urushi xavfi.', period: '1962-yil' },
  { id: '195', term: 'Berlin devorining qulashi', category: 'Jahon tarixi', definition: '1989-yil 9-noyabrda Germaniyani va butun Yevropani ikkiga ajratib turgan devorning buzib tashlanishi va Sovuq urush yakunining ramzi.', period: '1989-yil' },
  { id: '196', term: 'O‘tror fojiasi', category: 'O‘zbekiston tarixi', definition: '1218-yilda O‘tror hokimi Qayirxon tomonidan Chingizxon yuborgan 500 tuyalik savdo karvoni a’zolarining qatl etilishi va mo‘g‘ullar bosqiniga bahona bo‘lgan fojia.', period: '1218-yil' },
  { id: '197', term: 'G‘ijduvon jangi', category: 'O‘zbekiston tarixi', definition: '1512-yil 12-noyabrda Ubaydullaxon boshchiligidagi o‘zbek qo‘shinlarining Eron safaviylari lashkari (Najmi Soniy) ustidan qozongan hal qiluvchi g‘alabasi.', period: '1512-yil' },
  { id: '198', term: 'Kampirtepa (Aleksandriya Oksiana)', category: 'O‘zbekiston tarixi', definition: 'Surxondaryoda Amudaryo sohilida joylashgan, Aleksandr Makedonskiy davriga oid muhim port-shahar va xalqaro arxeologik yodgorlik.', period: 'Mil. avv. IV asr — milodiy III asr' },
  { id: '199', term: 'Dalvarzintepa tillalari', category: 'O‘zbekiston tarixi', definition: 'Surxondaryodagi Kushonlar poytaxtlaridan biri Dalvarzintepadan topilgan 36 kg sof oltin taqinchoqlar va san’at durdonalari xazinasi.', period: 'I–II asrlar' },
  { id: '200', term: 'Afrosiyob devoriy suratlari', category: 'Madaniyat va din', definition: 'Samarqandning qadimgi Afrosiyob shahar xarobasidan topilgan, VII asr So‘g‘d ixshidi Varxuman saroyidagi elchilar qabul marosimi tasvirlangan nodir freskalar.', period: 'VII asr' },
  { id: '201', term: 'Katta Langar Qur’oni', category: 'Madaniyat va din', definition: 'VIII asrga tegishli kufiy xatida pergamentga bitilgan eng qadimiy muqaddas Qur’on qo‘lyozmalaridan biri.', period: 'VIII asr' },
  { id: '202', term: 'Daxma (Chilpiq)', category: 'Madaniyat va din', definition: 'Qoraqalpog‘istonda joylashgan, zardushtiylik an’anasi bo‘yicha marhumlarning jasadini suyakka ajratish uchun qurilgan qadimgi minora-inshoot.', period: 'Mil. avv. II asr — milodiy IV asr' },
  { id: '203', term: 'Tuproqqal’a', category: 'O‘zbekiston tarixi', definition: 'Qadimgi Xorazm hukmdorlarining ulkan saroyi, saroy kutubxonasi va yog‘ochga bitilgan xorazmiy hujjatlar topilgan yodgorlik.', period: 'III–IV asrlar' },
  { id: '204', term: 'Turkiston general-gubernatorligi', category: 'Davlat va huquq', definition: '1867–1917-yillarda Chor Rossiyasi tomonidan zabt etilgan O‘rta Osiyo yerlarini mustamlakachilik asosida boshqarish uchun tuzilgan harbiy-ma’muriy hudud.', period: '1867–1917' },
  { id: '205', term: 'Turkiston Muxtoriyati', category: 'Davlat va huquq', definition: '1917-yil 27-noyabrda Qo‘qonda e’lon qilingan, Turkiston xalqlarining ilk demokratik milliy hukumati (Bosh vaziri Mustafo Cho‘qay).', period: '1917–1918' },
  { id: '206', term: 'Yosh buxoroliklar', category: 'Davlat va huquq', definition: 'XX asr boshida Buxoro amirligida mutlaq monarxiyani cheklash, konstitutsiyaviy islohotlar va jadid maktablari ochish uchun kurashgan siyosiy tashkilot.', period: '1910–1920' },
  { id: '207', term: 'Yosh xivaliklar', category: 'Davlat va huquq', definition: 'Xiva xonligida Polvonniyoz Hoji Yusupov boshchiligida xon zulmini tugatish va mamlakatni yangilash uchun tuzilgan milliy-demokratik partiya.', period: '1917–1920' },
  { id: '208', term: 'Milliy Ittihod', category: 'Davlat va huquq', definition: '1920-yillarda Turkiston mustaqilligi va bolsheviklar mustamlakachiligiga qarshi faoliyat olib borgan yashirin milliy tashkilot.', period: '1920-yillar' },
  { id: '209', term: 'Ommaviy qatag‘on (Katta qirg‘in)', category: 'Davlat va huquq', definition: '1937–1938-yillarda Stalin tuzumi tomonidan milliy ziyolilar (Cho‘lpon, Fitrat, Qodiriy, Fayzulla Xo‘jayev)ni jismonan yo‘q qilish siyosati.', period: '1937–1938' },
  { id: '210', term: '«Paxta ishi» («O‘zbeklar ishi»)', category: 'Davlat va huquq', definition: '1980-yillarda SSSR Bosh prokuraturasi tergovchilari (Gdlyan va Ivanov) tomonidan O‘zbekiston xalqiga nisbatan asossiz tuhmat va qatag‘on kampaniyasi.', period: '1983–1989' },
  { id: '211', term: 'Mustaqillik deklaratsiyasi', category: 'Davlat va huquq', definition: '1990-yil 20-iyunda O‘zbekiston Oliy Kengashining ikkinchi sessiyasida qabul qilingan, davlat mustaqilligining huquqiy poydevori bo‘lgan hujjat.', period: '1990-yil' },
  { id: '212', term: 'O‘zbekiston Respublikasi Konstitutsiyasi', category: 'Davlat va huquq', definition: '1992-yil 8-dekabrda qabul qilingan, inson huquqlari, xalq suvereniteti va qonun ustuvorligini kafolatlovchi bosh qomus.', period: '1992-yildan hozirgacha' },
  { id: '213', term: 'Shanxay Hamkorlik Tashkiloti (ShHT)', category: 'Jahon tarixi', definition: '2001-yil 15-iyunda Shanxayda O‘zbekiston, Qozog‘iston, Qirg‘iziston, Rossiya, Tojikiston va Xitoy tomonidan tuzilgan xalqaro xavfsizlik va iqtisodiy tashkilot.', period: '2001-yildan hozirgacha' },
  { id: '214', term: 'Perestroyka (Qayta qurish)', category: 'Jahon tarixi', definition: '1985–1991-yillarda M. Gorbachyov boshchiligida SSSRda iqtisodiy va siyosiy tizimni isloh qilishga qaratilgan, biroq davlat qulashiga olib kelgan siyosat.', period: '1985–1991' },
  { id: '215', term: 'Oshkoralik (Glasnost)', category: 'Jahon tarixi', definition: 'SSSRda tsenzuraning yumshatilishi, tarixiy haqiqatlar va matbuot erkinligiga yo‘l ochgan siyosiy ochiqlik jarayoni.', period: '1986–1991' },
];
