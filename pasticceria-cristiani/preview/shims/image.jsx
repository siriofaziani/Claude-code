// next/image for the single-file preview: the same props, a plain <img> with the photo inlined.
import { resolveImage } from "../images";

export default function Image({ src, alt = "", fill, width, height, sizes, priority, quality, placeholder, blurDataURL, fetchPriority, style, className, ...rest }) {
  const s = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style;
  return (
    <img
      src={resolveImage(src)}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={s}
      {...rest}
    />
  );
}
