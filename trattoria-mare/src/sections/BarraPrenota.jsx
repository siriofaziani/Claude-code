import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";

import { PHONE_HREF, PHONE_LABEL } from "../data.js";
import { MARE } from "../motion.jsx";

/** Telefono: dopo la prima schermata compare in basso la pillola di vetro per prenotare (chiamata). */
export default function BarraPrenota() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const on = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden"
          initial={reduce ? false : { opacity: 0, transform: "translateY(110%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          exit={{ opacity: 0, transform: "translateY(110%)" }}
          transition={{ duration: 0.6, ease: MARE }}
        >
          <a href={PHONE_HREF} className="vetro flex items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2">
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-oro">Prenota</span>
              <span className="font-serif text-lg text-notte">{PHONE_LABEL}</span>
            </span>
            <span className="btn btn-indaco min-h-11 px-5">
              <Phone size={16} aria-hidden="true" /> Chiama
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
