"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useReduce from "./ui/useReduce";
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from "lucide-react";
import { greeting, hours, shop } from "@/data/content";
import { whatsappHref } from "@/lib";
import Photo from "./Photo";
import { WhatsAppIcon } from "./Icons";
import { cn } from "./ui/cn";
import { ORDER_EVENT } from "./orderBus";

const ease = [0.16, 1, 0.3, 1];

export const kinds = [
  { id: "torta", label: "Torte personalizzate", title: "Torta personalizzata", line: "Con la dedica scritta a mano, per ogni festa", photo: "torta-mont-blanc", alt: "Torta di castagne con la placchetta «Auguri Giulia»" },
  { id: "mignon", label: "Mignon", title: "Vassoio di mignon", line: "Pasticceria mignon dolce e salata, a vassoio", photo: "pasticcini-da-te-bancone", alt: "Il bancone dei pasticcini da tè" },
  { id: "colazione", label: "Vassoio colazione", title: "Vassoio colazione", line: "Maritozzi, bignè e i lievitati della mattina", photo: "maritozzo", alt: "Il maritozzo con la panna" },
  { id: "feste", label: "Festività", title: "Dolci delle feste", line: "Panettoni, colombe e la tradizione romana", photo: "bigne-fritti-zucchero", alt: "Bignè fritti con zucchero a velo" },
];
const kindById = Object.fromEntries(kinds.map((k) => [k.id, k]));

const options = {
  occasione: ["Compleanno", "Battesimo", "Comunione", "Cresima", "Laurea", "Anniversario", "Altro"],
  gusto: ["Crema e frutta fresca", "Cioccolato", "Pistacchio", "Panna e fragole", "Castagne", "Consigliateci voi"],
  assortimento: ["Mignon dolci", "Mignon salati", "Dolce e salato"],
  colazione: ["Maritozzi con la panna", "Bignè", "Cannoli", "Pasticcini da tè", "Pizzette di sfoglia", "Tramezzini"],
  feste: ["Panettone", "Colomba", "Dolci della tradizione romana"],
};
const people = { torta: [12, 4, 100, 2], mignon: [20, 6, 200, 2], colazione: [10, 2, 60, 1] };
const steps = ["Cosa", "Dettagli", "Quando", "Invia"];
const blank = { kind: null, occasione: null, gusto: null, dedica: "", assortimento: null, scelta: [], persone: null, pezzi: 1, data: "", ritiro: null, nome: "", note: "" };

const pad = (n) => String(n).padStart(2, "0");
const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDay = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const short = (t) => t.replace(/^0/, "");
const slotsFor = (s) => (s ? hours.find((h) => h.day === parseDay(s).getDay()).slots : null);

