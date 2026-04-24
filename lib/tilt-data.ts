import type { Lang } from "@/lib/i18n";

export type TiltOption = { text: string; weight: number; tags: string[] };
export type TiltQuestion = { q: string; options: TiltOption[] };

export const QUESTIONS: Record<Lang, TiltQuestion[]> = {
  en: [
    { q: "Your teammate just baited you on B for the third round in a row. You...", options: [
      { text: "say nothing, keep playing, call it out after the half.", weight: 0, tags: ["mature"] },
      { text: 'type "nt" with mild sarcasm in chat.', weight: 1, tags: ["passive_aggressive"] },
      { text: "mute them instantly and stop calling.", weight: 2, tags: ["isolation"] },
      { text: 'voice chat: "ARE YOU STUPID?" then solo queue rage.', weight: 3, tags: ["rage", "toxic_self"] },
    ]},
    { q: "You just lost 5 rounds in a row. Check your hand.", options: [
      { text: "it's fine. relaxed grip, breathing normal.", weight: 0, tags: ["mature"] },
      { text: "tight mouse grip. shoulders up.", weight: 1, tags: ["physical_tension"] },
      { text: "white knuckles. teeth clenched.", weight: 2, tags: ["physical_tension"] },
      { text: "i punched my desk twice already.", weight: 3, tags: ["rage", "physical_tension"] },
    ]},
    { q: "How long have you been queuing today?", options: [
      { text: "1-2 matches. im warming up.", weight: 0, tags: ["mature"] },
      { text: "3-4. feeling it now.", weight: 1, tags: ["fatigue"] },
      { text: "5-7. losing streak. one more and i win back.", weight: 2, tags: ["fatigue", "gamblers"] },
      { text: "i queued instead of eating lunch. AND dinner.", weight: 3, tags: ["fatigue", "gamblers"] },
    ]},
    { q: "Your crosshair placement right now — be honest.", options: [
      { text: "head level, pre-aiming common angles.", weight: 0, tags: ["mature"] },
      { text: "head level but i wide-swing too often.", weight: 1, tags: ["mechanical"] },
      { text: "i've started spraying first bullet hip-fire.", weight: 2, tags: ["mechanical", "rage"] },
      { text: "what's crosshair placement", weight: 3, tags: ["mechanical"] },
    ]},
    { q: 'The enemy team types "ez" after winning the round. You...', options: [
      { text: "ignore it. focus on the buy.", weight: 0, tags: ["mature"] },
      { text: 'roll eyes. maybe type "gg" sarcastically.', weight: 1, tags: ["passive_aggressive"] },
      { text: "type back. insult their winrate. quote their rank.", weight: 2, tags: ["toxic_other"] },
      { text: "i have already messaged 3 of them on steam.", weight: 3, tags: ["toxic_other", "obsession"] },
    ]},
    { q: "When did you last drink water or stand up?", options: [
      { text: "in the last 30 min. i'm hydrated.", weight: 0, tags: ["mature"] },
      { text: "1-2 hours ago.", weight: 1, tags: ["physical_neglect"] },
      { text: "i don't remember.", weight: 2, tags: ["physical_neglect", "fatigue"] },
      { text: "i drink energy drinks. those count, right?", weight: 3, tags: ["physical_neglect", "fatigue"] },
    ]},
    { q: "You're 1vX in the clutch. What goes through your head?", options: [
      { text: "info. i count utility, positions, time on bomb.", weight: 0, tags: ["mature"] },
      { text: "i try to slow down but my heart's pounding.", weight: 1, tags: ["anxiety"] },
      { text: "i already know i will lose this.", weight: 2, tags: ["anxiety", "defeatism"] },
      { text: "i peek with aim down sights and pray.", weight: 3, tags: ["anxiety", "defeatism", "mechanical"] },
    ]},
  ],
  ru: [
    { q: "Тиммейт тебя третий раунд подряд сливает на B. Ты...", options: [
      { text: "молчишь, играешь, разберу после половины.", weight: 0, tags: ["mature"] },
      { text: 'пишу "nt" с лёгким сарказмом.', weight: 1, tags: ["passive_aggressive"] },
      { text: "моментально мьют и перестаю коллить.", weight: 2, tags: ["isolation"] },
      { text: 'в войсе: "ТЫ ТУПОЙ?" и рейджквит в соло.', weight: 3, tags: ["rage", "toxic_self"] },
    ]},
    { q: "Ты слил 5 раундов подряд. Посмотри на свою руку.", options: [
      { text: "расслаблена. дыхание ровное.", weight: 0, tags: ["mature"] },
      { text: "крепко держу мышку. плечи зажаты.", weight: 1, tags: ["physical_tension"] },
      { text: "костяшки побелели, зубы сжаты.", weight: 2, tags: ["physical_tension"] },
      { text: "я уже дважды ударил по столу.", weight: 3, tags: ["rage", "physical_tension"] },
    ]},
    { q: "Сколько ты играешь сегодня?", options: [
      { text: "1-2 матча. разминаюсь.", weight: 0, tags: ["mature"] },
      { text: "3-4. в потоке.", weight: 1, tags: ["fatigue"] },
      { text: "5-7. лузстрик. ещё один — отыграюсь.", weight: 2, tags: ["fatigue", "gamblers"] },
      { text: "не поел, чтобы играть. оба раза.", weight: 3, tags: ["fatigue", "gamblers"] },
    ]},
    { q: "Твой crosshair placement сейчас — честно.", options: [
      { text: "на уровне головы, преаим углов.", weight: 0, tags: ["mature"] },
      { text: "на уровне головы но часто выглядываю широко.", weight: 1, tags: ["mechanical"] },
      { text: "начинаю стрейфить первую пулю от бедра.", weight: 2, tags: ["mechanical", "rage"] },
      { text: "что такое crosshair placement", weight: 3, tags: ["mechanical"] },
    ]},
    { q: 'Враги пишут "ez" после выигранного раунда. Ты...', options: [
      { text: "игнор. думаю про бай.", weight: 0, tags: ["mature"] },
      { text: 'закатываю глаза. может, "гг" с сарказмом.', weight: 1, tags: ["passive_aggressive"] },
      { text: "отвечаю. цитирую их винрейт и ранг.", weight: 2, tags: ["toxic_other"] },
      { text: "я уже написал троим из них в стим.", weight: 3, tags: ["toxic_other", "obsession"] },
    ]},
    { q: "Когда ты последний раз пил воду или вставал?", options: [
      { text: "последние 30 минут. норм пью.", weight: 0, tags: ["mature"] },
      { text: "1-2 часа назад.", weight: 1, tags: ["physical_neglect"] },
      { text: "не помню.", weight: 2, tags: ["physical_neglect", "fatigue"] },
      { text: "я пью энергетики. они считаются?", weight: 3, tags: ["physical_neglect", "fatigue"] },
    ]},
    { q: "Ты 1vX в клатче. Что в голове?", options: [
      { text: "инфа. считаю утилу, позиции, таймер.", weight: 0, tags: ["mature"] },
      { text: "пытаюсь замедлиться, но сердце стучит.", weight: 1, tags: ["anxiety"] },
      { text: "я уже знаю, что слью.", weight: 2, tags: ["anxiety", "defeatism"] },
      { text: "пикаю с прицелом и молюсь.", weight: 3, tags: ["anxiety", "defeatism", "mechanical"] },
    ]},
  ],
  es: [
    { q: "Tu compa te baiteó en B tres rondas seguidas. Vos...", options: [
      { text: "no digo nada, sigo jugando, hablo después del half.", weight: 0, tags: ["mature"] },
      { text: 'tiro un "nt" con sarcasmo.', weight: 1, tags: ["passive_aggressive"] },
      { text: "mute al toque, dejo de callar.", weight: 2, tags: ["isolation"] },
      { text: 'en el voice: "¿SOS IDIOTA?" y rage-quit en solo.', weight: 3, tags: ["rage", "toxic_self"] },
    ]},
    { q: "Perdiste 5 rondas seguidas. Mirate la mano.", options: [
      { text: "relajado. respiro normal.", weight: 0, tags: ["mature"] },
      { text: "agarro fuerte el mouse. hombros tensos.", weight: 1, tags: ["physical_tension"] },
      { text: "nudillos blancos. dientes apretados.", weight: 2, tags: ["physical_tension"] },
      { text: "ya pegué dos veces al escritorio.", weight: 3, tags: ["rage", "physical_tension"] },
    ]},
    { q: "¿Cuánto llevás jugando hoy?", options: [
      { text: "1-2 partidas. estoy calentando.", weight: 0, tags: ["mature"] },
      { text: "3-4. en el flow.", weight: 1, tags: ["fatigue"] },
      { text: "5-7. en loss-streak. una más y me recupero.", weight: 2, tags: ["fatigue", "gamblers"] },
      { text: "no comí para jugar. dos veces.", weight: 3, tags: ["fatigue", "gamblers"] },
    ]},
    { q: "Tu crosshair placement ahora — honesto.", options: [
      { text: "a la altura de la cabeza, pre-aim.", weight: 0, tags: ["mature"] },
      { text: "a la cabeza pero hago wide-swing mucho.", weight: 1, tags: ["mechanical"] },
      { text: "arranco a sprayear desde la cintura.", weight: 2, tags: ["mechanical", "rage"] },
      { text: "qué es crosshair placement", weight: 3, tags: ["mechanical"] },
    ]},
    { q: 'El enemigo tipea "ez" después de ganar. Vos...', options: [
      { text: "ignoro. pienso la compra.", weight: 0, tags: ["mature"] },
      { text: 'pongo los ojos en blanco. quizás "gg" irónico.', weight: 1, tags: ["passive_aggressive"] },
      { text: "contesto. cito su winrate y rango.", weight: 2, tags: ["toxic_other"] },
      { text: "ya les mandé mensaje a tres por steam.", weight: 3, tags: ["toxic_other", "obsession"] },
    ]},
    { q: "¿Cuándo tomaste agua o te paraste por última vez?", options: [
      { text: "en los últimos 30 min. hidratado.", weight: 0, tags: ["mature"] },
      { text: "hace 1-2 horas.", weight: 1, tags: ["physical_neglect"] },
      { text: "no me acuerdo.", weight: 2, tags: ["physical_neglect", "fatigue"] },
      { text: "tomo energéticas. ¿cuenta?", weight: 3, tags: ["physical_neglect", "fatigue"] },
    ]},
    { q: "Estás 1vX en clutch. ¿Qué te pasa por la cabeza?", options: [
      { text: "info. cuento util, posiciones, tiempo de bomb.", weight: 0, tags: ["mature"] },
      { text: "trato de bajar pero el corazón va a mil.", weight: 1, tags: ["anxiety"] },
      { text: "ya sé que lo pierdo.", weight: 2, tags: ["anxiety", "defeatism"] },
      { text: "peekeo con mira apuntada y rezo.", weight: 3, tags: ["anxiety", "defeatism", "mechanical"] },
    ]},
  ],
};

