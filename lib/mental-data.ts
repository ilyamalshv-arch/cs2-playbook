import type { Lang } from "./i18n";

export type MentalArticle = {
  id: string;
  icon: string; // emoji or symbol
  color: string;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  body: Record<Lang, string[]>; // paragraphs
};

export const MENTAL_ARTICLES: MentalArticle[] = [
  {
    id: "10_second",
    icon: "⏱",
    color: "#F5A623",
    title: {
      en: "The 10-Second Rule",
      ru: "Правило 10 секунд",
      es: "La regla de los 10 segundos",
    },
    subtitle: {
      en: "Between every round · before every decision",
      ru: "Между каждым раундом · перед каждым решением",
      es: "Entre cada ronda · antes de cada decisión",
    },
    body: {
      en: [
        "When you notice the frustration building — a teammate baits you, a clutch slips away, your aim feels off — you have 10 seconds before the next round starts. Use them.",
        "4 seconds breathing in. 4 seconds breathing out. 2 seconds looking away from the screen. That's it. That's the whole rule.",
        "Why it works: frustration is a physiological state. Your heart rate is elevated, your breathing is shallow, your decision-making cortex is hijacked by your amygdala. You cannot out-aim this with willpower. You reset it with breath.",
        "Pros do this. Watch any Astralis round transition during the zonic era — the micro-pause, the slight neck roll, the quick water sip. That's not filler. That's a protocol.",
      ],
      ru: [
        "Когда ты чувствуешь, как накатывает фрустрация — тиммейт бейтнул, клатч ускользнул, аим не работает — у тебя есть 10 секунд до следующего раунда. Используй их.",
        "4 секунды вдох. 4 секунды выдох. 2 секунды не смотришь в экран. Всё. Это всё правило.",
        "Почему работает: фрустрация — это физиологическое состояние. Пульс повышен, дыхание поверхностное, кора принятия решений захвачена миндалиной. Ты не переаимишь это силой воли. Только дыхание сбрасывает.",
        "Про-игроки так делают. Посмотри переходы раундов у Astralis эпохи zonic — микро-пауза, лёгкий поворот шеи, глоток воды. Это не филлер. Это протокол.",
      ],
      es: [
        "Cuando sentís que se acumula la frustración — un compa te baitea, un clutch se te escapa, tu aim no está — tenés 10 segundos antes de la próxima ronda. Usalos.",
        "4 segundos inhalando. 4 segundos exhalando. 2 segundos mirando lejos de la pantalla. Eso es todo. Esa es toda la regla.",
        "Por qué funciona: la frustración es un estado fisiológico. Tu pulso está alto, tu respiración superficial, tu corteza de decisiones está secuestrada por la amígdala. No lo superás con fuerza de voluntad. Lo reseteás con respiración.",
        "Los pros hacen esto. Mirá cualquier transición de ronda de Astralis en la era zonic — la micropausa, el leve giro de cuello, el sorbo de agua. No es relleno. Es protocolo.",
      ],
    },
  },
  {
    id: "3_loss",
    icon: "✕",
    color: "#D0021B",
    title: {
      en: "The 3-Loss Rule",
      ru: "Правило трёх поражений",
      es: "La regla de las 3 derrotas",
    },
    subtitle: {
      en: "When to walk away from the queue",
      ru: "Когда встать из-за компьютера",
      es: "Cuándo levantarte de la PC",
    },
    body: {
      en: [
        "Three matches lost in a row, back-to-back, same day? Stop. Don't queue again.",
        "This isn't about skill. After three losses the data is clear: your performance drops measurably, your frustration is at baseline-high, and the next match is statistically more likely to be a loss than a win. You're gambling, not playing.",
        "The mental trap is 'just one more, I can win it back.' That voice is not helping you. It is the same voice a slot machine triggers in a tired brain. Listen to it and respect it — then close the game.",
        "Protocol after 3 losses: close CS. Eat. Hydrate. Go for a walk. Sleep 8+ hours. Come back tomorrow. If you must play, play casual / DM / aim_botz — nothing ranked until at least 12 hours pass.",
      ],
      ru: [
        "Три матча подряд проиграны в один день? Стоп. Больше не заходи.",
        "Это не про скилл. После трёх поражений данные однозначны: твои показатели измеримо падают, фрустрация на базовом пике, следующий матч статистически более вероятно проигрыш, чем выигрыш. Ты играешь в азартную игру, а не в CS.",
        "Ловушка мышления — 'ну ещё один, отыграюсь'. Этот голос тебе не помогает. Это тот же голос, который включает игровой автомат у уставшего мозга. Услышь и уважь его — а потом закрой игру.",
        "Протокол после 3 лузов: закрой CS. Поешь. Попей воды. Погуляй. 8+ часов сна. Вернись завтра. Если очень надо играть — казуал / DM / aim_botz. Никаких ранкид матчей минимум 12 часов.",
      ],
      es: [
        "¿Tres partidas perdidas seguidas el mismo día? Pará. No entres más.",
        "No es cuestión de skill. Después de tres derrotas los datos son claros: tu rendimiento baja medible, tu frustración está al máximo, y la próxima partida es estadísticamente más probable que sea una derrota. Estás apostando, no jugando.",
        "La trampa mental es 'una más, lo remonto'. Esa voz no te está ayudando. Es la misma voz que activa una máquina tragamonedas en un cerebro cansado. Escuchala y respetala — después cerrá el juego.",
        "Protocolo después de 3 derrotas: cerrá CS. Comé. Hidratate. Caminá. 8+ horas de sueño. Volvé mañana. Si tenés que jugar, casual / DM / aim_botz — nada ranked hasta que pasen al menos 12 horas.",
      ],
    },
  },
  {
    id: "toxic",
    icon: "☣",
    color: "#5dade2",
    title: {
      en: "Handling Toxic Teammates",
      ru: "Токсичные тиммейты",
      es: "Compañeros tóxicos",
    },
    subtitle: {
      en: "Mute the flame, keep the utility",
      ru: "Мьют флейму, оставь утилу",
      es: "Mutea el flame, mantené la utility",
    },
    body: {
      en: [
        "A teammate is flaming you. Every call is criticism. Every mistake gets a paragraph in chat. Your brain is now 50% playing CS and 50% defending yourself. Performance crashes.",
        "The rule: MUTE them in voice, KEEP them in text. You need the 'enemy spotted at long' callouts. You do not need the 'you're actual silver' commentary.",
        "Do not argue. Do not explain. Do not ask them to calm down. None of that works with a tilted brain. It feeds the cycle. Mute, play, win or lose, leave the match, forget.",
        "If you're the IGL and can't afford to mute calls — take a deliberate 5-second pause before responding to flame. Repeat their info back to the team yourself, without the insult. Model the behavior you want. Toxic people mirror calmness more often than you'd expect.",
        "Report after the match, not during. Reporting during the match is another 30 seconds of your brain not playing.",
      ],
      ru: [
        "Тиммейт тебя флеймит. Каждый колл — критика. Каждая ошибка — абзац в чат. Твой мозг теперь 50% играет, 50% защищается. Перформанс умирает.",
        "Правило: МЬЮТ в войсе, ОСТАВЬ в чате. Тебе нужны коллы 'enemy at long'. Тебе не нужны комментарии 'ты реально сильвер'.",
        "Не спорь. Не объясняй. Не проси успокоиться. Ничего из этого не работает с тилтовым мозгом. Только усиливает цикл. Мьют, игра, выиграл/проиграл, вышел из матча, забыл.",
        "Если ты IGL и мьютить нельзя — возьми осознанные 5 секунд паузы перед ответом на флейм. Повтори их инфу команде своими словами, без оскорбления. Смоделируй нужное поведение. Токсики зеркалят спокойствие чаще, чем кажется.",
        "Репорть после матча, не во время. Репорт во время матча — это ещё 30 секунд, когда твой мозг не играет.",
      ],
      es: [
        "Un compa te está flameando. Cada call es una crítica. Cada error tiene un párrafo en el chat. Tu cerebro ahora está 50% jugando CS y 50% defendiéndose. El rendimiento se derrumba.",
        "La regla: MUTEALO en voz, MANTENELO en texto. Necesitás los calls 'enemy at long'. No necesitás los 'sos un silver de verdad'.",
        "No discutas. No expliques. No le pidas que se calme. Nada de eso funciona con un cerebro tilteado. Alimenta el ciclo. Muteá, jugá, ganes o pierdas, salí del match, olvidá.",
        "Si sos IGL y no podés muteá los calls — tomate una pausa consciente de 5 segundos antes de responder al flame. Repetile la info al equipo vos, sin el insulto. Modelá el comportamiento que querés. La gente tóxica refleja la calma más seguido de lo que pensás.",
        "Reportá después del match, no durante. Reportar durante el match es otros 30 segundos de tu cerebro no jugando.",
      ],
    },
  },
  {
    id: "physical",
    icon: "💪",
    color: "#2ECC71",
    title: {
      en: "Physical Baseline",
      ru: "Физическая база",
      es: "Base física",
    },
    subtitle: {
      en: "The body plays the game · not the chair",
      ru: "В игру играет тело · не кресло",
      es: "El cuerpo juega el juego · no la silla",
    },
    body: {
      en: [
        "You can't out-practice a body that's not hydrated, not slept, and hasn't moved in 6 hours. Mechanical skill compounds — but only on a working substrate.",
        "Minimum: a glass of water every match. 8 hours of sleep the night before a competitive session. A 2-minute wrist and neck stretch every 45 minutes of play.",
        "Eyes need breaks too. Every 30 minutes: look at something 6+ meters away for 20 seconds. This prevents the headache spiral that kills aim in hour 3.",
        "If you're playing 4+ hours in a row, you're no longer training. You're grinding muscle memory that's already tired. Pros practice in 2-3 hour blocks with real breaks for a reason.",
        "Caffeine is a stimulant, not a skill upgrade. Energy drinks stack with cortisol. After round 10 they make your aim shakier, not sharper. Water + real food beats them in any 3-hour session.",
      ],
      ru: [
        "Ты не натренируешь тело, которое не пьёт, не спит и не двигалось 6 часов. Механика копится — но только на работающем субстрате.",
        "Минимум: стакан воды каждый матч. 8 часов сна перед соревновательной сессией. 2 минуты растяжки запястий и шеи каждые 45 минут игры.",
        "Глазам тоже нужны перерывы. Каждые 30 минут: посмотри на что-то дальше 6 метров 20 секунд. Это предотвращает головную боль, которая убивает аим на третьем часу.",
        "Если играешь 4+ часа подряд — ты уже не тренируешься. Ты втаптываешь усталую мышечную память. Про-игроки тренируются блоками по 2-3 часа с нормальными перерывами не просто так.",
        "Кофеин — стимулятор, не апгрейд скилла. Энергетики складываются с кортизолом. После 10-го раунда они делают аим более трясущимся, не более точным. Вода + нормальная еда выигрывают у них в любой 3-часовой сессии.",
      ],
      es: [
        "No podés superar con práctica un cuerpo sin hidratación, sin sueño y que no se movió en 6 horas. El skill mecánico se acumula — pero solo en un sustrato funcional.",
        "Mínimo: un vaso de agua cada partida. 8 horas de sueño la noche antes de una sesión competitiva. 2 minutos de estiramiento de muñecas y cuello cada 45 minutos de juego.",
        "Los ojos también necesitan pausas. Cada 30 minutos: mirá algo a más de 6 metros durante 20 segundos. Esto evita la espiral de dolor de cabeza que mata tu aim en la hora 3.",
        "Si estás jugando 4+ horas seguidas, ya no estás entrenando. Estás grindeando memoria muscular que ya está cansada. Los pros practican en bloques de 2-3 horas con pausas reales por algo.",
        "La cafeína es un estimulante, no un upgrade de skill. Las energéticas se acumulan con el cortisol. Después de la ronda 10 hacen tu aim más tembloroso, no más preciso. Agua + comida real les gana en cualquier sesión de 3 horas.",
      ],
    },
  },
  {
    id: "professional",
    icon: "🩺",
    color: "#888",
    title: {
      en: "When to See Someone",
      ru: "Когда обратиться к специалисту",
      es: "Cuándo hablar con un profesional",
    },
    subtitle: {
      en: "This isn't about CS anymore",
      ru: "Это уже не про CS",
      es: "Esto ya no es sobre CS",
    },
    body: {
      en: [
        "If the pattern is weekly — tilting, fighting, shame-spiraling, losing 6 hours to a game you're not enjoying — the problem is not Counter-Strike. It's something under it that the game is triggering.",
        "That's OK to look at. There's no 'enough drama' threshold for talking to a professional. You talk to one because you want to understand yourself better, not because your life is already on fire.",
        "Therapy works the same way as aim training: you pay someone qualified, you do reps over months, you get measurably better. The evidence base is as solid as any training method we have.",
        "If you're in the EU, the UK, the US, Canada, most of Latin America — there are free hotlines, discord-based peer support, and sliding-scale therapists. Five minutes of googling in your country will find the right starting point.",
        "The coach's final word: you're worth more than your ELO. The playbook wants you healthy first, competitive second. In that order.",
      ],
      ru: [
        "Если паттерн повторяется еженедельно — тилт, ссоры, стыд-спирали, 6 часов в игре, которая не приносит удовольствия — проблема не в Counter-Strike. Это что-то под игрой, что она триггерит.",
        "Это нормально — в этом разобраться. Нет порога 'достаточно драмы', чтобы поговорить со специалистом. Идёшь потому что хочешь лучше понять себя, а не потому что всё уже горит.",
        "Терапия работает как тренировка аима: платишь квалифицированному человеку, делаешь повторения месяцами, измеримо становишься лучше. База доказательств такая же крепкая, как у любого метода тренировки.",
        "В ЕС, Великобритании, США, Канаде, большей части Латамерики — есть бесплатные горячие линии, peer-support в дискорде, терапевты со скользящей шкалой оплаты. Пять минут гугла в твоей стране найдут стартовую точку.",
        "Финальное слово коуча: ты стоишь больше, чем твой ELO. Плейбук хочет, чтобы ты сначала был здоровым, а потом — соревновательным. В этом порядке.",
      ],
      es: [
        "Si el patrón es semanal — tiltearte, pelearte, espiralar en vergüenza, perder 6 horas en un juego que no estás disfrutando — el problema no es Counter-Strike. Es algo debajo que el juego está gatillando.",
        "Está bien mirar eso. No existe un umbral de 'suficiente drama' para hablar con un profesional. Hablás con uno porque querés entenderte mejor, no porque tu vida ya está en llamas.",
        "La terapia funciona igual que el entrenamiento de aim: le pagás a alguien calificado, hacés reps durante meses, mejorás de forma medible. La base de evidencia es tan sólida como cualquier método de entrenamiento que tenemos.",
        "Si estás en la UE, Reino Unido, EE.UU., Canadá, la mayor parte de América Latina — hay líneas telefónicas gratuitas, soporte en Discord entre pares, y terapeutas con escala deslizante. Cinco minutos de Google en tu país te encuentran un punto de partida.",
        "Palabra final del coach: valés más que tu ELO. El playbook quiere que estés sano primero, competitivo segundo. En ese orden.",
      ],
    },
  },
];
