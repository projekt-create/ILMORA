export interface BattleTactics {
  id: string;
  topicId: string;
  battleName: string;
  date: string;
  location: string;
  belligerents: {
    sideA: { name: string; commander: string; strength: string; color: string };
    sideB: { name: string; commander: string; strength: string; color: string };
  };
  outcome: string;
  tacticalDescription: string;
  keyPhases: { phase: string; description: string }[];
  mapSvgType: 'ww1-front' | 'ww2-stalingrad' | 'parvon' | 'anqara';
}

export const battleTacticsData: Record<string, BattleTactics> = {
  'world-ww1-empires-fall': {
    id: 'ww1-battle',
    topicId: 'world-ww1-empires-fall',
    battleName: 'Marna jangi va G‘arbiy front harakatlari (1914)',
    date: '1914-yil 5–12-sentabr',
    location: 'Fransiya, Marna daryosi bo‘yi',
    belligerents: {
      sideA: { name: 'Antanta (Fransiya & Britaniya)', commander: 'General Joffr, Jon Frenч', strength: '1 070 000 askar', color: '#3b82f6' },
      sideB: { name: 'Germaniya imperiyasi', commander: 'General fon Moltke', strength: '900 000 askar', color: '#ef4444' },
    },
    outcome: 'Fransiya va Angliya g‘alabasi; Shliffen rejasining barbod bo‘lishi',
    tacticalDescription: 'Germaniya qo‘shinlari Belgiya orqali kutilmaganda Parijga bostirib kirishga urindi. Ammo fransuz qo‘mondonligi Parij taksilari yordamida tezkor kuch to‘plab, Germaniya 1 va 2-armiyalari orasidagi bo‘shliqqa qanotdan qarshi zarba berdi va dushmanni chekinishga majbur qildi.',
    keyPhases: [
      { phase: '1. Shliffen rejasi hujumi', description: 'Germaniya o‘ng qanot qo‘shinlari Belgiya orqali Fransiyani tezda taslim qilish uchun janubga bostirib kirdi.' },
      { phase: '2. Qanot yorilishi', description: 'General Kluk armiyasi Parij sharqidan o‘tayotganda qanotini ochib qo‘ydi.' },
      { phase: '3. Antanta qarshi zarbasi', description: 'Marna daryosi bo‘yida yorib kirilgan bo‘shliqqa fransuz va ingliz kuchlari qanotdan kuchli zarba berdi.' },
    ],
    mapSvgType: 'ww1-front',
  },
  'world-ww2': {
    id: 'ww2-stalingrad',
    topicId: 'world-ww2',
    battleName: 'Stalingrad jangi — «Uran» operatsiyasi (1942–1943)',
    date: '1942-yil 19-noyabr — 1943-yil 2-fevral',
    location: 'Stalingrad (Volgograd), Volga daryosi',
    belligerents: {
      sideA: { name: 'Sovet armiyasi (Antifashistik koalitsiya)', commander: 'G. Jukov, A. Vasilevskiy', strength: '1 100 000 askar, 1500 tank', color: '#10b981' },
      sideB: { name: 'Fashistik blok (Germaniya, Ruminiya, Italiya)', commander: 'General-feldmarshal F. Paulus', strength: '1 011 000 askar', color: '#ef4444' },
    },
    outcome: 'Paulusning 330 minglik 6-armiyasining to‘liq qurshovga olinishi va taslim bo‘lishi',
    tacticalDescription: 'Stalingrad ichidagi qonli ko‘cha janglarida dushman kuchi charchatildi. 1942-yil 19-noyabrda «Uran» operatsiyasi bilan shimoliy (Janubi-g‘arbiy front) va janubiy (Stalingrad fronti) qanotlardan qisqich (qurshov) zarbasi berilib, Kalach shahrida fashistlarning butun armiyasi halqaga olindi.',
    keyPhases: [
      { phase: '1. Shahar ichidagi mudofaa', description: 'Volga daryosi qirg‘og‘idagi har bir uy, bino (Pavlov uyi) uchun shafqatsiz qarshilik.' },
      { phase: '2. Qisqich hujumi (Uran operatsiyasi)', description: 'Shimol va janubdagi ojiz Ruminiya va Italiya qanotlariga sovet tank kolonnalarining yorib kirishi.' },
      { phase: '3. Kalachda halqaning yopilishi', description: '23-noyabrda ikki front kuchlari tutashib, 330 ming dushmanni to‘liq qurshovga oldi.' },
    ],
    mapSvgType: 'ww2-stalingrad',
  },
  'uzbekistan-khorezmshah-mongol': {
    id: 'parvon-battle',
    topicId: 'uzbekistan-khorezmshah-mongol',
    battleName: 'Parvon jangi — Jaloliddin Manguberdining buyuk g‘alabasi',
    date: '1221-yil bahor',
    location: 'Parvon dashti (hozirgi Afg‘oniston)',
    belligerents: {
      sideA: { name: 'Jaloliddin Manguberdi qo‘shini', commander: 'Sulton Jaloliddin Manguberdi', strength: 'Taxminan 60 000 askar', color: '#10b981' },
      sideB: { name: 'Chingizxon mo‘g‘ul qo‘shini', commander: 'Shiki Xutuxu no‘yon', strength: '45 000 saralangan otliq', color: '#ef4444' },
    },
    outcome: 'Mo‘g‘ul qo‘shinining butunlay tor-mor etilishi va Chingizxonning shaxsan jangga kirishga majbur bo‘lishi',
    tacticalDescription: 'Jaloliddin tog‘li tor daralardan unumli foydalandi. Mo‘g‘ullar hiyla ishlatib cho‘pdan soxta askarlar yasaganida ham Jaloliddin dovdiramay, piyoda kamonchilarni qoyalarga joylashtirdi va markazdan otliqlar bilan yorib o‘tib, mo‘g‘ullarni qanotlardan qisib tor-mor qildi.',
    keyPhases: [
      { phase: '1. Mo‘g‘ul hujumi va kamonchilar to‘sig‘i', description: 'Jaloliddinning mohir merganlari tor darada mo‘g‘ul otliqlarini to‘xtatdi.' },
      { phase: '2. Qanotlardan o‘rab olish', description: 'Jaloliddin o‘ng va so‘l qanotlardan shiddatli zarba berib dushmanning safini buzdi.' },
      { phase: '3. Yengilmaslik afsonasining barham topishi', description: 'Mo‘g‘ul bosh qo‘mondoni Shiki Xutuxu qochishga majbur bo‘ldi.' },
    ],
    mapSvgType: 'parvon',
  },
  'uzbekistan-temurids': {
    id: 'anqara-battle',
    topicId: 'uzbekistan-temurids',
    battleName: 'Anqara jangi — Ikki buyuk saltanat to‘qnashuvi (1402)',
    date: '1402-yil 20-iyul',
    location: 'Anqara yaqini, Chubuq tekisligi',
    belligerents: {
      sideA: { name: 'Amir Temur saltanati', commander: 'Sohibqiron Amir Temur', strength: 'Taxminan 140 000 askar, jangovar fillar', color: '#3b82f6' },
      sideB: { name: 'Usmonli imperiyasi', commander: 'Sulton Boyazid I Yildirim', strength: 'Taxminan 85 000 askar, serb ritsarlari', color: '#ef4444' },
    },
    outcome: 'Amir Temurning mutlaq g‘alabasi, Boyazidning asir olinishi',
    tacticalDescription: 'Amir Temur dushmanga nisbatan aqlbovar qilmas tezkor manyovr qildi. Boyazid Temurni kutayotgan joydan aylanib o‘tib, Usmonlilar orqasiga chiqdi, barcha suv manbalari va quduqlarni to‘sib qo‘ydi. O‘zbekistonlik jangovar fillar va qanot manyovrlari dushmanni sarosimaga soldi.',
    keyPhases: [
      { phase: '1. Manyovr va suv manbalarini egallash', description: 'Amir Temur Chubuq daryosi o‘zanini o‘zgartirib, Boyazid askarlarini suvsiz qoldirdi.' },
      { phase: '2. Jangovar fillar zarbasi', description: 'Markazga joylashtirilgan 32 ta jangovar fil dushman piyoda saflarini parokanda qildi.' },
      { phase: '3. Qanotlardan qurshov', description: 'Shahzoda Mironshoh va Shohrux qanotlardan qisib, Boyazid qo‘shinini qopqonga tushirdi.' },
    ],
    mapSvgType: 'anqara',
  },
};