export function buildMessage(o) {
  const k = kindById[o.kind];
  if (!k) return greeting;
  const n = o.persone ?? people[o.kind]?.[0];
  const rows = {
    torta: [o.occasione && `• Occasione: ${o.occasione}`, `• Per ${n} persone`, o.gusto && `• Gusto: ${o.gusto}`, o.dedica.trim() && `• Dedica sulla placchetta: «${o.dedica.trim()}»`],
    mignon: [o.assortimento && `• ${o.assortimento}`, `• Per ${n} persone`],
    colazione: [`• Per ${n} persone`, o.scelta.length && `• Con: ${o.scelta.join(", ")}`],
    feste: [o.scelta.length && `• ${o.scelta.join(", ")}`, `• Pezzi: ${o.pezzi}`],
  }[o.kind].filter(Boolean);
  const when = o.data
    ? `*Ritiro:* ${parseDay(o.data).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}${o.ritiro ? `, ${o.ritiro}` : ""}`
    : o.ritiro && `*Ritiro:* ${o.ritiro}`;
  return [
    greeting,
    "",
    `*${k.title}*`,
    ...rows,
    "",
    when,
    o.nome.trim() && `*Nome:* ${o.nome.trim()}`,
    o.note.trim() && `*Note:* ${o.note.trim()}`,
    "",
    "Grazie!",
  ]
    .filter((l) => l !== false && l !== null && l !== undefined && l !== 0)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

/** The message as WhatsApp will show it: *bold* is bold. */
export function Bubble({ text, className }) {
  return (
    <div className={cn("relative rounded-[1.4rem] rounded-tr-md bg-[#d9fdd3] px-5 py-4 text-[0.98rem] leading-relaxed text-[#111b21] shadow-[0_20px_40px_-24px_rgb(0_0_0/0.8)]", className)}>
      {text.split("\n").map((line, i) =>
        line ? (
          <p key={i}>
            {line.split(/(\*[^*]+\*)/g).map((part, j) => (part.startsWith("*") && part.endsWith("*") ? <strong key={j}>{part.slice(1, -1)}</strong> : part))}
          </p>
        ) : (
          <p key={i} aria-hidden="true" className="h-3" />
        )
      )}
      <span aria-hidden="true" className="mt-1 block text-right text-[0.75rem] text-[#4f5f68]">anteprima</span>
    </div>
  );
}

function Chip({ on, onClick, children }) {
  const reduce = useReduce();
  return (
    <motion.button type="button" aria-pressed={on} onClick={onClick} whileTap={reduce ? undefined : { scale: 0.94 }} className="chip">
      <AnimatePresence initial={false}>
        {on ? (
          <motion.span key="c" initial={{ width: 0, opacity: 0, scale: 0 }} animate={{ width: "auto", opacity: 1, scale: 1 }} exit={{ width: 0, opacity: 0, scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="grid overflow-hidden">
            <Check size={16} strokeWidth={2.6} aria-hidden="true" />
          </motion.span>
        ) : null}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}

function Group({ label, children, hint }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-[1rem] font-semibold text-panna">{label}{hint ? <span className="ml-2 font-normal text-oro-chiaro/80">{hint}</span> : null}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Stepper({ label, value, min, max, step, onChange, unit }) {
  const reduce = useReduce();
  const set = (v) => onChange(Math.max(min, Math.min(max, v)));
  return (
    <div>
      <p id={`lbl-${label}`} className="mb-3 text-[1rem] font-semibold text-panna">{label}</p>
      <div className="inline-flex items-center gap-1 rounded-full bg-white/5 p-1 shadow-[inset_0_0_0_1px_rgb(236_216_166/0.22)]" role="group" aria-labelledby={`lbl-${label}`}>
        <motion.button type="button" whileTap={reduce ? undefined : { scale: 0.88 }} onClick={() => set(value - step)} disabled={value <= min} aria-label="Meno" className="grid h-11 w-11 place-items-center rounded-full text-oro-chiaro transition-colors hover:bg-white/10 disabled:opacity-30">
          <Minus size={18} aria-hidden="true" />
        </motion.button>
        <span className="relative grid h-11 min-w-[5.5rem] place-items-center overflow-hidden text-center" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={value} initial={reduce ? false : { y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? undefined : { y: -18, opacity: 0 }} transition={{ duration: 0.22, ease }} className="serif text-[1.6rem] tabular-nums text-panna">
              {value}
            </motion.span>
          </AnimatePresence>
          <span className="sr-only">{unit}</span>
        </span>
        <motion.button type="button" whileTap={reduce ? undefined : { scale: 0.88 }} onClick={() => set(value + step)} disabled={value >= max} aria-label="Più" className="grid h-11 w-11 place-items-center rounded-full text-oro-chiaro transition-colors hover:bg-white/10 disabled:opacity-30">
          <Plus size={18} aria-hidden="true" />
        </motion.button>
      </div>
      <span className="ml-3 text-[0.95rem] text-oro-chiaro/85">{unit}</span>
    </div>
  );
}

/** Their cakes carry a white-chocolate plaque piped by hand: type the dedication and see it piped. */
function Plaque({ text }) {
  const reduce = useReduce();
  const shown = text.trim() || "Auguri Giulia";
  return (
    <div className="flex flex-col items-center gap-3 rounded-[1.4rem] bg-[radial-gradient(120%_120%_at_50%_0%,#3a2619,#1a100b)] px-4 py-7">
      <motion.div
        layout={!reduce}
        className="plaque max-w-full rounded-[0.9rem] px-7 py-4 text-center"
        initial={false}
        animate={{ rotate: -2.5 }}
        transition={{ layout: { duration: 0.3, ease } }}
      >
        <span className={cn("script block break-words text-[clamp(1.5rem,6vw,2.1rem)] leading-tight", !text.trim() && "opacity-45")}>
          {Array.from(shown).map((ch, i) => (
            <motion.span key={i} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: text.trim() ? 0 : i * 0.04 }}>
              {ch}
            </motion.span>
          ))}
        </span>
      </motion.div>
      <p className="text-[0.92rem] text-oro-chiaro/85">Così la scriviamo sulla placchetta</p>
    </div>
  );
}

export default function OrderWizard() {
  const [o, setO] = useState(blank);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [seen, setSeen] = useState(0);
  const [minDay, setMinDay] = useState("");
  const [sent, setSent] = useState(false);
  const reduce = useReduce();

  const set = (patch) => {
    setO((v) => ({ ...v, ...patch }));
    setSent(false);
  };
  const go = (n) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    setSeen((s) => Math.max(s, n));
  };
  const pick = (kind, preset) => {
    setO((v) => ({ ...blank, nome: v.nome, data: v.data, ritiro: v.ritiro, note: v.note, kind, persone: people[kind]?.[0] ?? null, ...preset }));
    setSent(false);
    setDir(1);
    setStep(1);
    setSeen((s) => Math.max(s, 1));
  };

  useEffect(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    setMinDay(isoDay(t));
    const on = (e) => pick(e.detail.kind, e.detail.preset);
    window.addEventListener(ORDER_EVENT, on);
    return () => window.removeEventListener(ORDER_EVENT, on);
  }, []);

  const message = useMemo(() => buildMessage(o), [o]);
  const slots = slotsFor(o.data);
  const closedDay = slots && slots.length === 0;
  const tooSoon = o.data && minDay && o.data < minDay;
  const dateError = closedDay ? "Il lunedì siamo chiusi: scegliete un altro giorno." : tooSoon ? "Per gli ordini scegliete da domani in poi." : null;
  const ritiroOptions = slots && slots.length
    ? slots.map(([a, b], i) => `${i === 0 ? "in mattinata" : "nel pomeriggio"} (${short(a)}–${short(b)})`)
    : ["in mattinata", "nel pomeriggio"];
  const k = kindById[o.kind];
  const toggle = (item) => set({ scelta: o.scelta.includes(item) ? o.scelta.filter((x) => x !== item) : [...o.scelta, item] });
  const canNext = step === 0 ? !!o.kind : step === 2 ? !dateError : true;

  const panel = {
    enter: (d) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 48 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
    exit: (d) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -48, transition: { duration: 0.22, ease } }),
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* live preview of the message, desktop */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <p className="mb-4 flex items-center gap-2 text-[1rem] font-semibold text-oro-chiaro"><WhatsAppIcon size={18} />Il messaggio che riceviamo</p>
          <motion.div layout={!reduce} transition={{ duration: 0.35, ease }}>
            <Bubble text={message} />
          </motion.div>
          <p className="mt-4 text-[0.95rem] text-panna/70">Si scrive da solo mentre scegliete. Al numero {shop.whatsappLabel}.</p>
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-espresso-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={k?.id ?? "bancone"}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <Photo name={k?.photo ?? "vetrina-torte-semifreddi"} alt={k?.alt ?? "La vetrina delle torte e dei semifreddi"} fill sizes="34vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-3 left-3 rounded-full bg-espresso/80 px-3 py-1.5 text-[0.88rem] text-panna">{k ? k.label : "Dal nostro bancone"}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-[2rem] bg-espresso-2 p-4 shadow-[inset_0_0_0_1px_rgb(236_216_166/0.16),0_40px_80px_-50px_rgb(0_0_0/0.9)] sm:p-6 md:p-8">
          {/* progress: named steps, a gold bar that grows */}
                      <ol className="grid grid-cols-4 gap-1.5" aria-label="Passaggi dell'ordine">
              {steps.map((s, i) => {
                const reachable = i <= seen && (i === 0 || o.kind);
                return (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => reachable && go(i)}
                      disabled={!reachable}
                      aria-current={i === step ? "step" : undefined}
                      className="group block w-full pb-1 text-left disabled:cursor-default"
                    >
                      <span className="relative block h-1.5 overflow-hidden rounded-full bg-white/10">
                        {i <= step ? <motion.span className="absolute inset-0 rounded-full bg-oro" initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 0.5, ease }} /> : null}
                      </span>
                      <span className={cn("mt-2 block text-[0.9rem] font-semibold transition-colors", i === step ? "text-panna" : reachable ? "text-oro-chiaro group-hover:text-panna" : "text-panna/40")}>{s}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

          <motion.div layout={!reduce} transition={{ layout: { duration: 0.4, ease } }} className="relative mt-7 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div key={step} custom={dir} variants={panel} initial="enter" animate="center" exit="exit">
                {step === 0 ? (
                  <div>
                    <h3 className="serif text-[clamp(1.7rem,3vw,2.3rem)] text-panna">Cosa vi prepariamo?</h3>
                    <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo di ordine">
                      {kinds.map((x) => {
                        const on = o.kind === x.id;
                        return (
                          <motion.button
                            key={x.id}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => pick(x.id)}
                            whileHover={reduce ? undefined : { y: -4 }}
                            whileTap={reduce ? undefined : { scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className={cn("group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.4rem] p-3.5 text-left sm:aspect-[5/4] sm:p-5", on ? "ring-2 ring-oro" : "ring-1 ring-white/10")}
                          >
                            <Photo name={x.photo} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="-z-10 object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.07]" />
                            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(26_16_11/0.05),rgb(26_16_11/0.88)_78%)]" />
                            <span className="serif block text-[1.3rem] leading-tight text-panna sm:text-[1.6rem]">{x.label}</span>
                            <span className="mt-1 block text-[0.88rem] leading-snug text-oro-chiaro sm:text-[0.95rem]">{x.line}</span>
                            <AnimatePresence>
                              {on ? (
                                <motion.span key="ok" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 520, damping: 22 }} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-oro text-espresso">
                                  <Check size={18} strokeWidth={2.8} aria-hidden="true" />
                                </motion.span>
                              ) : null}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 1 && k ? (
                  <div className="grid gap-7">
                    <h3 className="serif text-[clamp(1.7rem,3vw,2.3rem)] text-panna">{k.title}</h3>
                    {o.kind === "torta" ? (
                      <>
                        <Group label="Per quale occasione?">{options.occasione.map((x) => <Chip key={x} on={o.occasione === x} onClick={() => set({ occasione: o.occasione === x ? null : x })}>{x}</Chip>)}</Group>
                        <Stepper label="Quante persone?" unit="persone" value={o.persone} min={people.torta[1]} max={people.torta[2]} step={people.torta[3]} onChange={(v) => set({ persone: v })} />
                        <Group label="Il gusto">{options.gusto.map((x) => <Chip key={x} on={o.gusto === x} onClick={() => set({ gusto: o.gusto === x ? null : x })}>{x}</Chip>)}</Group>
                        <div className="grid gap-4 md:grid-cols-2 md:items-center">
                          <label className="block">
                            <span className="mb-3 block text-[1rem] font-semibold text-panna">La dedica <span className="font-normal text-oro-chiaro/80">(facoltativa)</span></span>
                            <input value={o.dedica} maxLength={36} onChange={(e) => set({ dedica: e.target.value })} placeholder="Es. Auguri Giulia" className="field" />
                          </label>
                          <Plaque text={o.dedica} />
                        </div>
                      </>
                    ) : null}
                    {o.kind === "mignon" ? (
                      <>
                        <Group label="Che assortimento?">{options.assortimento.map((x) => <Chip key={x} on={o.assortimento === x} onClick={() => set({ assortimento: o.assortimento === x ? null : x })}>{x}</Chip>)}</Group>
                        <Stepper label="Per quante persone?" unit="persone" value={o.persone} min={people.mignon[1]} max={people.mignon[2]} step={people.mignon[3]} onChange={(v) => set({ persone: v })} />
                      </>
                    ) : null}
                    {o.kind === "colazione" ? (
                      <>
                        <Stepper label="Per quante persone?" unit="persone" value={o.persone} min={people.colazione[1]} max={people.colazione[2]} step={people.colazione[3]} onChange={(v) => set({ persone: v })} />
                        <Group label="Cosa mettiamo nel vassoio?" hint="anche più di uno">{options.colazione.map((x) => <Chip key={x} on={o.scelta.includes(x)} onClick={() => toggle(x)}>{x}</Chip>)}</Group>
                      </>
                    ) : null}
                    {o.kind === "feste" ? (
                      <>
                        <Group label="Cosa prenotate?" hint="anche più di uno">{options.feste.map((x) => <Chip key={x} on={o.scelta.includes(x)} onClick={() => toggle(x)}>{x}</Chip>)}</Group>
                        <Stepper label="Quanti pezzi?" unit="pezzi" value={o.pezzi} min={1} max={30} step={1} onChange={(v) => set({ pezzi: v })} />
                      </>
                    ) : null}
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="grid gap-7">
                    <h3 className="serif text-[clamp(1.7rem,3vw,2.3rem)] text-panna">Quando passate a ritirare?</h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-3 block text-[1rem] font-semibold text-panna">Il giorno</span>
                        <input type="date" min={minDay || undefined} value={o.data} onChange={(e) => set({ data: e.target.value, ritiro: null })} aria-invalid={dateError ? true : undefined} aria-describedby="data-msg" className="field" />
                        <AnimatePresence initial={false}>
                          {dateError ? (
                            <motion.span id="data-msg" role="alert" key={dateError} initial={reduce ? false : { opacity: 0, x: -8 }} animate={reduce ? { opacity: 1 } : { opacity: 1, x: [8, -6, 4, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-2 block text-[0.95rem] text-[#f0a08c]">
                              {dateError}
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </label>
                      <label className="block">
                        <span className="mb-3 block text-[1rem] font-semibold text-panna">Il vostro nome</span>
                        <input value={o.nome} onChange={(e) => set({ nome: e.target.value })} autoComplete="name" placeholder="Nome e cognome" className="field" />
                      </label>
                    </div>
                    {!closedDay ? (
                      <Group label="A che ora?">{ritiroOptions.map((x) => <Chip key={x} on={o.ritiro === x} onClick={() => set({ ritiro: o.ritiro === x ? null : x })}>{x}</Chip>)}</Group>
                    ) : null}
                    <label className="block">
                      <span className="mb-3 block text-[1rem] font-semibold text-panna">Altro da dirci? <span className="font-normal text-oro-chiaro/80">(facoltativo)</span></span>
                      <textarea value={o.note} onChange={(e) => set({ note: e.target.value })} rows={3} placeholder="Allergie, decorazioni, un'idea per la torta…" className="field resize-y" />
                    </label>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="grid gap-6">
                    <h3 className="serif text-[clamp(1.7rem,3vw,2.3rem)] text-panna">Tutto pronto</h3>
                    <Bubble text={message} className="lg:hidden" />
                    <p className="text-[1.02rem] text-panna/85 lg:max-w-[46ch]">Premete il pulsante: si apre WhatsApp con il messaggio già scritto. Vi rispondiamo noi per confermare l'ordine.</p>
                    <motion.a
                      href={whatsappHref(message)}
                      target="_blank"
                      rel="noopener"
                      onClick={() => setSent(true)}
                      whileHover={reduce ? undefined : { y: -2 }}
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      className="btn btn-oro btn-shine min-h-16 w-full text-[1.1rem] sm:w-auto sm:self-start sm:px-8"
                    >
                      <WhatsAppIcon size={22} />
                      Invia su WhatsApp
                    </motion.a>
                    <AnimatePresence>
                      {sent ? (
                        <motion.p key="sent" role="status" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[1rem] text-oro-chiaro">
                          <motion.span initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }} className="grid h-7 w-7 place-items-center rounded-full bg-[#7fc062] text-espresso">
                            <Check size={16} strokeWidth={3} aria-hidden="true" />
                          </motion.span>
                          Messaggio pronto su WhatsApp: premete invia.
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {step > 0 ? (
            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={() => go(step - 1)} className="btn btn-line min-h-12 px-5 text-oro-chiaro">
                <ArrowLeft size={18} aria-hidden="true" />
                Indietro
              </button>
              {step < 3 ? (
                <motion.button type="button" onClick={() => canNext && go(step + 1)} disabled={!canNext} whileTap={reduce ? undefined : { scale: 0.97 }} className="btn btn-oro group min-h-12 px-6 disabled:opacity-40">
                  {step === 2 ? "Vedi il messaggio" : "Avanti"}
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
