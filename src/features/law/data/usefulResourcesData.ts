export interface LegalResource {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  descriptionRu: string;
  url: string;
  category: 'official_database' | 'court' | 'consultation' | 'governance';
  badge: string;
}

export const USEFUL_LEGAL_RESOURCES: LegalResource[] = [
  {
    id: 'lex-uz',
    name: 'Lex.uz — Qonunchilik ma’lumotlari milliy bazasi',
    nameRu: 'Lex.uz — Национальная база данных законодательства',
    description: 'O‘zbekiston Respublikasining barcha normativ-huquqiy hujjatlari rasmiy e’lon qilinadigan yagona davlat portali.',
    descriptionRu: 'Единый государственный портал официального опубликования всех нормативно-правовых актов Узбекистана.',
    url: 'https://lex.uz/',
    category: 'official_database',
    badge: 'Rasmiy manba',
  },
  {
    id: 'advice-uz',
    name: 'Advice.uz — Huquqiy axborot portali',
    nameRu: 'Advice.uz — Портал правовой информации',
    description: 'Fuqarolar uchun bepul huquqiy maslahatlar, namunaviy arizalar va hayotiy vaziyatlar bo‘yicha qo‘llanmalar.',
    descriptionRu: 'Бесплатные юридические консультации для граждан, образцы заявлений и руководства по жизненным ситуациям.',
    url: 'https://advice.uz/',
    category: 'consultation',
    badge: 'Bepul maslahat',
  },
  {
    id: 'sud-uz',
    name: 'Sud.uz — O‘zbekiston Respublikasi Oliy sudi',
    nameRu: 'Sud.uz — Верховный суд Республики Узбекистан',
    description: 'Sud qarorlari axborot tizimi, sud amaliyoti, plenum qarorlari va elektron sudlov xizmatlari.',
    descriptionRu: 'Информационная система судебных решений, пленумы Верховного суда и электронное правосудие.',
    url: 'https://sud.uz/',
    category: 'court',
    badge: 'Sud amaliyoti',
  },
  {
    id: 'minjust-uz',
    name: 'Adliya vazirligi rasmiy portali',
    nameRu: 'Министерство юстиции Республики Узбекистан',
    description: 'Huquqiy siyosat, normativ hujjatlar ekspertizasi va davlat xizmatlari reyestri.',
    descriptionRu: 'Правовая политика, правовая экспертиза актов и реестр государственных услуг.',
    url: 'https://adliya.uz/',
    category: 'governance',
    badge: 'Davlat organi',
  },
  {
    id: 'meningfikrim-uz',
    name: 'Mening fikrim — Jamoaviy murojaatlar portali',
    nameRu: 'Mening fikrim — Портал коллективных обращений',
    description: 'Fuqarolarning qonunchilikka o‘zgartirish kiritish bo‘yicha jamoaviy elektron murojaatlari portali.',
    descriptionRu: 'Портал коллективных электронных обращений граждан по изменению законодательства.',
    url: 'https://meningfikrim.uz/',
    category: 'governance',
    badge: 'Fuqarolik tashabbusi',
  },
  {
    id: 'parliament-gov-uz',
    name: 'Oliy Majlis Qonunchilik palatasi',
    nameRu: 'Законодательная палата Олий Мажлиса',
    description: 'Qonun loyihalari muhokamasi, qabul qilingan qonunlar va parlament nazorati axborotlari.',
    descriptionRu: 'Обсуждение законопроектов, принятые законы и информация о парламентском контроле.',
    url: 'https://parliament.gov.uz/',
    category: 'official_database',
    badge: 'Parlament',
  },
];
