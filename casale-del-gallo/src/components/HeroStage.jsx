"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import images from "@/data/images.json";
import { alts } from "@/data/alts";

/** The original home slideshow, now the stage below the horizon: six photos crossfade and drift. */
export default function HeroStage({ names, lang, interval = 5600 }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => !document.hidden && setI((v) => (v + 1) % names.length), interval);
    return () => clearInterval(id);
  }, [names.length, interval, reduce]);

  return (
    <div className="absolute inset-0" aria-roledescription="slideshow">
      {names.map((name, k) => (
        <div
          key={name}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{ opacity: k === i ? 1 : 0 }}
          aria-hidden={k !== i}
        >
          <Image
            src={images[name].src}
            alt={alts[name][lang]}
            fill
            priority={k === 0}
            fetchPriority={k === 0 ? "high" : "low"}
            sizes="100vw"
            quality={80}
            placeholder="blur"
            blurDataURL={images[name].blur}
            className="stage-photo object-cover will-change-transform"
            style={reduce ? undefined : { animation: `stage-drift ${interval * 2.4}ms ease-in-out ${-k * 1700}ms infinite alternate` }}
          />
        </div>
      ))}
    </div>
  );
}
