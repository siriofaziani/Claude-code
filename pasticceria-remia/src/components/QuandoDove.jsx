"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import { hours, shop } from "@/data/content";
import { hasWhatsapp, whatsappHref } from "@/lib";
import { useOpenState, show } from "./OpenNow";
import OpenNow from "./OpenNow";
import Photo from "./Photo";
import StaggerText from "./ui/StaggerText";
import useReduce from "./ui/useReduce";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./Icons";

const ease = [0.16, 1, 0.3, 1];

/** Hours with today lit, the sign on the door, the live map and the call, on one card. */
export default function QuandoDove() {
  const ref = useRef(null);
  const reduce = useReduce();
  const s = useOpenState();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { scale }} className="overflow-hidden rounded-[2.25rem] bg-cioccolato text-avorio will-change-transform">
      <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="lg:col-span-5">
          <StaggerText as="h2" text="Orari e mappa" className="serif block text-[clamp(2.8rem,5.6vw,4.6rem)] text-avorio" />
          <OpenNow className="mt-5 bg-white/5 text-avorio shadow-[inset_0_0_0_1px_rgb(236_220_188/0.18)]" />

          <dl className="mt-7 grid gap-0.5">
            {hours.map((h) => {
              const today = s?.day === h.day;
              return (
                <div key={h.day} className={`relative grid grid-cols-[7.5rem_1fr] items-center gap-3 rounded-2xl px-4 py-2.5 sm:grid-cols-[8.5rem_1fr] ${today ? "text-fondente" : "text-avorio/85"}`}>
                  {today ? <motion.span layoutId="oggi" aria-hidden="true" className="absolute inset-0 rounded-2xl bg-champagne" transition={{ type: "spring", stiffness: 300, damping: 30 }} /> : null}
                  <dt className={`relative ${today ? "font-semibold" : ""}`}>
                    {h.label}
                    {today ? <span className="sr-only"> (oggi)</span> : null}
                  </dt>
                  <dd className="relative flex flex-wrap gap-x-4 tabular-nums">
                    {h.slots.length ? h.slots.map(([a, b]) => <span key={a} className="whitespace-nowrap">{show(a)}–{show(b)}</span>) : <span>Chiuso</span>}
                    {h.slots.length === 1 ? <span className={today ? "" : "text-champagne-chiaro/70"}>continuato</span> : null}
                  </dd>
                </div>
              );
            })}
          </dl>

          <figure className="mt-6 flex items-center gap-4 rounded-[1.4rem] bg-cioccolato-2 p-3">
            <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-[0.9rem] sm:w-32">
              <Photo name="cartello-orari" fill sizes="128px" alt="Il cartello degli orari sulla porta: dal martedì al venerdì 7:30–13:30 e 15:00–20:30, sabato e domenica orario continuato 7:30–20:30, lunedì chiuso" className="object-cover" />
            </div>
            <figcaption className="text-[0.98rem] leading-snug text-avorio/85">Gli stessi orari del cartello sulla porta. La domenica c'è più fila: per torte e vassoi conviene prenotare.</figcaption>
          </figure>
        </div>

        <div id="dove" className="flex scroll-mt-28 flex-col gap-5 lg:col-span-7">
          <address className="not-italic">
            <span className="serif block text-[clamp(1.9rem,3vw,2.6rem)] text-champagne-chiaro">{shop.address}</span>
            <span className="mt-1 block text-[1.04rem] text-avorio/85">{shop.city} · {shop.area}, vicino alla fermata Mirti della metro C</span>
          </address>
          <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-[1.75rem] bg-cioccolato-2 shadow-[inset_0_0_0_1px_rgb(236_220_188/0.14)] lg:min-h-[28rem]">
            <iframe
              title={`Mappa: ${shop.name}, ${shop.address}, ${shop.city}`}
              src={shop.mapEmbed}
              className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.2)_saturate(0.85)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <motion.ul
            className="grid gap-3 sm:grid-cols-2"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }}
          >
            {[
              { href: shop.phoneHref, label: `Chiama ${shop.phone}`, icon: <Phone size={18} aria-hidden="true" />, cls: "btn-champagne btn-shine" },
              { href: shop.directions, label: "Indicazioni stradali", icon: <MapPin size={18} aria-hidden="true" />, cls: "btn-line text-avorio", ext: true },
              ...(hasWhatsapp ? [{ href: whatsappHref(), label: "WhatsApp", icon: <WhatsAppIcon size={19} />, cls: "btn-line text-avorio", ext: true }] : []),
              { href: shop.facebook, label: "Facebook", icon: <FacebookIcon size={19} />, cls: "btn-line text-avorio", ext: true },
              { href: shop.instagram, label: "Instagram", icon: <InstagramIcon size={19} />, cls: "btn-line text-avorio", ext: true },
            ].map((a) => (
              <motion.li key={a.label} variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
                <motion.a href={a.href} {...(a.ext ? { target: "_blank", rel: "noopener" } : {})} whileHover={reduce ? undefined : { y: -2 }} whileTap={{ scale: 0.97 }} className={`btn w-full ${a.cls}`}>
                  {a.icon}
                  {a.label}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}
