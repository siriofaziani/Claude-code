import Image from "next/image";
import images from "@/data/images.json";

/** One of the shop's photos, with its blur placeholder. */
export default function Photo({ name, alt, fill = false, sizes = "100vw", priority = false, className = "", ...rest }) {
  const img = images[name];
  if (!img) return null;
  const common = { src: img.src, alt: alt ?? "", placeholder: "blur", blurDataURL: img.blur, sizes, priority, className, draggable: false, ...rest };
  return fill ? <Image fill {...common} /> : <Image width={img.width} height={img.height} {...common} />;
}
