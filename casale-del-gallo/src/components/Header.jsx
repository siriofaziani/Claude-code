"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, phases, site, ui, l, locales } from "@/data/content";
import { href, whatsappHref, mailHref } from "@/lib/links";
import { subscribePhase } from "./Sky";
import { WhatsAppIcon } from "./Buttons";
import useHeroCta from "./useHeroCta";

const ease = [0.16, 1, 0.3, 1];
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** transitions.dev "tabs sliding": the lit pill travels between EN and IT. */
function LanguageTabs({ lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const bar = useRef(null);
  const pill = useRef(null);
  const tabs = useRef({});

  const moveTo = (code, animate) => {
    const tab = tabs.current[code];
    const p = pill.current;
    if (!tab || !p) return;
    if (!animate) {
      const prev = p.style.transition;
      p.style.transition = "none";
      p.style.transform = `translateX(${tab.offsetLeft}px)`;
      p.style.width = `${tab.offsetWidth}px`;
      void p.offsetWidth;
      p.style.transition = prev;
    } else {
      p.style.transform = `translateX(${tab.offsetLeft}px)`;
      p.style.width = `${tab.offsetWidth}px`;
    }
  };

  useIsoLayoutEffect(() => {
    moveTo(lang, false);
    const onResize = () => moveTo(lang, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [lang]);

  const go = (code) => {
    if (code === lang) return;
    moveTo(code, true);
    const rest = pathname.replace(/^\/(en|it)(?=\/|$)/, "");
    setTimeout(() => router.push(`/${code}${rest}`, { scroll: false }), 180);
  };

  return (
    <div ref={bar} className="t-tabs cue text-xs" role="tablist" aria-label="Language / Lingua">
      <span ref={pill} className="t-tabs-pill" aria-hidden="true" />
      {locales.map((code) => (
        <button
          key={code}
          ref={(el) => (tabs.current[code] = el)}
          className="t-tab"
          role="tab"
          lang={code}
          aria-selected={code === lang}
          onClick={() => go(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Header({ lang, initialPhase }) {
  const [phase, setPhase] = useState(initialPhase);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const heroCta = useHeroCta();

  useEffect(() => subscribePhase((s) => setPhase(s.phase)), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = pathname.replace(/^\/(en|it)\/?/, "");

  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        {l(ui.skip, lang)}
      </a>
      <header
        data-phase={open ? "night" : phase}
        className="fixed inset-x-0 top-0 z-50 text-[var(--ink)] transition-[color] duration-500"
      >
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-24 transition-opacity duration-500 ${scrolled && !open ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--plate) 92%, transparent), transparent)" }}
        />
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <Link href={href(lang)} className="flex items-center gap-3" aria-label={`${site.name}, ${l(nav[0].label, lang)}`}>
            <span className="vane block h-9 md:h-11" />
            <span className="display text-[1.15rem] tracking-[0.04em] md:text-[1.35rem]">{site.name}</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block">
              <LanguageTabs lang={lang} />
            </div>
            <a
              href={whatsappHref(l(ui.waGreeting, lang))}
              target="_blank"
              rel="noopener"
              aria-hidden={heroCta || undefined}
              tabIndex={heroCta ? -1 : undefined}
              className={`btn btn-primary hidden min-h-11 py-1 pl-4 pr-1.5 text-[0.8rem] transition-[opacity,transform] duration-500 lg:inline-flex ${heroCta ? "pointer-events-none -translate-y-2 opacity-0" : ""}`}
            >
              {l(ui.ask, lang)}
              <span className="btn-chip h-8 w-8"><WhatsAppIcon size={16} /></span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="cue flex h-11 items-center gap-2 rounded-[3px] px-3 text-[0.78rem] shadow-[inset_0_0_0_1px_var(--line)] transition-transform active:scale-95"
            >
              {open ? <X size={18} strokeWidth={1.6} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.6} aria-hidden="true" />}
              <span>{open ? l(ui.close, lang) : l(ui.menu, lang)}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={l(ui.menu, lang)}
            data-phase="night"
            className="fixed inset-0 z-40 overflow-y-auto bg-[#090d0a] text-[var(--ink)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div aria-hidden="true" className="absolute inset-x-0 top-[62%] h-px bg-[linear-gradient(90deg,transparent,#1f3a8a,transparent)]" />
            <div className="relative mx-auto grid min-h-full max-w-[1440px] gap-10 px-4 pb-32 pt-24 md:grid-cols-[1.4fr_1fr] md:px-8 md:pt-32">
              <nav aria-label={l(ui.menu, lang)}>
                <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {nav.map((item, i) => {
                    const active = current === item.slug;
                    return (
                      <motion.li
                        key={item.slug || "home"}
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.05 + i * 0.04, duration: 0.6, ease } }}
                      >
                        <Link
                          href={href(lang, item.slug)}
                          aria-current={active ? "page" : undefined}
                          className="group grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-3 md:grid-cols-[8rem_1fr] md:py-4"
                        >
                          <span className="cue text-xs text-[var(--soft)]">{l(phases[item.phase], lang)}</span>
                          <span className={`display text-[clamp(1.7rem,6vw,2.9rem)] transition-transform duration-300 group-hover:translate-x-2 ${active ? "text-[var(--accent)]" : ""}`}>
                            {l(item.label, lang)}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ol>
              </nav>
              <motion.div
                className="flex flex-col gap-6 md:pt-2"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.6 } }}
              >
                <div className="sm:hidden"><LanguageTabs lang={lang} /></div>
                <p className="max-w-sm text-[var(--soft)]">{l(site.tagline, lang)}</p>
                <div className="flex flex-col gap-3">
                  <a href={whatsappHref(l(ui.waGreeting, lang))} target="_blank" rel="noopener" className="btn btn-primary self-start">
                    {l(ui.ask, lang)}
                    <span className="btn-chip"><WhatsAppIcon /></span>
                  </a>
                  <a href={mailHref("Casale del Gallo")} className="text-lg underline">{site.email}</a>
                  <a href={site.phoneHref} className="text-lg">{site.phone}</a>
                </div>
                <address className="not-italic text-[var(--soft)]">{site.address.join(", ")}</address>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
