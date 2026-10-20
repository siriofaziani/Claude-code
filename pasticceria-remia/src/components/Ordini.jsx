"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Copy, Minus, Phone, Plus, Send, X } from "lucide-react";
import { hours, shop, whatsappGreeting } from "@/data/content";
import { ORDER_NEW_TAB, orderTarget } from "@/data/order";
import Photo from "./Photo";
import Wordmark from "./Wordmark";
import { cn } from "./ui/cn";
import useReduce from "./ui/useReduce";
import { ORDER_EVENT } from "./orderBus";

const ease = [0.16, 1, 0.3, 1];

export const kinds = [
  { id: "torte", label: "Torte per eventi", title: "Torta per un evento", line: "Compleanni, cerimonie e nozze, con la dedica", photo: "torta-numero", alt: "Torta a numero con fragole e roselline" },
  { id: "pasticceria", label: "Pasticceria e mignon", title: "Vassoio di pasticceria", line: "Mignon, paste e pasticceria da tè a vassoio", photo: "mignon-vassoio", alt: "Mignon al cioccolato in vetrina" },
  { id: "salato", label: "Salato e rinfreschi", title: "Salato per un rinfresco", line: "Pizzette di sfoglia, tramezzini e rustici", photo: null },
  { id: "colazioni", label: "Colazioni e festività", title: "Colazione o dolci delle feste", line: "Cornetti, maritozzi, bomboloni, ciambelloni", photo: "maritozzi-vassoio", alt: "Vassoio di maritozzi con la panna" },
];
const kindById = Object.fromEntries(kinds.map((k) => [k.id, k]));

const options = {
  occasione: ["Compleanno", "Battesimo", "Comunione", "Cresima", "Laurea", "Nozze", "Altro"],
  stile: ["Panna e frutta fresca", "Glassa a specchio", "Al cioccolato", "Con un personaggio", "Mimosa", "Consigliateci voi"],
  assortimento: ["Mignon misti", "Mignon al cioccolato", "Crostatine e tartellette", "Paste grandi", "Pasticceria da tè"],
  salato: ["Pizzette di sfoglia", "Tramezzini", "Rustici"],
  evento: ["Festa", "Matrimonio", "Rinfresco in ufficio", "Altro"],
  colazioni: ["Cornetti", "Maritozzi con la panna", "Bomboloni", "Ciambellone", "Crostata", "Dolci delle feste"],
};
// [default, min, max, step]
const people = { torte: [12, 4, 150, 2], pasticceria: [20, 6, 200, 2], salato: [30, 10, 300, 5], colazioni: [10, 2, 80, 1] };
const steps = ["Richiesta", "Dettagli", "Ritiro", "Conferma"];
const blank = { kind: null, occasione: null, stile: null, dedica: "", assortimento: null, evento: null, scelta: [], persone: null, data: "", ritiro: null, nome: "", telefono: "", note: "" };

const pad = (n) => String(n).padStart(2, "0");
const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDay = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const short = (t) => t.replace(/^0/, "").replace(/:00$/, "");
const slotsFor = (s) => (s ? hours.find((h) => h.day === parseDay(s).getDay()).slots : null);

