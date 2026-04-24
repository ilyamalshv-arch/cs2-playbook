export const SUPPORTED_LANGS = ["en", "ru", "es"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export type Dict = {
  // generic
  hud_version: string;
  audio_on: string;
  audio_off: string;
  back: string;
  site_name: string;
  // splash / intro
  splash: {
    insert_coin: string;
    press: string;
    press_sub: string;
    tips: string[];
    boot: string[];
    warn: string;
    yell1: string;
    yell2_l1: string;
    yell2_l2: string;
    label_green: string;
    label_coach: string;
    whisper: string;
    soft: string;
    logo_sub: string;
    subtitle: string;
    cta: string;
    replay: string;
    tip_console: string;
    coach: string;
    green: string;
    skip: string;
  };
  // home
  home: {
    online: string; // uses {n} placeholder
    hero_eyebrow: string;
    hero_title_1: string;
    hero_title_2: string;
    hero_subtitle: string;
    hero_desc: string;
    hero_cta: string;
    hero_hint: string;
    zones_title: string;
    zones_sub: string;
    zones: Record<string, { tag: string; title: string; blurb: string; stat: string }>;
    terminal_title: string;
    terminal_help: string;
    terminal_boot: string[];
    commands_hint: string;
    footer_built: string;
    footer_copy: string;
    spawn: string;
    dev_title: string;
    dev_placeholder: string;
  };
  // callouts/mirage
  callouts: {
    mode_explore: string;
    mode_quiz: string;
    subtitle: string;
    desc: string;
    label_en: string;
    label_ru: string;
    label_es: string;
    quiz_find: string;
    quiz_in: string;
    quiz_timeout: string;
    quiz_hit: string;
    quiz_miss: string;
    streak: string;
    best: string;
    accuracy: string;
    skip: string;
    again: string;
    review: string;
    results_title: string;
    tip_hover: string;
    tip_click: string;
    legend_en_es: string;
    legend_zones: string;
  };
  // tilt test
  tilt: {
    section: string;
    title1: string;
    title2: string;
    subtitle: string;
    desc: string;
    begin: string;
    skip_intro: string;
    intro_lines: string[];
    coach: string;
    you: string;
    q_of: string;
    answer_prompt: string;
    restart: string;
    share: string;
    copied: string;
    verdict: string;
    diagnosis: string;
    prescription: string;
    severity: string;
    read_chapter: string;
    share_text: string; // uses {pct} and {title} placeholders
    score_suffix: string;
  };
};

export const DICT: Record<Lang, Dict> = {
  en: {
    hud_version: "v0.1",
    audio_on: "AUDIO ON",
    audio_off: "MUTED",
    back: "◂ BACK",
    site_name: "CS2.PLAYBOOK",
    splash: {
      insert_coin: "INSERT COIN",
      press: "PRESS [SPACE]",
      press_sub: "...or click anywhere, brother",
      tips: ["▸ crosshair ready", "▸ wallhacks disabled", "▸ mom called"],
      boot: [
        "> exec autoexec.cfg",
        "> loading map: de_playbook",
        "> connecting 127.0.0.1:27015",
        "> downloading wallhacks.dll ...",
        "> just kidding. loading playbook ...",
        "> validating steam ticket",
        "> VAC secure ✓",
        "> welcome, brother.",
      ],
      warn: "⚠ WARNING · TEAMMATE TILTED",
      yell1: "WHAT'S YOUR PROBLEM, GREEN?!",
      yell2_l1: "WHY DID YOU RUSH B",
      yell2_l2: "ALONE AGAIN?!",
      label_green: "[ green, quietly ]",
      label_coach: "[ coach, after a pause ]",
      whisper: "i just wanted to find the playbook...",
      soft: "well... since you're here.",
      logo_sub: "interactive edition · v0.1 · by Ilya",
      subtitle: "technique · tactics · callouts · mental",
      cta: "RUSH B, COMRADE ▸",
      replay: "◂ play intro again",
      tip_console: "tip: press [~] on the homepage — dev console opens",
      coach: "COACH",
      green: "GREEN",
      skip: "[ SKIP INTRO ▸ ]",
    },
    home: {
      online: "{n} operators online",
      hero_eyebrow: "// RADAR BRIEFING",
      hero_title_1: "THE",
      hero_title_2: "PLAYBOOK",
      hero_subtitle: "technique · tactics · callouts · mental",
      hero_desc:
        "A field manual for CS2 built like a scientific brief. Written for the player who wants to climb from Gold Nova to the top — without the tilt.",
      hero_cta: "PICK A ZONE ON THE RADAR ▾",
      hero_hint: "(or click the cards below)",
      zones_title: "SELECT A SECTION",
      zones_sub: "seven zones · one playbook",
      zones: {
        foundations: { tag: "01 · A SITE", title: "Foundations", blurb: "Economy, timings, anatomy of a round. The invisible layer that separates bots from IGLs.", stat: "7 maps · timings · buy logic" },
        mechanics:   { tag: "02 · MID",    title: "Mechanics",   blurb: "Crosshair placement, counter-strafing, spray control, the four peek types.",                stat: "aim · movement · audio" },
        training:    { tag: "03 · T SPAWN",title: "Training",    blurb: "Weekly periodization, the NiKo rule, Workshop maps, the 90-day plan.",                    stat: "20-min warmup · battle pass" },
        tactics:     { tag: "04 · B SITE", title: "Tactics",     blurb: "T-side and CT-side playbooks for all 7 Active Duty maps. Animated.",                       stat: "40+ executes · both sides" },
        callouts:    { tag: "05 · CONNECTOR", title: "Callouts", blurb: "Interactive map callouts in EN & ES. Quiz mode with a headshot challenge.",                stat: "EN / ES · 140+ calls" },
        mental:      { tag: "06 · CT SPAWN",title: "Mental",     blurb: "Anti-tilt protocol, the 10-second rule, toxic teammates defense, tilt test.",              stat: "the chapter you needed" },
        history:     { tag: "07 · BOMBSITE",title: "History",    blurb: "From HeatoN to donk. The tactics that bent the game — 1999 to 2026.",                      stat: "25+ years · one timeline" },
      },
      terminal_title: "TERMINAL_01",
      terminal_help: 'type "help" or click a zone above',
      terminal_boot: [
        "> session established.",
        "> welcome back, operator.",
        "> 7 zones available. select one.",
      ],
      commands_hint: "commands: help · about · random · konami · rush",
      footer_built: "built by Ilya",
      footer_copy: "no ads · no tracking · no skill diff",
      spawn: "DE_PLAYBOOK · HOME",
      dev_title: "DEV CONSOLE",
      dev_placeholder: "type a command...",
    },
    callouts: {
      mode_explore: "EXPLORE",
      mode_quiz: "HEADSHOT CHALLENGE",
      subtitle: "de_mirage · callouts",
      desc: "Learn every corner of Mirage. Hover to read the name in three languages. Switch to quiz mode and put your reflexes on trial.",
      label_en: "ENGLISH",
      label_ru: "РУССКИЙ",
      label_es: "ESPAÑOL",
      quiz_find: "FIND",
      quiz_in: "CLICK THE ZONE",
      quiz_timeout: "TOO SLOW",
      quiz_hit: "HEADSHOT",
      quiz_miss: "MISSED",
      streak: "STREAK",
      best: "BEST",
      accuracy: "ACCURACY",
      skip: "SKIP ▸",
      again: "↻ PLAY AGAIN",
      review: "REVIEW",
      results_title: "CHALLENGE COMPLETE",
      tip_hover: "tip: hover any zone",
      tip_click: "tip: click to place your shot",
      legend_en_es: "EN / ES bilingual",
      legend_zones: "zones",
    },
    tilt: {
      section: "// 06 · CT SPAWN",
      title1: "TILT",
      title2: "INTERROGATION",
      subtitle: "mental · diagnostic",
      desc: "Seven questions. No bullshit. The coach is in the room and he already knows you tilted — he just wants to hear you say it.",
      begin: "ENTER THE ROOM ▸",
      skip_intro: "skip intro",
      intro_lines: [
        "sit down.",
        "i watched your last demo. twice.",
        "i'm not mad. just... concerned.",
        "seven questions. honest answers.",
        "after that, we'll know what's broken.",
      ],
      coach: "COACH",
      you: "YOU",
      q_of: "QUESTION",
      answer_prompt: "▸ choose your answer",
      restart: "↻ RETAKE",
      share: "SHARE",
      copied: "✓ copied to clipboard",
      verdict: "VERDICT",
      diagnosis: "DIAGNOSIS",
      prescription: "PRESCRIPTION",
      severity: "TILT LEVEL",
      read_chapter: "READ THE CHAPTER ▸",
      share_text: `I got "{title}" on the CS2 Playbook tilt test. {pct}% tilted. RIP. → cs2playbook.com/mental/tilt-test`,
      score_suffix: "% TILTED",
    },
  },
  ru: {
    hud_version: "v0.1",
    audio_on: "ЗВУК ВКЛ",
    audio_off: "ЗВУК ВЫКЛ",
    back: "◂ НАЗАД",
    site_name: "CS2.PLAYBOOK",
    splash: {
      insert_coin: "ВСТАВЬТЕ МОНЕТУ",
      press: "НАЖМИ [SPACE]",
      press_sub: "...или просто кликни, брат",
      tips: ["▸ прицел готов", "▸ читы отключены", "▸ маме позвонил"],
      boot: [
        "> exec autoexec.cfg",
        "> загрузка карты: de_playbook",
        "> соединение 127.0.0.1:27015",
        "> скачивание wallhacks.dll ...",
        "> шутка. загрузка плейбука ...",
        "> проверка steam ticket",
        "> VAC защита ✓",
        "> с возвращением, брат.",
      ],
      warn: "⚠ ВНИМАНИЕ · ТИММЕЙТ В ТИЛТЕ",
      yell1: "В ЧЁМ ТВОЯ ПРОБЛЕМА, GREEN?!",
      yell2_l1: "ЗАЧЕМ ОПЯТЬ НА B",
      yell2_l2: "ПОБЕЖАЛ ОДИН?!",
      label_green: "[ green, тихо ]",
      label_coach: "[ коуч, после паузы ]",
      whisper: "я просто хотел найти плейбук...",
      soft: "ну... раз уж ты здесь.",
      logo_sub: "интерактивное издание · v0.1 · by Ilya",
      subtitle: "техника · тактика · коллауты · ментал",
      cta: "RUSH B, ТОВАРИЩ ▸",
      replay: "◂ смотреть заново",
      tip_console: "совет: нажми [~] на главной — откроется dev-консоль",
      coach: "КОУЧ",
      green: "GREEN",
      skip: "[ ПРОПУСТИТЬ ▸ ]",
    },
    home: {
      online: "{n} операторов онлайн",
      hero_eyebrow: "// БРИФИНГ НА РАДАРЕ",
      hero_title_1: "THE",
      hero_title_2: "PLAYBOOK",
      hero_subtitle: "техника · тактика · коллауты · ментал",
      hero_desc:
        "Полевое руководство по CS2 в виде научного брифинга. Для игрока, который хочет дойти от Gold Nova до топа — без тилта.",
      hero_cta: "ВЫБЕРИ ЗОНУ НА РАДАРЕ ▾",
      hero_hint: "(или тыкай по карточкам ниже)",
      zones_title: "ВЫБЕРИ РАЗДЕЛ",
      zones_sub: "семь зон · один плейбук",
      zones: {
        foundations: { tag: "01 · A SITE",   title: "Основы",     blurb: "Экономика, тайминги, анатомия раунда. Невидимый слой, который отличает ботов от IGL.", stat: "7 карт · тайминги · логика баев" },
        mechanics:   { tag: "02 · MID",      title: "Механика",   blurb: "Crosshair placement, counter-strafe, контроль спрея, четыре типа пика.",               stat: "аим · муврумент · аудио" },
        training:    { tag: "03 · T SPAWN",  title: "Тренировки", blurb: "Недельная периодизация, правило NiKo, Workshop-карты, 90-дневный план.",              stat: "20-мин разминка · battle pass" },
        tactics:     { tag: "04 · B SITE",   title: "Тактика",    blurb: "T-side и CT-side плейбуки для всех 7 карт Active Duty. С анимацией.",                  stat: "40+ заходов · обе стороны" },
        callouts:    { tag: "05 · CONNECTOR",title: "Коллауты",   blurb: "Интерактивные карты на EN и ES. Квиз с headshot challenge.",                            stat: "EN / ES · 140+ позиций" },
        mental:      { tag: "06 · CT SPAWN", title: "Ментал",     blurb: "Анти-тилт протокол, правило 10 секунд, защита от токсиков, тилт-тест.",                 stat: "глава, которую ждал" },
        history:     { tag: "07 · BOMBSITE", title: "История",    blurb: "От HeatoN до donk. Тактики, которые сломали игру — с 1999 до 2026.",                    stat: "25+ лет · одна лента" },
      },
      terminal_title: "ТЕРМИНАЛ_01",
      terminal_help: 'введи "help" или кликни по зоне выше',
      terminal_boot: [
        "> сессия установлена.",
        "> с возвращением, оператор.",
        "> 7 зон доступно. выбери одну.",
      ],
      commands_hint: "команды: help · about · random · konami · rush",
      footer_built: "by Ilya",
      footer_copy: "без рекламы · без трекинга · без скилл-диффа",
      spawn: "DE_PLAYBOOK · ГЛАВНАЯ",
      dev_title: "DEV КОНСОЛЬ",
      dev_placeholder: "введи команду...",
    },
    callouts: {
      mode_explore: "ИЗУЧАТЬ",
      mode_quiz: "HEADSHOT CHALLENGE",
      subtitle: "de_mirage · коллауты",
      desc: "Выучи каждый угол Mirage. Наведи на зону — увидишь название на трёх языках. Переключись в квиз — и проверь свои рефлексы.",
      label_en: "ENGLISH",
      label_ru: "РУССКИЙ",
      label_es: "ESPAÑOL",
      quiz_find: "НАЙДИ",
      quiz_in: "КЛИКНИ ПО ЗОНЕ",
      quiz_timeout: "СЛИШКОМ МЕДЛЕННО",
      quiz_hit: "HEADSHOT",
      quiz_miss: "ПРОМАХ",
      streak: "СТРИК",
      best: "РЕКОРД",
      accuracy: "ТОЧНОСТЬ",
      skip: "ПРОПУСТИТЬ ▸",
      again: "↻ ЗАНОВО",
      review: "РАЗБОР",
      results_title: "ЧЕЛЛЕНДЖ ПРОЙДЕН",
      tip_hover: "наведи на зону",
      tip_click: "клик — выстрел",
      legend_en_es: "билингва EN / ES",
      legend_zones: "зон",
    },
    tilt: {
      section: "// 06 · CT SPAWN",
      title1: "ДОПРОС",
      title2: "НА ТИЛТ",
      subtitle: "ментал · диагностика",
      desc: "Семь вопросов. Без соплей. Коуч уже в комнате и уже знает, что ты в тилте — ему нужно, чтобы ты сам это признал.",
      begin: "ВОЙТИ В КОМНАТУ ▸",
      skip_intro: "пропустить",
      intro_lines: [
        "садись.",
        "я посмотрел твоё демо. дважды.",
        "я не злюсь. просто... волнуюсь.",
        "семь вопросов. честных.",
        "после этого поймём, что сломалось.",
      ],
      coach: "КОУЧ",
      you: "ТЫ",
      q_of: "ВОПРОС",
      answer_prompt: "▸ выбери ответ",
      restart: "↻ ЗАНОВО",
      share: "ПОДЕЛИТЬСЯ",
      copied: "✓ скопировано",
      verdict: "ВЕРДИКТ",
      diagnosis: "ДИАГНОЗ",
      prescription: "РЕЦЕПТ",
      severity: "УРОВЕНЬ ТИЛТА",
      read_chapter: "ЧИТАТЬ ГЛАВУ ▸",
      share_text: `Я получил "{title}" на тилт-тесте CS2 Playbook. {pct}% тилтанутости. Хана. → cs2playbook.com/mental/tilt-test`,
      score_suffix: "% ТИЛТА",
    },
  },
  es: {
    hud_version: "v0.1",
    audio_on: "AUDIO ON",
    audio_off: "SILENCIADO",
    back: "◂ VOLVER",
    site_name: "CS2.PLAYBOOK",
    splash: {
      insert_coin: "INSERTA MONEDA",
      press: "PULSA [SPACE]",
      press_sub: "...o haz click, hermano",
      tips: ["▸ mira lista", "▸ wallhacks off", "▸ llamé a mamá"],
      boot: [
        "> exec autoexec.cfg",
        "> cargando mapa: de_playbook",
        "> conectando 127.0.0.1:27015",
        "> descargando wallhacks.dll ...",
        "> mentira. cargando playbook ...",
        "> validando steam ticket",
        "> VAC seguro ✓",
        "> bienvenido, hermano.",
      ],
      warn: "⚠ AVISO · COMPAÑERO TILTEADO",
      yell1: "¿¡CUÁL ES TU PROBLEMA, GREEN?!",
      yell2_l1: "¿¡POR QUÉ RUSHEASTE B",
      yell2_l2: "SOLO OTRA VEZ?!",
      label_green: "[ green, en voz baja ]",
      label_coach: "[ coach, tras una pausa ]",
      whisper: "solo quería encontrar el playbook...",
      soft: "bueno... ya que estás aquí.",
      logo_sub: "edición interactiva · v0.1 · by Ilya",
      subtitle: "técnica · tácticas · llamadas · mental",
      cta: "RUSH B, COMPA ▸",
      replay: "◂ ver intro otra vez",
      tip_console: "tip: pulsa [~] en la home — abre la dev console",
      coach: "COACH",
      green: "GREEN",
      skip: "[ SALTAR ▸ ]",
    },
    home: {
      online: "{n} operadores en línea",
      hero_eyebrow: "// BRIEFING EN EL RADAR",
      hero_title_1: "THE",
      hero_title_2: "PLAYBOOK",
      hero_subtitle: "técnica · tácticas · llamadas · mental",
      hero_desc:
        "Un manual de campo para CS2 escrito como un paper científico. Para el jugador que quiere subir de Gold Nova al top — sin tiltearse.",
      hero_cta: "ELEGÍ UNA ZONA EN EL RADAR ▾",
      hero_hint: "(o tocá las tarjetas de abajo)",
      zones_title: "ELEGÍ UNA SECCIÓN",
      zones_sub: "siete zonas · un playbook",
      zones: {
        foundations: { tag: "01 · A SITE",   title: "Fundamentos", blurb: "Economía, timings, anatomía de la ronda. La capa invisible que separa a bots de IGLs.", stat: "7 mapas · timings · compras" },
        mechanics:   { tag: "02 · MID",      title: "Mecánica",    blurb: "Crosshair placement, counter-strafe, control de spray, los cuatro tipos de peek.",       stat: "aim · movimiento · audio" },
        training:    { tag: "03 · T SPAWN",  title: "Entrenamiento", blurb: "Periodización semanal, la regla NiKo, mapas de Workshop, el plan de 90 días.",         stat: "warmup 20 min · battle pass" },
        tactics:     { tag: "04 · B SITE",   title: "Tácticas",    blurb: "Playbooks de T-side y CT-side para los 7 mapas de Active Duty. Animados.",               stat: "40+ ejecuciones · ambos lados" },
        callouts:    { tag: "05 · CONNECTOR",title: "Llamadas",    blurb: "Llamadas interactivas en EN y ES. Modo quiz con headshot challenge.",                     stat: "EN / ES · 140+ llamadas" },
        mental:      { tag: "06 · CT SPAWN", title: "Mental",      blurb: "Protocolo anti-tilt, la regla de los 10 segundos, defensa contra tóxicos.",              stat: "el capítulo que necesitás" },
        history:     { tag: "07 · BOMBSITE", title: "Historia",    blurb: "De HeatoN a donk. Las tácticas que rompieron el juego — 1999 a 2026.",                    stat: "25+ años · una línea" },
      },
      terminal_title: "TERMINAL_01",
      terminal_help: 'escribí "help" o tocá una zona',
      terminal_boot: [
        "> sesión establecida.",
        "> bienvenido, operador.",
        "> 7 zonas disponibles. elegí una.",
      ],
      commands_hint: "comandos: help · about · random · konami · rush",
      footer_built: "by Ilya",
      footer_copy: "sin ads · sin tracking · sin skill diff",
      spawn: "DE_PLAYBOOK · HOME",
      dev_title: "DEV CONSOLE",
      dev_placeholder: "escribí un comando...",
    },
    callouts: {
      mode_explore: "EXPLORAR",
      mode_quiz: "HEADSHOT CHALLENGE",
      subtitle: "de_mirage · llamadas",
      desc: "Aprendé cada rincón de Mirage. Pasá el mouse por una zona y leé su nombre en tres idiomas. Pasá al modo quiz y poné tus reflejos a prueba.",
      label_en: "ENGLISH",
      label_ru: "РУССКИЙ",
      label_es: "ESPAÑOL",
      quiz_find: "ENCONTRÁ",
      quiz_in: "CLICKEÁ LA ZONA",
      quiz_timeout: "MUY LENTO",
      quiz_hit: "HEADSHOT",
      quiz_miss: "FALLO",
      streak: "RACHA",
      best: "RÉCORD",
      accuracy: "PRECISIÓN",
      skip: "SALTAR ▸",
      again: "↻ OTRA VEZ",
      review: "REVISAR",
      results_title: "CHALLENGE COMPLETO",
      tip_hover: "pasá el mouse",
      tip_click: "click para disparar",
      legend_en_es: "EN / ES bilingüe",
      legend_zones: "zonas",
    },
    tilt: {
      section: "// 06 · CT SPAWN",
      title1: "INTERROGATORIO",
      title2: "DE TILT",
      subtitle: "mental · diagnóstico",
      desc: "Siete preguntas. Sin vueltas. El coach ya está en la sala y ya sabe que estás tilteado — solo quiere oírtelo decir.",
      begin: "ENTRAR A LA SALA ▸",
      skip_intro: "saltar intro",
      intro_lines: [
        "sentate.",
        "vi tu última demo. dos veces.",
        "no estoy enojado. solo... preocupado.",
        "siete preguntas. honestas.",
        "después sabremos qué se rompió.",
      ],
      coach: "COACH",
      you: "VOS",
      q_of: "PREGUNTA",
      answer_prompt: "▸ elegí tu respuesta",
      restart: "↻ OTRA VEZ",
      share: "COMPARTIR",
      copied: "✓ copiado",
      verdict: "VEREDICTO",
      diagnosis: "DIAGNÓSTICO",
      prescription: "RECETA",
      severity: "NIVEL DE TILT",
      read_chapter: "LEER EL CAPÍTULO ▸",
      share_text: `Me tocó "{title}" en el test de tilt del CS2 Playbook. {pct}% tilteado. RIP. → cs2playbook.com/mental/tilt-test`,
      score_suffix: "% TILT",
    },
  },
};

export function getDict(lang: string): Dict {
  const l = SUPPORTED_LANGS.includes(lang as Lang) ? (lang as Lang) : DEFAULT_LANG;
  return DICT[l];
}
