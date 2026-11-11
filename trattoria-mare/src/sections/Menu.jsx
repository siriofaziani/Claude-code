import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, Phone, Plus, Wine } from "lucide-react";

import { CONTATTI, DRINKS, MENU, PHONE_HREF, img } from "../data.js";
import { Affiora, Cascata, Foto, MARE, Onda, Portata, cx, useFine } from "../motion.jsx";

const ROMANI = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const TABS = [...MENU.map((c) => ({ id: c.id, title: c.title })), { id: "cantina", title: "Vini e Bollicine" }];

/** Barra delle categorie: vetro bianco, segue lo scorrimento, filo d'oro sotto la voce attiva. */
function Categorie({ active }) {
  const bar = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = bar.current?.querySelector(`[data-id="${active}"]`);
    if (!el || !bar.current) return;
    const b = bar.current;
    b.scrollTo({ left: el.offsetLeft - b.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);
  return (
    <div className="sticky top-[76px] z-30 -mx-5 px-3 sm:top-[88px] sm:mx-0 sm:px-0">
      <div ref={bar} className="vetro scorri-x flex gap-1 overflow-x-auto rounded-full p-1.5" role="navigation" aria-label="Categorie del menu">
        {TABS.map((t) => {
          const on = t.id === active;
          return (
            <a
              key={t.id}
              href={`#cat-${t.id}`}
              data-id={t.id}
              aria-current={on ? "true" : undefined}
              className={cx(
                "relative shrink-0 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors duration-500",
                on ? "text-white" : "text-notte/70 hover:text-indaco",
              )}
            >
              {on && (
                <motion.span
                  layoutId="categoria-attiva"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-indaco-chiaro to-notte shadow-[0_8px_20px_-8px_rgba(52,53,143,0.7)]"
                  transition={reduce ? { duration: 0 } : { duration: 0.6, ease: MARE }}
                />
              )}
              <span className="relative whitespace-nowrap">{t.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/** Una voce della carta. Telefono: tocco per vedere la foto. Computer: passaggio del mouse per la cornice a lato. */
function Voce({ item, onShow }) {
  const [open, setOpen] = useState(false);
  const fine = useFine();
  const reduce = useReducedMotion();
  const hasPhoto = Boolean(item.photo);
  const Row = hasPhoto && !fine ? "button" : "div";
  return (
    <Portata as="li" className="group relative">
      <Row
        type={Row === "button" ? "button" : undefined}
        onClick={Row === "button" ? () => setOpen((v) => !v) : undefined}
        aria-expanded={Row === "button" ? open : undefined}
        onPointerEnter={() => fine && onShow(item)}
        className={cx(
          "relative flex w-full items-baseline rounded-2xl px-3 py-4 text-left transition-[background-color,box-shadow] duration-500 sm:px-5",
          "hover:bg-white/70 hover:shadow-[0_14px_40px_-24px_rgba(20,31,69,0.45)]",
        )}
      >
        <span className="min-w-0">
          <span className="font-serif text-[1.13rem] font-[420] leading-snug text-notte transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 sm:text-[1.3rem]">
            {item.name}
          </span>
          {(item.special || hasPhoto) && (
            <span className="mt-1.5 flex flex-wrap items-center gap-2">
              {item.special && (
                <span className="rounded-full border border-oro/50 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-oro">
                  Special
                </span>
              )}
              {hasPhoto && (
                <span className="inline-flex items-center gap-1 text-[11px] text-notte/45">
                  {fine ? <Camera size={12} aria-hidden="true" /> : <Plus size={12} className={cx("transition-transform duration-500", open && "rotate-45")} aria-hidden="true" />}
                  {fine ? "foto" : open ? "chiudi foto" : "vedi foto"}
                </span>
              )}
            </span>
          )}
        </span>
        <span className="puntini" aria-hidden="true" />
        <span className="shrink-0 font-serif text-[1.15rem] tabular-nums text-indaco sm:text-[1.25rem]">{item.price}</span>
      </Row>
      <AnimatePresence initial={false}>
        {open && !fine && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: MARE }}
            className="overflow-hidden px-3"
          >
            <img
              src={img(item.photo)}
              alt={item.name}
              loading="lazy"
              className="mb-4 mt-1 aspect-[4/3] w-full rounded-[22px] object-cover shadow-[0_24px_50px_-30px_rgba(20,31,69,0.6)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Portata>
  );
}

/** Cornice ad arco ferma a lato (solo computer): mostra il piatto sotto il cursore o la copertina della categoria. */
function Cornice({ shown }) {
  const reduce = useReducedMotion();
  return (
    <div className="sticky top-40 hidden self-start lg:block">
      <div className="arco relative aspect-[3/4] overflow-hidden bg-sabbia shadow-[0_50px_90px_-45px_rgba(20,31,69,0.6)]">
        <AnimatePresence initial={false}>
          <motion.img
            key={shown.src}
            src={img(shown.src)}
            alt={shown.caption}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduce ? false : { opacity: 0, transform: "scale(1.08)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: MARE }}
          />
        </AnimatePresence>
        <div className="absolute inset-x-4 bottom-4">
          <div className="vetro rounded-2xl px-5 py-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={shown.caption}
                initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(-6px)" }}
                transition={{ duration: 0.4, ease: MARE }}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="corsivo text-xl text-notte">{shown.caption}</span>
                {shown.price && <span className="font-serif text-lg text-indaco">{shown.price}</span>}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Carta dei vini e del bar: pannello indaco come la fascia del sito originale, testo color panna. */
function Cantina() {
  return (
    <div
      id="cat-cantina"
      data-cat="cantina"
      className="relative mt-24 scroll-mt-40 overflow-hidden rounded-[36px] px-6 py-14 text-panna sm:px-12 sm:py-16"
      style={{
        background:
          "radial-gradient(60% 50% at 100% 0%, rgba(31,176,227,0.28), transparent 70%), radial-gradient(50% 60% at 0% 100%, rgba(74,76,179,0.6), transparent 70%), linear-gradient(160deg, #34358f, #141f45)",
      }}
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Affiora>
            <p className="occhiello text-onda-chiara">
              <Wine size={14} aria-hidden="true" /> Cantina e bar
            </p>
            <h3 className="titolo mt-6 text-4xl sm:text-5xl">
              Vini e <span className="corsivo text-onda-chiara">Bollicine</span>
            </h3>
            <Onda className="mt-6 text-onda" width={100} />
          </Affiora>
          <Affiora delay={0.15} className="mt-10 hidden lg:block">
            <div className="fluttua" style={{ "--r": "3deg" }}>
              <Foto src={img("frittura-vino")} alt="Frittura con un calice di vino bianco" arco className="aspect-[3/4] w-[78%] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]" />
            </div>
          </Affiora>
        </div>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {DRINKS.map((cat) => (
            <Cascata key={cat.id} as="div" gap={0.05}>
              <Portata>
                <h4 className="font-serif text-xl font-[420] text-white">{cat.title}</h4>
                <span className="mt-3 block h-px w-12 bg-onda/70" />
              </Portata>
              {cat.note && (
                <Portata>
                  <p className="corsivo mt-4 text-lg text-onda-chiara">{cat.note}</p>
                </Portata>
              )}
              <ul className="mt-3">
                {cat.items.map((d) => (
                  <Portata as="li" key={d.name} className="flex items-baseline py-2 text-[15px]">
                    <span className="text-panna/90">{d.name}</span>
                    <span className="puntini !border-onda-chiara/30" aria-hidden="true" />
                    <span className="font-serif tabular-nums text-white">{d.price}</span>
                  </Portata>
                ))}
              </ul>
            </Cascata>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState(MENU[0].id);
  const [shown, setShown] = useState({ src: MENU[0].cover, caption: MENU[0].title });
  const root = useRef(null);

  // categoria attiva: l'ultima il cui titolo ha superato la metà dello schermo (calcolo leggero, una volta per fotogramma)
  useEffect(() => {
    const blocks = [...(root.current?.querySelectorAll("[data-cat]") ?? [])];
    if (!blocks.length) return undefined;
    let raf = 0;
    let last = null;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let id = blocks[0].dataset.cat;
      for (const el of blocks) if (el.getBoundingClientRect().top < mid) id = el.dataset.cat;
      if (id === last) return;
      last = id;
      setActive(id);
      const cat = MENU.find((c) => c.id === id);
      if (cat?.cover) setShown({ src: cat.cover, caption: cat.title });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const show = (item) => item.photo && setShown({ src: item.photo, caption: item.name, price: item.price });

  return (
    <section
      id="menu"
      ref={root}
      className="relative pb-28 pt-28 sm:pb-36 sm:pt-36"
      style={{ background: "linear-gradient(180deg, #fbf7ef 0%, #f6efe2 60%, #fbf7ef 100%)" }}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="text-center">
          <Affiora>
            <p className="occhiello justify-center">Trattoria MARE</p>
          </Affiora>
          <Affiora delay={0.1}>
            <h2 className="corsivo mt-6 text-6xl text-notte sm:text-8xl">Menu</h2>
          </Affiora>
          <Affiora delay={0.2} className="mt-6 flex justify-center">
            <Onda className="text-onda" width={120} />
          </Affiora>
        </div>

        <div className="mt-14">
          <Categorie active={active} />
        </div>

        <div className="mt-12 grid gap-16 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="space-y-20">
            {MENU.map((cat, i) => (
              <div key={cat.id} id={`cat-${cat.id}`} data-cat={cat.id} className="scroll-mt-40">
                {/* copertina della categoria (telefono e tablet) */}
                {cat.cover && (
                  <Foto
                    src={img(cat.cover)}
                    alt={cat.title}
                    className="mb-8 aspect-[16/8] w-full rounded-[28px] lg:hidden"
                  />
                )}
                <Affiora className="flex items-end gap-5 px-3 sm:px-5">
                  <span className="font-serif text-sm italic text-oro">{ROMANI[i]}</span>
                  <h3 className="titolo text-[2.1rem] text-notte sm:text-5xl">{cat.title}</h3>
                </Affiora>
                <Cascata as="ul" className="mt-6 divide-y divide-oro/15" gap={0.05}>
                  {cat.items.map((item) => (
                    <Voce key={item.name} item={item} onShow={show} />
                  ))}
                </Cascata>
              </div>
            ))}
          </div>
          <Cornice shown={shown} />
        </div>

        <Cantina />

        <Affiora className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="corsivo text-2xl text-notte sm:text-3xl">{CONTATTI.info}</p>
          <a href={PHONE_HREF} className="btn btn-indaco">
            <Phone size={16} aria-hidden="true" />
            {CONTATTI.cta}
          </a>
        </Affiora>
      </div>
    </section>
  );
}
