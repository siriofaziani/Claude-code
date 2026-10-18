import Image from "next/image";
import images from "@/data/images.json";
import { alts } from "@/data/alts";

/** An original Casale photo with its blur placeholder and alt text in the page language. */
export default function Photo({ name, lang, fill = false, sizes = "100vw", priority = false, className = "", quality, ...rest }) {
  const img = images[name];
  if (!img) return null;
  const common = {
    src: img.src,
    alt: alts[name]?.[lang] ?? "",
    placeholder: "blur",
    blurDataURL: img.blur,
    sizes,
    priority,
    quality,
    className,
    draggable: false,
    ...rest,
  };
  return fill ? <Image fill {...common} /> : <Image width={img.width} height={img.height} {...common} />;
}
