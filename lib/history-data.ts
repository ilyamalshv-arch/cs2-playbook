import type { Lang } from "./i18n";

export type HistoryEvent = {
  id: string;
  year: number;
  month?: number; // 1-12
  era: "cs16" | "css" | "csgo" | "cs2";
  category: "team" | "player" | "tactic" | "moment" | "meta";
  title: Record<Lang, string>;
  blurb: Record<Lang, string>;
  body: Record<Lang, string>;
  tags: string[];
  links?: { label: string; url: string }[];
  iconic?: boolean; // highlight extra big
};

export const HISTORY_EVENTS: HistoryEvent[] = [
  {
    id: "cs_birth",
    year: 1999,
    month: 6,
    era: "cs16",
    category: "meta",
    iconic: true,
    title: {
      en: "Counter-Strike 1.0 released",
      ru: "Релиз Counter-Strike 1.0",
      es: "Lanzamiento de Counter-Strike 1.0",
    },
    blurb: {
      en: "Minh Le and Jess Cliffe release a Half-Life mod. Nothing in shooters will be the same.",
      ru: "Минь Ле и Джесс Клифф выпускают мод для Half-Life. Жанр уже не будет прежним.",
      es: "Minh Le y Jess Cliffe lanzan un mod de Half-Life. Los shooters ya no serán los mismos.",
    },
    body: {
      en: "A college project by two students becomes the defining competitive shooter of its era. The mod emphasized team coordination over individual skill, round-based pacing over respawn chaos, and economy over kill-count. Every tactical shooter that came after — Valorant, Rainbow Six, Rush — traces its DNA here.",
      ru: "Студенческий проект двух парней становится определяющим соревновательным шутером эпохи. Мод делал упор на командную игру вместо индивидуальных фрагов, раундовую структуру вместо респаун-хаоса, и экономику вместо голого килл-счёта. Каждый тактический шутер, что пришёл после — Valorant, Rainbow Six, Rush — несёт эту ДНК.",
      es: "Un proyecto universitario de dos chicos se convierte en el shooter competitivo definitorio de su era. El mod priorizó la coordinación del equipo sobre la habilidad individual, el ritmo por rondas sobre el caos del respawn, y la economía sobre el conteo de kills. Cada shooter táctico posterior — Valorant, Rainbow Six, Rush — tiene esta DNA.",
    },
    tags: ["1.0", "mod", "half-life"],
  },
  {
    id: "cpl_2001",
    year: 2001,
    month: 12,
    era: "cs16",
    category: "moment",
    title: {
      en: "CPL Winter 2001 — first world champions",
      ru: "CPL Winter 2001 — первые чемпионы мира",
      es: "CPL Winter 2001 — primeros campeones del mundo",
    },
    blurb: {
      en: "Team NoA (Germany) wins the first major international LAN. Pro CS is born.",
      ru: "Team NoA (Германия) выигрывает первый международный LAN-мейджор. Профессиональный CS родился.",
      es: "Team NoA (Alemania) gana el primer LAN internacional. El CS pro ha nacido.",
    },
    body: {
      en: "The Cyberathlete Professional League hosted the first truly international CS event. HeatoN, SpawN and the Swedes proved that CS was not a hobby but a sport — with tactics, strategies, and careers.",
      ru: "Cyberathlete Professional League провела первое по-настоящему международное CS-событие. HeatoN, SpawN и шведы показали: CS — не хобби, а спорт со своими тактиками, стратегиями и карьерами.",
      es: "La Cyberathlete Professional League organizó el primer evento internacional de CS. HeatoN, SpawN y los suecos demostraron que el CS no era un hobby sino un deporte — con tácticas, estrategias y carreras.",
    },
    tags: ["CPL", "HeatoN", "SpawN"],
  },
  {
    id: "sk_heaton",
    year: 2003,
    month: 8,
    era: "cs16",
    category: "player",
    title: {
      en: "HeatoN and the golden era of NiP",
      ru: "HeatoN и золотая эра NiP",
      es: "HeatoN y la era dorada de NiP",
    },
    blurb: {
      en: "Sweden's Ninjas in Pyjamas dominates global CS. HeatoN becomes the face of the scene.",
      ru: "Шведы Ninjas in Pyjamas доминируют в мировом CS. HeatoN — лицо сцены.",
      es: "Los suecos Ninjas in Pyjamas dominan el CS mundial. HeatoN se convierte en la cara de la escena.",
    },
    body: {
      en: "With perfect aim and the kind of IGL brain that read rounds three ahead, HeatoN was CS's first global superstar. NiP's style — disciplined Nuke holds, structured T-side executes — defined how the game was played for years.",
      ru: "С идеальным аимом и IGL-мозгом, который читал раунды на три вперёд, HeatoN был первой глобальной суперзвездой CS. Стиль NiP — дисциплинированные холды на Nuke, структурные Т-исполнения — определял, как в игру играли годами.",
      es: "Con aim perfecto y un cerebro de IGL que leía rondas tres adelante, HeatoN fue la primera superestrella global del CS. El estilo de NiP — holds disciplinados en Nuke, ejecuciones T estructuradas — definió cómo se jugaba por años.",
    },
    tags: ["NiP", "Sweden", "HeatoN"],
  },
  {
    id: "css_release",
    year: 2004,
    month: 11,
    era: "css",
    category: "meta",
    title: {
      en: "Counter-Strike: Source released",
      ru: "Выходит Counter-Strike: Source",
      es: "Sale Counter-Strike: Source",
    },
    blurb: {
      en: "Source engine arrives. Pros refuse to move. 1.6 keeps reigning.",
      ru: "Приходит движок Source. Про-игроки отказываются переходить. 1.6 правит.",
      es: "Llega el motor Source. Los pros se niegan a cambiar. El 1.6 sigue reinando.",
    },
    body: {
      en: "Valve ships the Source version with nicer visuals and tighter physics. The pro scene largely refuses — the weapon feel is different, the hitboxes too forgiving. 1.6 remains the competitive gold standard for half a decade. Source becomes the casual playground.",
      ru: "Valve выпускает Source-версию с красивой графикой и точной физикой. Про-сцена в основном отказывается — оружие ощущается по-другому, хитбоксы слишком прощающие. 1.6 остаётся соревновательным золотым стандартом ещё полдесятилетия. Source становится казуальной песочницей.",
      es: "Valve lanza la versión Source con mejores gráficos y física más ajustada. La escena pro se niega — el feel de las armas es diferente, los hitboxes muy permisivos. El 1.6 sigue siendo el estándar competitivo por media década. Source se vuelve el casual playground.",
    },
    tags: ["source", "1.6", "valve"],
  },
  {
    id: "fnatic_f0rest",
    year: 2006,
    month: 7,
    era: "cs16",
    category: "team",
    title: {
      en: "fnatic and f0rest conquer the world",
      ru: "fnatic и f0rest захватывают мир",
      es: "fnatic y f0rest conquistan el mundo",
    },
    blurb: {
      en: "Swedish lineup with f0rest, GeT_RiGhT and cArn takes over. Still the benchmark for Swedish CS.",
      ru: "Шведский состав с f0rest, GeT_RiGhT и cArn доминирует. До сих пор эталон шведского CS.",
      es: "Lineup sueco con f0rest, GeT_RiGhT y cArn toma el control. Sigue siendo el referente del CS sueco.",
    },
    body: {
      en: "f0rest wasn't just the best aimer in the world — he set the template. GeT_RiGhT's lurker style, cArn's IGLing, and a rotation of Swedish talent made fnatic feared on every LAN.",
      ru: "f0rest был не просто лучшим аимером в мире — он задал шаблон. Лёркер-стиль GeT_RiGhT, IGLing от cArn и ротация шведских талантов сделали fnatic грозой любого LAN.",
      es: "f0rest no era solo el mejor aimer del mundo — él puso el molde. El estilo lurker de GeT_RiGhT, el IGLing de cArn y la rotación de talento sueco hicieron a fnatic temido en cada LAN.",
    },
    tags: ["fnatic", "f0rest", "sweden"],
  },
  {
    id: "cs_go_release",
    year: 2012,
    month: 8,
    era: "csgo",
    category: "meta",
    iconic: true,
    title: {
      en: "CS:GO released",
      ru: "Выходит CS:GO",
      es: "Sale CS:GO",
    },
    blurb: {
      en: "Launch is lukewarm. Pros stay on 1.6. Then... Valve fixes it, and everything changes.",
      ru: "Релиз встречен прохладно. Про-сцена остаётся на 1.6. Потом... Valve чинит, и всё меняется.",
      es: "El lanzamiento es tibio. Los pros se quedan en 1.6. Después... Valve lo arregla, y todo cambia.",
    },
    body: {
      en: "August 2012 — the game everyone expected to fail launches to mixed reviews. Console-style movement, weird spray patterns, small playerbase. But Valve iterates. By 2013 the weapons feel right. By 2014 pro teams make the switch. By 2015 CS:GO is bigger than 1.6 ever was.",
      ru: "Август 2012 — игра, от которой все ждали провала, выходит к смешанным отзывам. Консольный муврумент, странные спреи, маленькое комьюнити. Но Valve дорабатывает. К 2013 оружие ощущается правильно. К 2014 про-команды переходят. К 2015 CS:GO больше, чем 1.6 когда-либо был.",
      es: "Agosto 2012 — el juego que todos esperaban que fracasara sale con reseñas mixtas. Movimiento estilo consola, spray patterns raros, playerbase chica. Pero Valve itera. Para 2013 las armas se sienten bien. Para 2014 los equipos pro cambian. Para 2015 CS:GO es más grande de lo que el 1.6 fue jamás.",
    },
    tags: ["csgo", "valve", "launch"],
  },
  {
    id: "nip_87_0",
    year: 2012,
    month: 10,
    era: "csgo",
    category: "team",
    iconic: true,
    title: {
      en: "NiP's 87-0 LAN streak",
      ru: "87-0 LAN-серия NiP",
      es: "La racha 87-0 en LAN de NiP",
    },
    blurb: {
      en: "Ninjas in Pyjamas win 87 consecutive LAN maps. A record that will never be broken.",
      ru: "Ninjas in Pyjamas выигрывают 87 LAN-карт подряд. Рекорд, который не побить.",
      es: "Ninjas in Pyjamas ganan 87 mapas consecutivos en LAN. Un récord que no se romperá.",
    },
    body: {
      en: "GeT_RiGhT, f0rest, Xizt, Fifflaren, friberg — the original Swedish CS:GO lineup. From the game's launch through 2013, they did not lose a single LAN map for 87 straight maps. In any era, in any esport — this record will stand.",
      ru: "GeT_RiGhT, f0rest, Xizt, Fifflaren, friberg — оригинальный шведский состав CS:GO. С запуска игры до 2013 они не проиграли ни одной LAN-карты — 87 подряд. В любой эре, в любом киберспорте — этот рекорд устоит.",
      es: "GeT_RiGhT, f0rest, Xizt, Fifflaren, friberg — el lineup original sueco de CS:GO. Desde el lanzamiento del juego hasta 2013, no perdieron un solo mapa en LAN durante 87 mapas seguidos. En cualquier era, en cualquier esport — este récord permanecerá.",
    },
    tags: ["NiP", "87-0", "record"],
    links: [{ label: "HLTV coverage", url: "https://www.hltv.org/news/9728/ninjas-in-pyjamas-reach-87-0" }],
  },
  {
    id: "olofboost",
    year: 2014,
    month: 11,
    era: "csgo",
    category: "moment",
    iconic: true,
    title: {
      en: "The Olofboost — DH Winter 2014",
      ru: "Олофбуст — DH Winter 2014",
      es: "El Olofboost — DH Winter 2014",
    },
    blurb: {
      en: "Fnatic's olofmeister holds a position above Overpass toilets that no one thought possible. CS is forever changed.",
      ru: "olofmeister из fnatic держит позицию над туалетами Overpass, которую все считали невозможной. CS изменился навсегда.",
      es: "olofmeister de fnatic aguanta una posición sobre los baños de Overpass que nadie creía posible. CS cambia para siempre.",
    },
    body: {
      en: "In the quarterfinals vs LDLC, fnatic's olofmeister is boosted onto a ledge above B site toilets on Overpass — a spot that's physically off-level-geometry. He rains headshots from a position the enemy can't see. LDLC protests. The rematch is cancelled. CS:GO introduces rules about 'map exploits.' The term 'boost' enters the vocabulary. Overpass is never the same.",
      ru: "В четвертьфинале против LDLC olofmeister из fnatic забустен на уступ над туалетами Overpass — точка, которой физически нет в геометрии уровня. Он сыплет хедшоты из позиции, которую враги не видят. LDLC протестует. Рематч отменяют. В CS:GO вводят правила про 'map exploits'. Термин 'буст' входит в словарь. Overpass уже никогда не тот.",
      es: "En los cuartos contra LDLC, olofmeister de fnatic es boosteado sobre una repisa arriba de los baños del B en Overpass — un spot fuera de la geometría del nivel. Llueven headshots desde una posición que el enemigo no puede ver. LDLC protesta. La revancha se cancela. CS:GO introduce reglas sobre 'map exploits'. El término 'boost' entra al vocabulario. Overpass nunca es el mismo.",
    },
    tags: ["fnatic", "olofmeister", "overpass", "exploit"],
    links: [{ label: "HLTV history", url: "https://www.hltv.org/news/14310/fnatic-forfeits-replay" }],
  },
  {
    id: "coldzera_awp",
    year: 2016,
    month: 4,
    era: "csgo",
    category: "moment",
    iconic: true,
    title: {
      en: "coldzera's jumping AWP",
      ru: "Прыгающий AWP от coldzera",
      es: "El AWP saltando de coldzera",
    },
    blurb: {
      en: "MLG Columbus. vs Team Liquid on Mirage. A 4K no-scope collateral jump-shot that won the year.",
      ru: "MLG Columbus. vs Team Liquid на Mirage. 4K no-scope коллатерал-прыжок, который выиграл год.",
      es: "MLG Columbus. vs Team Liquid en Mirage. Un 4K no-scope collateral con salto que ganó el año.",
    },
    body: {
      en: "April 2, 2016. Semifinals of the Columbus Major. Luminosity (later SK) vs Liquid on Mirage. Pistol round. coldzera is boosted onto boxes at jungle with an AWP. He jumps at the enemy flash, no-scopes two players mid-air through a collateral, then cleans up the round for a 4K. The highlight reel of the decade. HLTV's Play of the Year. The moment every CS fan can replay frame by frame.",
      ru: "2 апреля 2016. Полуфинал Columbus Major. Luminosity (позже SK) против Liquid на Mirage. Пистол-раунд. coldzera забустен на ящики джунглей с AWP. Прыгает на флэш противника, в воздухе no-scope'ит двух игроков коллатералом, потом добивает раунд на 4K. Хайлайт десятилетия. Play of the Year от HLTV. Момент, который каждый фанат CS может переиграть покадрово.",
      es: "2 de abril de 2016. Semifinales del Columbus Major. Luminosity (después SK) vs Liquid en Mirage. Ronda de pistolas. coldzera es boosteado en cajas del jungle con AWP. Salta sobre el flash enemigo, no-scopea a dos en el aire con collateral, después limpia la ronda para un 4K. El highlight de la década. Play of the Year de HLTV. El momento que todo fan de CS puede repetir frame por frame.",
    },
    tags: ["coldzera", "Luminosity", "SK", "AWP", "Columbus"],
    links: [
      { label: "The clip (YouTube)", url: "https://www.youtube.com/watch?v=6eQNrr0ApBc" },
      { label: "HLTV POTY", url: "https://www.hltv.org/news/17566/play-of-the-year-2016" },
    ],
  },
  {
    id: "astralis_era",
    year: 2018,
    month: 1,
    era: "csgo",
    category: "team",
    iconic: true,
    title: {
      en: "The Astralis era begins",
      ru: "Начало эры Astralis",
      es: "Empieza la era Astralis",
    },
    blurb: {
      en: "Denmark's finest: Xyp9x, dupreeh, dev1ce, gla1ve, Magisk. With coach zonic, they define modern CS.",
      ru: "Лучшие из Дании: Xyp9x, dupreeh, dev1ce, gla1ve, Magisk. С коучем zonic они определяют современный CS.",
      es: "Lo mejor de Dinamarca: Xyp9x, dupreeh, dev1ce, gla1ve, Magisk. Con el coach zonic definen el CS moderno.",
    },
    body: {
      en: "Four Majors (Atlanta 2017, London 2018, Katowice 2019, Berlin 2019). Mental coach work. Structured warmups. Utility-heavy executes that turned grenades into a language. They professionalized CS in a way that every top team still copies. When you hear 'Astralis Nuke' — you hear the map as it should be played.",
      ru: "Четыре мейджора (Атланта 2017, Лондон 2018, Катовице 2019, Берлин 2019). Работа с ментальным коучем. Структурные разминки. Утилити-тяжёлые исполнения, превратившие гранаты в язык. Они профессионализировали CS так, что до сих пор копируют все топ-команды. Когда ты слышишь 'Astralis Nuke' — это карта как её нужно играть.",
      es: "Cuatro Majors (Atlanta 2017, Londres 2018, Katowice 2019, Berlín 2019). Trabajo con coach mental. Warmups estructurados. Ejecuciones utility-heavy que convirtieron las granadas en un idioma. Profesionalizaron el CS de una forma que todo equipo top aún copia. Cuando escuchás 'Astralis Nuke' — es el mapa como debe jugarse.",
    },
    tags: ["Astralis", "Denmark", "4 Majors", "zonic"],
  },
  {
    id: "astralis_nuke",
    year: 2019,
    month: 5,
    era: "csgo",
    category: "tactic",
    title: {
      en: "The Astralis Nuke winstreak",
      ru: "Серия побед Astralis на Nuke",
      es: "La racha de Astralis en Nuke",
    },
    blurb: {
      en: "31 consecutive LAN wins on Nuke. Broken by ENCE in May 2019.",
      ru: "31 победа подряд на LAN на Nuke. Прервана ENCE в мае 2019.",
      es: "31 victorias consecutivas en LAN en Nuke. Cortada por ENCE en mayo 2019.",
    },
    body: {
      en: "From February 2018 to May 2019, Astralis didn't lose a single Nuke game on LAN. They turned the map into a science: Outside control with perfect utility, Ramp stomp on T-side, anchor holds that wallbanged every T position. The map was so bad for opponents that many would veto it first against Astralis and lose anyway.",
      ru: "С февраля 2018 по май 2019 Astralis не проиграли ни одной игры на Nuke на LAN. Они превратили карту в науку: контроль Аутсайда с идеальной утилитой, стомп на рампе на T-стороне, холды с пробитиями любой T-позиции. Карта была настолько плоха для противников, что многие банили её первой против Astralis и всё равно проигрывали.",
      es: "De febrero 2018 a mayo 2019, Astralis no perdió un solo juego de Nuke en LAN. Convirtieron el mapa en ciencia: control de Outside con utility perfecta, stomp de Ramp en T-side, anchor holds wallbangeando toda posición T. El mapa era tan malo para los rivales que muchos lo vetaban primero contra Astralis y perdían igual.",
    },
    tags: ["Astralis", "Nuke", "31-0"],
  },
  {
    id: "s1mple_peak",
    year: 2018,
    month: 12,
    era: "csgo",
    category: "player",
    iconic: true,
    title: {
      en: "s1mple's 2018 — arguably the best player year ever",
      ru: "2018 s1mple — возможно, лучший год игрока в истории",
      es: "El 2018 de s1mple — posiblemente el mejor año de un jugador",
    },
    blurb: {
      en: "Rating 1.32. Four MVP trophies. s1mple plays CS from the future.",
      ru: "Рейтинг 1.32. Четыре MVP. s1mple играет CS из будущего.",
      es: "Rating 1.32. Cuatro MVPs. s1mple juega CS del futuro.",
    },
    body: {
      en: "NAVI's s1mple finishes 2018 with a 1.32 HLTV rating — the highest yearly rating ever recorded. Four event MVPs. The world HLTV #1 player. His lurker plays, his AWP angles, his Dust 2 B Site retakes — a masterclass in one player winning 1v4 rounds that should have been impossible.",
      ru: "s1mple из NAVI заканчивает 2018 с HLTV-рейтингом 1.32 — наивысший годовой рейтинг в истории. Четыре MVP турниров. Игрок №1 мира по HLTV. Его лёрки, AWP-углы, ретейки B на Dust 2 — мастер-класс одного игрока, выигрывающего 1v4, которые должны были быть невозможны.",
      es: "s1mple de NAVI termina 2018 con un rating HLTV de 1.32 — el rating anual más alto registrado. Cuatro MVPs. El jugador #1 del mundo por HLTV. Sus jugadas de lurker, sus ángulos de AWP, sus retakes de B en Dust 2 — una clase magistral de un jugador ganando 1v4 que debían ser imposibles.",
    },
    tags: ["s1mple", "NAVI", "1.32", "MVP"],
  },
  {
    id: "cs2_launch",
    year: 2023,
    month: 9,
    era: "cs2",
    category: "meta",
    iconic: true,
    title: {
      en: "CS2 launches",
      ru: "Выходит CS2",
      es: "Sale CS2",
    },
    blurb: {
      en: "Source 2 engine. Volumetric smokes. New tick-rate system. CS:GO is retired overnight.",
      ru: "Движок Source 2. Объёмные смоуки. Новая тик-рейт система. CS:GO закрыт за одну ночь.",
      es: "Motor Source 2. Humos volumétricos. Nuevo sistema de tickrate. CS:GO se retira de un día para otro.",
    },
    body: {
      en: "After a year of closed beta, Valve replaces CS:GO entirely on September 27, 2023. The biggest changes: volumetric smokes that can be peeked, flashed, and exploded; sub-tick updates that claim to make every bullet count; a Source 2 engine rebuild. The pro scene adapts in months. Old muscle memory for smokes has to be rewritten.",
      ru: "После года закрытой беты, Valve заменяет CS:GO полностью 27 сентября 2023. Главные изменения: объёмные смоуки, которые можно пикнуть, флэшнуть, взорвать; sub-tick обновления, обещающие что каждая пуля учитывается; перестройка на движке Source 2. Про-сцена адаптируется за месяцы. Старую мышечную память смоуков приходится переписать.",
      es: "Tras un año de beta cerrada, Valve reemplaza CS:GO por completo el 27 de septiembre de 2023. Los cambios principales: humos volumétricos que se pueden peekear, flashear, explotar; actualizaciones sub-tick que prometen que cada bala cuenta; reconstrucción en motor Source 2. La escena pro se adapta en meses. La memoria muscular para humos se reescribe.",
    },
    tags: ["cs2", "source 2", "volumetric smoke"],
  },
  {
    id: "donk_era",
    year: 2024,
    month: 12,
    era: "cs2",
    category: "player",
    iconic: true,
    title: {
      en: "donk and the new generation",
      ru: "donk и новое поколение",
      es: "donk y la nueva generación",
    },
    blurb: {
      en: "17 years old. MVP at Shanghai Major. Team Spirit's prodigy redefines rifling.",
      ru: "17 лет. MVP Shanghai Major. Вундеркинд Team Spirit переопределяет рифлинг.",
      es: "17 años. MVP en Shanghai Major. El prodigio de Team Spirit redefine el rifling.",
    },
    body: {
      en: "Danil 'donk' Kryshkovets — born 2007, joined Team Spirit in 2023, MVP of the 2024 Shanghai Major at 17. His rifle aim is otherworldly: wallbang flicks, AK spray-downs at distance, entry frags that look scripted. He is what NiKo was to 2018, what s1mple was to 2019 — the bar for mechanical skill in the new era.",
      ru: "Данил 'donk' Крышковец — родился в 2007, зашёл в Team Spirit в 2023, MVP Shanghai Major 2024 в 17 лет. Его рифлинг — нездешний: флики через стену, спрей AK на дистанции, энтри-фраги, похожие на скрипт. Он то же для 2024, что NiKo для 2018, что s1mple для 2019 — планка механического скилла новой эры.",
      es: "Danil 'donk' Kryshkovets — nacido en 2007, entró a Team Spirit en 2023, MVP del Shanghai Major 2024 a los 17. Su rifling es de otro mundo: flicks wallbang, spray de AK a distancia, entry frags que parecen scripteados. Es lo que NiKo fue para 2018, lo que s1mple fue para 2019 — la vara del skill mecánico en la nueva era.",
    },
    tags: ["donk", "Team Spirit", "Shanghai Major", "2024"],
  },
  {
    id: "vitality_2025",
    year: 2025,
    month: 6,
    era: "cs2",
    category: "team",
    title: {
      en: "Team Vitality's dominant run",
      ru: "Доминирование Team Vitality",
      es: "La corrida dominante de Team Vitality",
    },
    blurb: {
      en: "ZywOo leads Vitality to three Majors including Budapest 2025. New reigning kings.",
      ru: "ZywOo ведёт Vitality к трём мейджорам, включая Budapest 2025. Новые короли.",
      es: "ZywOo lleva a Vitality a tres Majors incluyendo Budapest 2025. Los nuevos reyes.",
    },
    body: {
      en: "With ZywOo in the prime of his career and a reworked roster, Vitality claims three Majors in a span that echoes the Astralis dynasty. The question for 2026: can anyone stop them? Spirit with donk, NAVI with rebuilds, Falcons with international stars — the chase is on.",
      ru: "С ZywOo в расцвете карьеры и переработанным составом, Vitality берёт три мейджора — это резонирует с династией Astralis. Вопрос 2026: кто их остановит? Spirit с donk, NAVI с пересборками, Falcons с интернациональными звёздами — погоня началась.",
      es: "Con ZywOo en su pico y un roster retrabajado, Vitality se lleva tres Majors — un eco de la dinastía Astralis. La pregunta para 2026: ¿alguien puede detenerlos? Spirit con donk, NAVI con reconstrucciones, Falcons con estrellas internacionales — la caza está en marcha.",
    },
    tags: ["Vitality", "ZywOo", "Budapest 2025"],
  },
  {
    id: "now",
    year: 2026,
    month: 4,
    era: "cs2",
    category: "meta",
    title: {
      en: "We are here",
      ru: "Мы здесь",
      es: "Estamos acá",
    },
    blurb: {
      en: "Active Duty: Ancient, Anubis, Dust II, Inferno, Mirage, Nuke, Overpass. Train retired in January.",
      ru: "Active Duty: Ancient, Anubis, Dust II, Inferno, Mirage, Nuke, Overpass. Train убран в январе.",
      es: "Active Duty: Ancient, Anubis, Dust II, Inferno, Mirage, Nuke, Overpass. Train retirado en enero.",
    },
    body: {
      en: "April 2026. The map pool has shifted. The meta is in flux. Anubis returns after Train's retirement. Pro teams experiment with new rosters post-shuffle. And you — you're reading a playbook to become part of whatever comes next.",
      ru: "Апрель 2026. Пул карт сдвинулся. Мета меняется. Anubis возвращается после ухода Train. Про-команды экспериментируют с новыми составами после шаффла. И ты — ты читаешь плейбук, чтобы стать частью того, что будет дальше.",
      es: "Abril 2026. El pool de mapas cambió. La meta está en flujo. Anubis vuelve tras el retiro de Train. Los equipos pro experimentan con rosters nuevos post-shuffle. Y vos — vos estás leyendo un playbook para ser parte de lo que viene.",
    },
    tags: ["2026", "active duty", "now"],
    iconic: true,
  },
];

export const ERA_META: Record<HistoryEvent["era"], { label: string; color: string; years: string }> = {
  cs16: { label: "CS 1.6", color: "#2a9d8f", years: "1999–2011" },
  css: { label: "SOURCE", color: "#6b8e23", years: "2004–2012" },
  csgo: { label: "CS:GO",  color: "#F5A623", years: "2012–2023" },
  cs2: { label: "CS 2",    color: "#D0021B", years: "2023—" },
};

export const CATEGORY_META: Record<HistoryEvent["category"], { label: string; color: string }> = {
  team:   { label: "TEAM",   color: "#F5A623" },
  player: { label: "PLAYER", color: "#5dade2" },
  tactic: { label: "TACTIC", color: "#2ECC71" },
  moment: { label: "MOMENT", color: "#D0021B" },
  meta:   { label: "META",   color: "#888" },
};
