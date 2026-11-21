import { LawCategory } from '@/types';

export interface CategoryInfo {
  id: LawCategory;
  nameUz: string;
  nameRu: string;
  descriptionUz: string;
  descriptionRu: string;
  iconName: string;
  count: number;
}

export const LAW_CATEGORIES: CategoryInfo[] = [
  {
    id: 'konstitutsiya',
    nameUz: 'Konstitutsiya',
    nameRu: 'Конституция',
    descriptionUz: 'Davlatning oliy yuridik kuchga ega bo‘lgan asosiy qonuni',
    descriptionRu: 'Основной закон государства высшей юридической силы',
    iconName: 'ShieldCheck',
    count: 1,
  },
  {
    id: 'kodekslar',
    nameUz: 'Kodekslar',
    nameRu: 'Кодексы',
    descriptionUz: 'Muayyan sohadagi huquqiy normalarni tizimlashtiruvchi yirik hujjatlar',
    descriptionRu: 'Систематизированные законодательные акты в отдельных отраслях права',
    iconName: 'BookMarked',
    count: 18,
  },
  {
    id: 'qonunlar',
    nameUz: 'Qonunlar',
    nameRu: 'Законы',
    descriptionUz: 'Oliy Majlis tomonidan qabul qilinadigan davlat qonunlari',
    descriptionRu: 'Законы, принимаемые Олий Мажлисом Республики Узбекистан',
    iconName: 'FileText',
    count: 1240,
  },
  {
    id: 'prezident_farmonlari',
    nameUz: 'Prezident farmonlari',
    nameRu: 'Указы Президента',
    descriptionUz: 'O‘zbekiston Respublikasi Prezidentining farmonlari (PF)',
    descriptionRu: 'Указы Президента Республики Узбекистан (УП)',
    iconName: 'Award',
    count: 3450,
  },
  {
    id: 'prezident_qarorlari',
    nameUz: 'Prezident qarorlari',
    nameRu: 'Постановления Президента',
    descriptionUz: 'O‘zbekiston Respublikasi Prezidentining qarorlari (PQ)',
    descriptionRu: 'Постановления Президента Республики Узбекистан (ПП)',
    iconName: 'Scroll',
    count: 5120,
  },
  {
    id: 'vm_qarorlari',
    nameUz: 'Vazirlar Mahkamasi qarorlari',
    nameRu: 'Постановления Кабмина',
    descriptionUz: 'Hukumat ijroiya faoliyatini tartibga soluvchi qarorlar (VMQ)',
    descriptionRu: 'Постановления Кабинета Министров Республики Узбекистан (ПКМ)',
    iconName: 'Building2',
    count: 7890,
  },
  {
    id: 'vazirlik_hujjatlari',
    nameUz: 'Vazirlik va idoralar hujjatlari',
    nameRu: 'Акты министерств и ведомств',
    descriptionUz: 'Adliya vazirligida davlat ro‘yxatidan o‘tgan idoraviy hujjatlar',
    descriptionRu: 'Ведомственные акты, зарегистрированные Министерством юстиции',
    iconName: 'Landmark',
    count: 4320,
  },
  {
    id: 'boshqa_hujjatlar',
    nameUz: 'Boshqa normativ-huquqiy hujjatlar',
    nameRu: 'Другие правовые акты',
    descriptionUz: 'Davlat dasturlari, kontsepsiyalar, yo‘l xaritalari va nizomlar',
    descriptionRu: 'Государственные программы, концепции и положения',
    iconName: 'FolderArchive',
    count: 1560,
  },
];
