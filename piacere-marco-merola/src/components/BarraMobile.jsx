import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";

import { PHONE, PHONE_HREF } from "../data.js";
import { FUOCO } from "../fx.jsx";

/** Telefono: dopo la prima schermata, pulsante "Prenota un tavolo" sempre a portata di pollice. */
export default function BarraMobile() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const on = () => {
      const book = document.getElementById("prenota")?.getBoundingClientRect();
      const inBooking = book && book.top < window.innerHeight && book.bottom > 0;
      const end = window.innerHeight + window.scrollY > document.body.scrollHeight - 500;
      setShow(window.scrollY > window.innerHeight * 0.85 && !inBooking && !end);
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
          initial={reduce ? false : { opacity: 0, transform: "translateY(120%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          exit={{ opacity: 0, transform: "translateY(120%)" }}
          transition={{ duration: 0.6, ease: FUOCO }}
        >
          <a href={PHONE_HREF} className="rubino w-full justify-between pl-6 pr-2">
            <span className="text-left">
              <span className="block text-[10px] opacity-80">Prenota un tavolo</span>
              <span className="bodoni text-lg normal-case tracking-normal">{PHONE}</span>
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15">
              <Phone size={17} aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