export function buildMessage(o) {
  const k = kindById[o.kind];
  if (!k) return whatsappGreeting;
  const n = o.persone ?? people[o.kind][0];
  const rows = {
    torte: [o.occasione && `• Occasione: ${o.occasione}`, `• Per ${n} persone`, o.stile && `• Stile: ${o.stile}`, o.dedica.trim() && `• Dedica sulla placchetta: «${o.dedica.trim()}»`],
    pasticceria: [o.assortimento && `• ${o.assortimento}`, `• Per ${n} persone`],
    salato: [o.scelta.length && `• ${o.scelta.join(", ")}`, o.evento && `• Per: ${o.evento.toLowerCase()}`, `• Per ${n} persone`],
    colazioni: [o.scelta.length && `• ${o.scelta.join(", ")}`, `• Per ${n} persone`],
  }[o.kind].filter(Boolean);
  const when = o.data
    ? `*Ritiro:* ${parseDay(o.data).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}${o.ritiro ? `, ${o.ritiro}` : ""}`
    : o.ritiro && `*Ritiro:* ${o.ritiro}`;
  return [
    whatsappGreeting,
    "",
    `*${k.title}*`,
    ...rows,
    "",
    when,
    o.nome.trim() && `*Nome:* ${o.nome.trim()}`,
    o.telefono.trim() && `*Telefono:* ${o.telefono.trim()}`,
    o.note.trim() && `*Note:* ${o.note.trim()}`,
    "",
    "Grazie!",
  ]
    .filter((l) => typeof l === "string")
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** The order ticket: the request as the shop will read it, on ivory paper. */
export function Ticket({ text, className }) {
  return (
    <div className={cn("relative rounded-[1.4rem] bg-avorio px-6 pb-5 pt-6 text-[0.98rem] leading-relaxed text-inchiostro shadow-[0_30px_60px_-36px_rgb(0_0_0/0.9)]", className)}>
      <Wordmark className="mb-4 w-36 text-champagne-scuro" label="" />
      {text.split("\n").map((line, i) =>
        line ? (
          <p key={i}>{line.split(/(\*[^*]+\*)/g).map((part, j) => (part.startsWith("*") && part.endsWith("*") ? <strong key={j} className="font-semibold">{part.slice(1, -1)}</strong> : part))}</p>
        ) : (
          <p key={i} aria-hidden="true" className="h-3" />
        )
      )}
      <span aria-hidden="true" className="mt-4 block text-right text-[0.84rem] text-tostato">{shop.address} · Tel. {shop.phone}</span>
    </div>
  );
}

function Chip({ on, onClick, children }) {
  return (
    <motion.button type="button" aria-pressed={on} onClick={onClick} whileTap={{ scale: 0.94 }} className="chip">
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

function Group({ label, hint, children }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-[1rem] font-semibold text-avorio">{label}{hint ? <span className="ml-2 font-normal text-champagne-chiaro/80">{hint}</span> : null}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Stepper({ label, value, min, max, step, onChange, unit }) {
  const set = (v) => onChange(Math.max(min, Math.min(max, v)));
  const id = `lbl-${label.replace(/\W+/g, "")}`;
  return (
    <div>
      <p id={id} className="mb-3 text-[1rem] font-semibold text-avorio">{label}</p>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/5 p-1 shadow-[inset_0_0_0_1px_rgb(236_220_188/0.22)]" role="group" aria-labelledby={id}>
          <motion.button type="button" whileTap={{ scale: 0.88 }} onClick={() => set(value - step)} disabled={value <= min} aria-label="Meno" className="grid h-11 w-11 place-items-center rounded-full text-champagne-chiaro transition-colors hover:bg-white/10 disabled:opacity-30">
            <Minus size={18} aria-hidden="true" />
          </motion.button>
          <span className="relative grid h-11 min-w-[5.5rem] place-items-center overflow-hidden text-center" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={value} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.22, ease }} className="serif text-[1.8rem] font-[600] tabular-nums text-avorio">
                {value}
              </motion.span>
            </AnimatePresence>
          </span>
          <motion.button type="button" whileTap={{ scale: 0.88 }} onClick={() => set(value + step)} disabled={value >= max} aria-label="Più" className="grid h-11 w-11 place-items-center rounded-full text-champagne-chiaro transition-colors hover:bg-white/10 disabled:opacity-30">
            <Plus size={18} aria-hidden="true" />
          </motion.button>
        </div>
        <span className="text-[0.95rem] text-champagne-chiaro/85">{unit}</span>
      </div>
    </div>
  );
}

/** Their cakes carry a chocolate plaque with the name piped by hand: type it and see it piped. */
function Plaque({ text }) {
  const t = text.trim();
  const shown = t || "Auguri Camilla";
  return (
    <div className="flex flex-col items-center gap-3 rounded-[1.4rem] bg-[radial-gradient(120%_120%_at_50%_0%,#f3e6cf,#e2d1b5)] px-4 py-7">
      <motion.div layout className="plaque max-w-full rounded-[0.9rem] px-7 py-4 text-center" initial={false} animate={{ rotate: -2.5 }} transition={{ layout: { duration: 0.3, ease } }}>
        <span className={cn("serif block break-words text-[clamp(1.6rem,6vw,2.2rem)] font-[600] italic leading-tight", !t && "opacity-50")}>
          {Array.from(shown).map((ch, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: t ? 0 : i * 0.04 }}>
              {ch}
            </motion.span>
          ))}
        </span>
      </motion.div>
      <p className="text-[0.92rem] text-tostato">Così la scriviamo sulla placchetta</p>
    </div>
  );
}

