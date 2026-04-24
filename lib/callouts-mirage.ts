export type Callout = {
  id: string;
  en: string;
  ru: string;
  es: string;
  poly: string;
  desc_en: string;
  desc_ru: string;
  desc_es: string;
};

export const MIRAGE_CALLOUTS: Callout[] = [
  { id: "t_spawn",   en: "T Spawn",        ru: "Т-спавн",        es: "T Spawn",          poly: "40,40 240,40 240,160 40,160",
    desc_en: "Terrorist starting area. Where every round decision begins.",
    desc_ru: "Спавн террористов. Отсюда начинается любой раунд.",
    desc_es: "Spawn de los Ts. De acá arrancan todas las jugadas." },
  { id: "t_ramp",    en: "T Ramp",         ru: "Т-рамп",         es: "Ramp T",           poly: "80,160 240,160 240,240 160,240",
    desc_en: "The elevated pathway from T spawn toward Palace and Underpass.",
    desc_ru: "Наклонный проход от Т-спавна к Дворцу и Андерпассу.",
    desc_es: "Rampa elevada del spawn T hacia Palace y Underpass." },
  { id: "palace",    en: "Palace",         ru: "Дворец",         es: "Palace",           poly: "260,40 420,40 420,200 320,200 280,160 260,160",
    desc_en: "T-side elevated position overlooking A Site. A-execute starts here.",
    desc_ru: "Верхняя Т-позиция над А-плентом. Исполнения А начинаются здесь.",
    desc_es: "Posición alta del lado T sobre el A. Los execute A salen de acá." },
  { id: "ticket",    en: "Ticket Booth",   ru: "Касса",          es: "Cabina",           poly: "440,40 600,40 600,140 440,140",
    desc_en: "Tiny stand near A Ramp — classic hiding spot and post-plant angle.",
    desc_ru: "Будочка у А-рампы. Классика для поста и засидки.",
    desc_es: "Puestito cerca del A Ramp. Escondite clásico para post-plant." },
  { id: "a_ramp",    en: "A Ramp",         ru: "А-рамп",         es: "Ramp A",           poly: "440,160 620,160 620,260 460,260",
    desc_en: "The main T entry onto A Site from the right side.",
    desc_ru: "Главный Т-заход на А-плент справа.",
    desc_es: "Entrada principal al A desde la derecha como T." },
  { id: "a_site",    en: "A Site",         ru: "А-плент",        es: "Sitio A",          poly: "640,40 780,40 780,320 640,320",
    desc_en: "Bombsite A. The bomb goes here. Defenders stack from behind.",
    desc_ru: "А-плент. Тут ставят бомбу. Защита отжимает сзади.",
    desc_es: "Sitio A. Acá plantan. Los CT defienden desde atrás." },
  { id: "default",   en: "Default",        ru: "Дефолт",         es: "Default",          poly: "680,180 740,180 740,260 680,260",
    desc_en: "The default plant spot on A — centered and contested.",
    desc_ru: "Дефолтное место постановки на А — центральное и спорное.",
    desc_es: "Lugar default para plantar en A — central y disputado." },
  { id: "ninja",     en: "Ninja",          ru: "Ниндзя",         es: "Ninja",            poly: "640,260 700,260 700,320 640,320",
    desc_en: "Deep corner on A — classic ninja defuse spot.",
    desc_ru: "Дальний угол А — классическое место для ниндзя-дефьюза.",
    desc_es: "Rincón profundo del A — lugar clásico para ninja defuse." },
  { id: "triple",    en: "Triple",         ru: "Трипл",          es: "Triple",           poly: "700,60 770,60 770,130 700,130",
    desc_en: "Three boxes stacked near CT entry to A. AWP heaven.",
    desc_ru: "Три ящика у СТ-входа на А. Рай для AWP.",
    desc_es: "Tres cajas cerca de la entrada CT al A. Paraíso para AWP." },
  { id: "jungle",    en: "Jungle",         ru: "Джунгли",        es: "Jungle",           poly: "460,280 600,280 600,380 480,380",
    desc_en: "Mid-to-A connector. IGLs fight for Jungle control early.",
    desc_ru: "Коннектор из мида в А. IGL'ы бьются за контроль Джунглей рано.",
    desc_es: "Conector Mid-A. Los IGL pelean por el control temprano." },
  { id: "connector", en: "Connector",      ru: "Коннектор",      es: "Conector",         poly: "540,400 620,400 620,480 560,480",
    desc_en: "CT-side rotation corridor between A and Mid.",
    desc_ru: "СТ-коридор ротаций между А и мидом.",
    desc_es: "Pasillo de rotación CT entre A y Mid." },
  { id: "catwalk",   en: "Catwalk",        ru: "Кэт",            es: "Cat",              poly: "440,300 540,300 540,400 460,400",
    desc_en: "Also called A Short. Elevated walkway from Mid into A.",
    desc_ru: "Он же A Short. Верхний проход из мида в А.",
    desc_es: "También A Short. Pasarela elevada de Mid al A." },
  { id: "top_mid",   en: "Top Mid",        ru: "Топ-мид",        es: "Mid arriba",       poly: "360,160 440,160 440,340 360,340",
    desc_en: "The T-side of Mid. AWPers duel through here round one.",
    desc_ru: "Т-сторона мида. Сюда AWP'еры идут на дуэль первого раунда.",
    desc_es: "Lado T del mid. Los AWPers duelan acá en la primera ronda." },
  { id: "mid",       en: "Mid",            ru: "Мид",            es: "Mid",              poly: "360,360 440,360 440,540 360,540",
    desc_en: "The central chokepoint. Winning Mid opens splits to both sites.",
    desc_ru: "Центральный проход. Контроль мида открывает сплиты на обе.",
    desc_es: "Choke central. Ganar Mid abre split a ambos sitios." },
  { id: "window",    en: "Window Room",    ru: "Окно",           es: "Ventana",          poly: "240,380 360,380 360,500 240,500",
    desc_en: "A room with a window into B. Watches Apps and Short.",
    desc_ru: "Комната с окном на Б. Держит Апсы и Шорт.",
    desc_es: "Sala con ventana al B. Cubre Apps y Short." },
  { id: "sandwich",  en: "Sandwich",       ru: "Сэндвич",        es: "Sandwich",         poly: "240,300 360,300 360,380 240,380",
    desc_en: "Narrow passage between T Ramp and Window. Rotations go here.",
    desc_ru: "Узкий коридор между Т-рампой и Окном. Здесь ротации.",
    desc_es: "Pasaje angosto entre T Ramp y Ventana. Rotan por acá." },
  { id: "short",     en: "B Short / Apps", ru: "Б-шорт / Аппс",  es: "Short B / Apps",   poly: "40,520 220,520 220,640 40,640",
    desc_en: "T-side entrance to B. Short apartments — the main B-rush path.",
    desc_ru: "Т-заход на Б. Шорт/Апартаменты — главный путь на Б-раш.",
    desc_es: "Entrada T al B. Short/Apartamentos — ruta principal del B-rush." },
  { id: "b_site",    en: "B Site",         ru: "Б-плент",        es: "Sitio B",          poly: "40,660 280,660 280,780 40,780",
    desc_en: "Bombsite B. Smaller, tighter, smoke-heavy executes live here.",
    desc_ru: "Б-плент. Меньше, теснее, смоук-зависимые исполнения здесь.",
    desc_es: "Sitio B. Más chico, más cerrado, execute con mucho humo." },
  { id: "van",       en: "Van",            ru: "Ван",            es: "Van",              poly: "60,680 140,680 140,740 60,740",
    desc_en: "The truck inside B Site. Key plant cover.",
    desc_ru: "Грузовик внутри Б-плента. Ключевое прикрытие для постановки.",
    desc_es: "La camioneta adentro del B. Cobertura clave para plantar." },
  { id: "bench",     en: "Bench",          ru: "Лавка",          es: "Banco",            poly: "180,680 250,680 250,740 180,740",
    desc_en: "Bench position on B — common plant behind it.",
    desc_ru: "Лавка на Б — за ней часто ставят.",
    desc_es: "Banco en B — común plantar detrás." },
  { id: "kitchen",   en: "Kitchen",        ru: "Кухня",          es: "Cocina",           poly: "300,660 420,660 420,780 300,780",
    desc_en: "CT-side back room on B. Rotating defender pops out of here.",
    desc_ru: "СТ-комната на Б. Отсюда выходит ротирующий защитник.",
    desc_es: "Sala trasera CT del B. De acá sale el defensor rotando." },
  { id: "market",    en: "Market",         ru: "Маркет",         es: "Mercado",          poly: "240,520 360,520 360,640 240,640",
    desc_en: "Middle-B area between Apps and Kitchen. Holds the B-Short push.",
    desc_ru: "Центр Б между Апсами и Кухней. Держит пуш с Шорта.",
    desc_es: "Centro de B entre Apps y Cocina. Contiene el push de Short." },
  { id: "ct_spawn",  en: "CT Spawn",       ru: "СТ-спавн",       es: "Spawn CT",         poly: "640,560 780,560 780,760 640,760",
    desc_en: "Counter-Terrorist starting area. All rotations begin here.",
    desc_ru: "Спавн СТ. Отсюда начинаются все ротации.",
    desc_es: "Spawn de los CT. Acá arrancan todas las rotaciones." },
];

export const centroid = (pts: string): [number, number] => {
  const coords = pts.split(" ").map((p) => p.split(",").map(Number));
  const n = coords.length;
  return [coords.reduce((s, [x]) => s + x, 0) / n, coords.reduce((s, [, y]) => s + y, 0) / n];
};

export const pointInPolygon = (x: number, y: number, pts: string): boolean => {
  const coords = pts.split(" ").map((p) => p.split(",").map(Number));
  let inside = false;
  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const [xi, yi] = coords[i], [xj, yj] = coords[j];
    const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};