export type Diagnosis = { tag: string; range: string; color: string; diag: string; presc: string; chapter: string; level: string };

export const DIAGNOSES: Record<Lang, Record<string, Omit<Diagnosis, "level">>> = {
  en: {
    zero:    { tag: "GLOBAL ELITE ZEN",        range: "0-15",  color: "#2ECC71", diag: "you're not tilted. are you sure you play CS?", presc: "come back when someone bait-tradeskims your AWP. we'll talk then.", chapter: "mental/zero-tilt-maintenance" },
    mild:    { tag: "ROUND-TO-ROUND FRUSTRATION", range: "16-35", color: "#F5A623", diag: "mild tilt. typical after a loss streak. you're still reading info and thinking — barely.", presc: "take the 10-second rule: before every round, breathe 4 seconds in, 4 out. mute yourself for one round if you feel the urge to flame.", chapter: "mental/the-10-second-rule" },
    medium:  { tag: "ACTIVE TILT SYNDROME",    range: "36-60", color: "#F5A623", diag: "you are tilted. your aim is fine — your brain is not. every decision is 10% slower than it should be.", presc: "close CS2. right now. 30-minute walk, one full glass of water, no social media. if you come back and still want to queue — warmup 15 minutes in aim_botz before matchmaking.", chapter: "mental/3-loss-rule" },
    high:    { tag: "FULL CODE RED",            range: "61-80", color: "#D0021B", diag: "you are in full tilt. you've lost the game already — you just haven't accepted it. every queue from here costs you ELO and mental HP.", presc: "stop queuing today. not one more match. mute all chat in steam, open the history chapter of this playbook, watch a demo of a calm player (zonic-era Astralis). tomorrow, 8 hours of sleep minimum before CS.", chapter: "mental/the-3-loss-rule" },
    extreme: { tag: "CERTIFIED CYKA",           range: "81-100", color: "#D0021B", diag: "you're not tilted. you're radicalized. your enemies live rent-free in your head. the coach is worried. so is your mom.", presc: "uninstall. not CS — reddit, discord, whatever you're doom-scrolling. eat a real meal. sleep 10 hours. call someone who doesn't play video games. if this pattern is weekly, it's not the game. it's something else — and that's OK to look at.", chapter: "mental/when-to-see-a-professional" },
  },
  ru: {
    zero:    { tag: "GLOBAL ELITE ZEN",         range: "0-15",  color: "#2ECC71", diag: "ты не в тилте. ты вообще играешь в CS?", presc: "приходи, когда тиммейт сольёт твой AWP на бейте. тогда поговорим.", chapter: "mental/zero-tilt-maintenance" },
    mild:    { tag: "ЛЁГКАЯ ФРУСТРАЦИЯ",        range: "16-35", color: "#F5A623", diag: "лёгкий тилт. норма после лузстрика. ты ещё читаешь инфу — но уже с трудом.", presc: "правило 10 секунд: перед каждым раундом 4 сек вдох, 4 сек выдох. если хочется флеймить — замьють себя на раунд.", chapter: "mental/the-10-second-rule" },
    medium:  { tag: "АКТИВНЫЙ ТИЛТ-СИНДРОМ",    range: "36-60", color: "#F5A623", diag: "ты в тилте. с аимом порядок — с головой нет. каждое решение на 10% медленнее, чем должно быть.", presc: "закрой CS2. прямо сейчас. 30 минут прогулки, стакан воды, без соцсетей. если вернёшься и захочешь играть — 15 минут aim_botz перед ммр.", chapter: "mental/3-loss-rule" },
    high:    { tag: "CODE RED",                 range: "61-80", color: "#D0021B", diag: "ты в полном тилте. игра уже проиграна — ты просто ещё не признал. каждый матч дальше — минус ELO и минус ментал HP.", presc: "завязывай на сегодня. ни одного матча больше. мут чата в стиме, открой главу \"История\" в плейбуке, посмотри демо спокойного игрока (Astralis эры zonic). завтра — минимум 8 часов сна до CS.", chapter: "mental/the-3-loss-rule" },
    extreme: { tag: "CERTIFIED CYKA",            range: "81-100", color: "#D0021B", diag: "это не тилт. это радикализация. враги живут в твоей голове бесплатно. коуч волнуется. мама — тоже.", presc: "удали — не CS, а reddit/discord, где ты скроллишь. поешь нормально. поспи 10 часов. позвони тому, кто не играет. если так бывает каждую неделю — дело не в игре. это нормально — обратиться к специалисту.", chapter: "mental/when-to-see-a-professional" },
  },
  es: {
    zero:    { tag: "GLOBAL ELITE ZEN",         range: "0-15",  color: "#2ECC71", diag: "no estás tilteado. ¿en serio jugás CS?", presc: "volvé cuando un compa te baitee tu AWP. ahí hablamos.", chapter: "mental/zero-tilt-maintenance" },
    mild:    { tag: "FRUSTRACIÓN LEVE",         range: "16-35", color: "#F5A623", diag: "tilt leve. normal después de un loss-streak. todavía leés info — pero con esfuerzo.", presc: "regla de los 10 segundos: antes de cada ronda, 4 seg inhalar, 4 seg exhalar. si querés flamear — muteate una ronda.", chapter: "mental/the-10-second-rule" },
    medium:  { tag: "SÍNDROME DE TILT ACTIVO",  range: "36-60", color: "#F5A623", diag: "estás tilteado. el aim está — la cabeza no. cada decisión es 10% más lenta de lo que debería.", presc: "cerrá CS2. ahora. 30 min de caminata, un vaso de agua, sin redes. si volvés y querés jugar — 15 min en aim_botz antes de MM.", chapter: "mental/3-loss-rule" },
    high:    { tag: "CODE RED",                 range: "61-80", color: "#D0021B", diag: "estás en tilt total. ya perdiste el juego — solo no lo aceptaste. cada partida de acá cuesta ELO y HP mental.", presc: "dejá de jugar hoy. ni una más. muteá todo el chat de steam, abrí el capítulo de historia, mirá una demo de un jugador tranquilo (Astralis era zonic). mañana, 8 hs de sueño mínimo.", chapter: "mental/the-3-loss-rule" },
    extreme: { tag: "CERTIFIED CYKA",            range: "81-100", color: "#D0021B", diag: "no estás tilteado. estás radicalizado. tus enemigos viven en tu cabeza gratis. el coach está preocupado. tu mamá también.", presc: "desinstalá — no CS, reddit/discord, lo que scrolleás. comé algo real. dormí 10 hs. llamá a alguien que no juegue. si esto pasa cada semana — no es el juego. está bien hablar con un profesional.", chapter: "mental/when-to-see-a-professional" },
  },
};

export const getDiagnosis = (pct: number, lang: Lang): Diagnosis => {
  const d = DIAGNOSES[lang];
  if (pct <= 15) return { ...d.zero, level: "zero" };
  if (pct <= 35) return { ...d.mild, level: "mild" };
  if (pct <= 60) return { ...d.medium, level: "medium" };
  if (pct <= 80) return { ...d.high, level: "high" };
  return { ...d.extreme, level: "extreme" };
};