/** When no order link is configured yet: the request, ready to copy or to read out on the phone. */
function Ready({ open, message, onClose }) {
  const dialog = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    setCopied(false);
  }, [open]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.replace(/\*/g, ""));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="pronto-titolo"
      className="m-auto max-h-[92dvh] w-[min(36rem,calc(100vw-1.5rem))] overflow-y-auto rounded-[2rem] bg-cioccolato p-0 text-avorio backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 id="pronto-titolo" className="serif text-[2.1rem] leading-tight text-champagne-chiaro">La richiesta è pronta</h3>
          <button type="button" onClick={onClose} aria-label="Chiudi" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-avorio hover:bg-white/10"><X size={20} aria-hidden="true" /></button>
        </div>
        <p className="mt-3 text-[1.02rem] text-avorio/85">Per ora gli ordini si fanno al telefono o al bancone: chiamateci e leggeteci la richiesta, oppure copiatela.</p>
        <Ticket text={message} className="mt-6" />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={shop.phoneHref} className="btn btn-champagne btn-shine flex-1">
            <Phone size={18} aria-hidden="true" />
            Chiama {shop.phone}
          </a>
          <motion.button type="button" onClick={copy} whileTap={{ scale: 0.97 }} className="btn btn-line flex-1 text-champagne-chiaro">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "ok" : "copy"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="inline-flex items-center gap-2">
                {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                {copied ? "Copiata" : "Copia la richiesta"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </dialog>
  );
}

