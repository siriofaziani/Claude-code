"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useReduce from "./ui/useReduce";
import { MapPin, Phone } from "lucide-react";
import { shop } from "@/data/content";
import { whatsappHref, mapsHref } from "@/lib";
import Hours from "./Hours";
import OpenNow from "./OpenNow";
import StaggerText from "./ui/StaggerText";
import Magnetic from "./ui/Magnetic";
import Photo from "./Photo";
import { FacebookIcon, InstagramIcon, TripadvisorIcon, WhatsAppIcon } from "./Icons";

const ease = [0.16, 1, 0.3, 1];

/** Address, hours, the live map and the three ways to reach the counter, on glass over the counter. */
export default function Contact() {
  const ref = useRef(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const actions = [
    { href: whatsappHref(), label: `WhatsApp ${shop.whatsappLabel}`, icon: <WhatsAppIcon size={19} />, cls: "btn-oro", ext: true },
    { href: shop.phoneHref, label: `Chiama ${shop.phone}`, icon: <Phone size={18} aria-hidden="true" />, cls: "btn-line text-panna" },
    { href: mapsHref, label: "Indicazioni stradali", icon: <MapPin size={18} aria-hidden="true" />, cls: "btn-line text-panna", ext: true },
  ];

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale }}
      className="relative isolate overflow-hidden rounded-[2.5rem] bg-espresso p-3 text-panna will-change-transform sm:p-5 lg:p-8"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Photo name="bancone" alt="" fill sizes="100vw" className="object-cover opacity-70" />
        <span className="absolute inset-0 bg-[linear-gradient(120deg,rgb(28_26_24/0.75),rgb(28_26_24/0.35))]" />
      </div>
      <div className="glass grid gap-10 rounded-[2rem] p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="lg:col-span-5">
          <StaggerText as="h2" text="Vieni a trovarci" className="serif block text-[clamp(2.6rem,5.4vw,4.4rem)] text-panna" />
          <address className="mt-6 not-italic">
            <span className="serif block text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight text-oro-chiaro">{shop.address}</span>
            <span className="mt-1 block text-[1.05rem] text-panna/85">{shop.city} · Centocelle</span>
          </address>
          <OpenNow className="mt-6 bg-white/5 text-panna shadow-[inset_0_0_0_1px_rgb(236_216_166/0.18)]" />
          <motion.ul
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "shown"}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
          >
            {actions.map((a) => (
              <motion.li key={a.label} variants={reduce ? undefined : { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
                <Magnetic href={a.href} {...(a.ext ? { target: "_blank", rel: "noopener" } : {})} className={`btn w-full sm:w-auto ${a.cls}`}>
                  {a.icon}
                  {a.label}
                </Magnetic>
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-10">
            <h3 className="mb-3 px-4 text-[1.05rem] font-semibold text-oro-chiaro">Orari</h3>
            <Hours />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-7">
          <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-[1.75rem] bg-espresso-2 shadow-[inset_0_0_0_1px_rgb(236_216_166/0.16)] lg:min-h-[30rem]">
            <iframe
              title={`Mappa: ${shop.name}, ${shop.address}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(shop.mapsQuery)}&z=16&output=embed`}
              className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.22)_saturate(0.85)_contrast(1.02)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href={shop.facebook} target="_blank" rel="noopener" className="btn btn-line min-h-12 px-4 text-panna"><FacebookIcon size={19} />Facebook</a>
            <a href={shop.instagram} target="_blank" rel="noopener" className="btn btn-line min-h-12 px-4 text-panna"><InstagramIcon size={19} /><span className="max-sm:sr-only">{shop.instagramHandle}</span><span className="sm:hidden">Instagram</span></a>
            <a href={shop.tripadvisor} target="_blank" rel="noopener" className="btn btn-line min-h-12 px-4 text-panna"><TripadvisorIcon size={19} />Tripadvisor</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