export default function Ordini() {
  const [o, setO] = useState(blank);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [seen, setSeen] = useState(0);
  const [minDay, setMinDay] = useState("");
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);
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
    setO((v) => ({ ...blank, nome: v.nome, telefono: v.telefono, data: v.data, ritiro: v.ritiro, note: v.note, kind, persone: people[kind][0], ...preset }));
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
  const target = orderTarget(message);
  const slots = slotsFor(o.data);
  const closedDay = slots && slots.length === 0;
  const tooSoon = o.data && minDay && o.data < minDay;
  const dateError = closedDay ? "Il lunedì siamo chiusi: scegliete un altro giorno." : tooSoon ? "Per le prenotazioni scegliete da domani in poi." : null;
  const ritiroOptions = slots?.length === 2
    ? slots.map(([a, b], i) => `${i === 0 ? "in mattinata" : "nel pomeriggio"} (${short(a)}–${short(b)})`)
    : ["in mattinata", "nel pomeriggio"];
  const continuato = slots?.length === 1 ? `Quel giorno siamo aperti con orario continuato, ${short(slots[0][0])}–${short(slots[0][1])}.` : null;
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
      {/* the ticket writes itself, desktop */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <p className="mb-4 text-[1rem] font-semibold text-tostato">La vostra richiesta</p>
          <motion.div layout={!reduce} transition={{ duration: 0.35, ease }}>
            <Ticket text={message} />
          </motion.div>
          <p className="mt-4 text-[0.95rem] text-tostato">Si compila da sola mentre scegliete.</p>
          <div className="frame mt-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-sabbia">
              <AnimatePresence initial={false}>
                <motion.div key={k?.id ?? "bancone"} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}>
                  <Photo name={k?.photo ?? (k ? "facciata" : "vetrina-paste")} alt={k?.alt ?? (k ? "L'insegna «Servizi per nozze e rinfreschi»" : "La vetrina delle paste")} fill sizes="34vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="px-2 pb-1 pt-3 text-[0.95rem] text-tostato">{k ? k.label : "Dal nostro laboratorio"}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-[2rem] bg-cioccolato p-4 text-avorio shadow-[0_40px_80px_-50px_rgb(43_26_18/0.9)] sm:p-6 md:p-8">
          <ol className="grid grid-cols-4 gap-1.5" aria-label="Passaggi della richiesta">
            {steps.map((s, i) => {
              const reachable = i <= seen && (i === 0 || o.kind);
              return (
                <li key={s}>
                  <button type="button" onClick={() => reachable && go(i)} disabled={!reachable} aria-current={i === step ? "step" : undefined} className="group block w-full pb-1 text-left disabled:cursor-default">
                    <span className="relative block h-1.5 overflow-hidden rounded-full bg-white/10">
                      {i <= step ? <motion.span className="absolute inset-0 rounded-full bg-champagne" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 0.5, ease }} /> : null}
                    </span>
                    <span className={cn("mt-2 block text-[0.9rem] font-semibold transition-colors", i === step ? "text-avorio" : reachable ? "text-champagne-chiaro group-hover:text-avorio" : "text-avorio/40")}>{s}</span>
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
                    <h3 className="serif text-[clamp(1.9rem,3.2vw,2.5rem)] text-avorio">Che cosa vi serve?</h3>
                    <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo di richiesta">
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
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className={cn("group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.4rem] p-3.5 text-left sm:aspect-[5/4] sm:p-5", on ? "ring-2 ring-champagne" : "ring-1 ring-white/10", !x.photo && "bg-cioccolato-2")}
                          >
                            {x.photo ? (
                              <>
                                <Photo name={x.photo} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="-z-10 object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.07]" />
                                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_14_10/0.05),rgb(23_14_10/0.88)_78%)]" />
                              </>
                            ) : (
                              <span aria-hidden="true" className="serif absolute inset-x-5 top-5 hidden text-[1.35rem] italic leading-snug text-champagne/80 sm:block">«Servizi per nozze e rinfreschi», come sulla nostra insegna</span>
                            )}
                            <span className="serif block text-[1.4rem] font-[600] leading-tight text-avorio sm:text-[1.75rem]">{x.label}</span>
                            <span className="mt-1 block text-[0.88rem] leading-snug text-champagne-chiaro sm:text-[0.95rem]">{x.line}</span>
                            <AnimatePresence>
                              {on ? (
                                <motion.span key="ok" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 520, damping: 22 }} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-champagne text-fondente">
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
                    <h3 className="serif text-[clamp(1.9rem,3.2vw,2.5rem)] text-avorio">{k.title}</h3>
                    {o.kind === "torte" ? (
                      <>
                        <Group label="Per quale occasione?">{options.occasione.map((x) => <Chip key={x} on={o.occasione === x} onClick={() => set({ occasione: o.occasione === x ? null : x })}>{x}</Chip>)}</Group>
                        <Stepper label="Quante persone?" unit="persone" value={o.persone} min={people.torte[1]} max={people.torte[2]} step={people.torte[3]} onChange={(v) => set({ persone: v })} />
                        <Group label="Che torta?">{options.stile.map((x) => <Chip key={x} on={o.stile === x} onClick={() => set({ stile: o.stile === x ? null : x })}>{x}</Chip>)}</Group>
                        <div className="grid gap-4 md:grid-cols-2 md:items-center">
                          <label className="block">
                            <span className="mb-3 block text-[1rem] font-semibold text-avorio">La dedica <span className="font-normal text-champagne-chiaro/80">(facoltativa)</span></span>
                            <input value={o.dedica} maxLength={36} onChange={(e) => set({ dedica: e.target.value })} placeholder="Es. Auguri Camilla" className="field" />
                          </label>
                          <Plaque text={o.dedica} />
                        </div>
                      </>
                    ) : null}
                    {o.kind === "pasticceria" ? (
                      <>
                        <Group label="Che cosa mettiamo nel vassoio?">{options.assortimento.map((x) => <Chip key={x} on={o.assortimento === x} onClick={() => set({ assortimento: o.assortimento === x ? null : x })}>{x}</Chip>)}</Group>
                        <Stepper label="Per quante persone?" unit="persone" value={o.persone} min={people.pasticceria[1]} max={people.pasticceria[2]} step={people.pasticceria[3]} onChange={(v) => set({ persone: v })} />
                      </>
                    ) : null}
                    {o.kind === "salato" ? (
                      <>
                        <Group label="Che cosa prepariamo?" hint="anche più di uno">{options.salato.map((x) => <Chip key={x} on={o.scelta.includes(x)} onClick={() => toggle(x)}>{x}</Chip>)}</Group>
                        <Group label="Per che cosa?">{options.evento.map((x) => <Chip key={x} on={o.evento === x} onClick={() => set({ evento: o.evento === x ? null : x })}>{x}</Chip>)}</Group>
                        <Stepper label="Per quante persone?" unit="persone" value={o.persone} min={people.salato[1]} max={people.salato[2]} step={people.salato[3]} onChange={(v) => set({ persone: v })} />
                      </>
                    ) : null}
                    {o.kind === "colazioni" ? (
                      <>
                        <Group label="Che cosa vi prepariamo?" hint="anche più di uno">{options.colazioni.map((x) => <Chip key={x} on={o.scelta.includes(x)} onClick={() => toggle(x)}>{x}</Chip>)}</Group>
                        <Stepper label="Per quante persone?" unit="persone" value={o.persone} min={people.colazioni[1]} max={people.colazioni[2]} step={people.colazioni[3]} onChange={(v) => set({ persone: v })} />
                      </>
                    ) : null}
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="grid gap-7">
                    <h3 className="serif text-[clamp(1.9rem,3.2vw,2.5rem)] text-avorio">Quando passate a ritirare?</h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-3 block text-[1rem] font-semibold text-avorio">Il giorno</span>
                        <input type="date" min={minDay || undefined} value={o.data} onChange={(e) => set({ data: e.target.value, ritiro: null })} aria-invalid={dateError ? true : undefined} aria-describedby="data-msg" className="field" />
                        <AnimatePresence initial={false}>
                          {dateError ? (
                            <motion.span id="data-msg" role="alert" key={dateError} initial={{ opacity: 0, x: -8 }} animate={reduce ? { opacity: 1 } : { opacity: 1, x: [8, -6, 4, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-2 block text-[0.95rem] text-rosso">
                              {dateError}
                            </motion.span>
                          ) : continuato ? (
                            <motion.span id="data-msg" key="cont" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 block text-[0.95rem] text-champagne-chiaro">
                              {continuato}
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </label>
                      <label className="block">
                        <span className="mb-3 block text-[1rem] font-semibold text-avorio">Il vostro nome</span>
                        <input value={o.nome} onChange={(e) => set({ nome: e.target.value })} autoComplete="name" placeholder="Nome e cognome" className="field" />
                      </label>
                    </div>
                    {!closedDay ? <Group label="A che ora?">{ritiroOptions.map((x) => <Chip key={x} on={o.ritiro === x} onClick={() => set({ ritiro: o.ritiro === x ? null : x })}>{x}</Chip>)}</Group> : null}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-3 block text-[1rem] font-semibold text-avorio">Telefono <span className="font-normal text-champagne-chiaro/80">(per richiamarvi)</span></span>
                        <input value={o.telefono} onChange={(e) => set({ telefono: e.target.value })} type="tel" inputMode="tel" autoComplete="tel" placeholder="333 123 4567" className="field" />
                      </label>
                      <label className="block">
                        <span className="mb-3 block text-[1rem] font-semibold text-avorio">Altro da dirci? <span className="font-normal text-champagne-chiaro/80">(facoltativo)</span></span>
                        <input value={o.note} onChange={(e) => set({ note: e.target.value })} placeholder="Allergie, decorazioni, un'idea…" className="field" />
                      </label>
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="grid gap-6">
                    <h3 className="serif text-[clamp(1.9rem,3.2vw,2.5rem)] text-avorio">Tutto pronto</h3>
                    <Ticket text={message} className="lg:hidden" />
                    <p className="text-[1.02rem] text-avorio/85 lg:max-w-[46ch]">
                      {target ? "Premete il pulsante: la richiesta parte già scritta. Vi rispondiamo noi per confermare." : "Premete il pulsante: la richiesta è pronta da leggerci al telefono o da copiare. Vi confermiamo noi l'ordine."}
                    </p>
                    {target ? (
                      <motion.a
                        href={target}
                        {...(ORDER_NEW_TAB ? { target: "_blank", rel: "noopener" } : {})}
                        onClick={() => setSent(true)}
                        whileHover={reduce ? undefined : { y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn btn-champagne btn-shine min-h-16 w-full text-[1.1rem] sm:w-auto sm:self-start sm:px-8"
                      >
                        <Send size={20} aria-hidden="true" />
                        Invia la richiesta
                      </motion.a>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={() => {
                          setReady(true);
                          setSent(true);
                        }}
                        whileHover={reduce ? undefined : { y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn btn-champagne btn-shine min-h-16 w-full text-[1.1rem] sm:w-auto sm:self-start sm:px-8"
                      >
                        <Send size={20} aria-hidden="true" />
                        Invia la richiesta
                      </motion.button>
                    )}
                    <AnimatePresence>
                      {sent && target ? (
                        <motion.p key="sent" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[1rem] text-champagne-chiaro">
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }} className="grid h-7 w-7 place-items-center rounded-full bg-verde text-fondente">
                            <Check size={16} strokeWidth={3} aria-hidden="true" />
                          </motion.span>
                          Richiesta pronta: completate l'invio nella finestra che si è aperta.
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
              <button type="button" onClick={() => go(step - 1)} className="btn btn-line min-h-12 px-5 text-champagne-chiaro">
                <ArrowLeft size={18} aria-hidden="true" />
                Indietro
              </button>
              {step < 3 ? (
                <motion.button type="button" onClick={() => canNext && go(step + 1)} disabled={!canNext} whileTap={{ scale: 0.97 }} className="btn btn-champagne group min-h-12 px-6 disabled:opacity-40">
                  {step === 2 ? "Rivedi la richiesta" : "Avanti"}
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <Ready open={ready} message={message} onClose={() => setReady(false)} />
    </div>
  );
}
