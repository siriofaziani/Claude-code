// The entrance video: the user's Hailuo single take, from the street to the counter (5.2 s), cut just
// above the generator's watermark. Two framings: a wide one for landscape screens and a vertical one
// for phones whose window follows the door, so `object-fit: cover` never loses the way in.
export const ingresso = {
  wide: {
    sources: [
      { src: "/video/ingresso-desktop.mp4", type: 'video/mp4; codecs="avc1.640028"' },
      { src: "/video/ingresso-desktop.webm", type: 'video/webm; codecs="vp9"' },
    ],
    poster: "/video/ingresso-desktop-inizio.webp",
    last: "/video/ingresso-desktop-fine.webp",
  },
  tall: {
    sources: [
      { src: "/video/ingresso-mobile.mp4", type: 'video/mp4; codecs="avc1.64001f"' },
      { src: "/video/ingresso-mobile.webm", type: 'video/webm; codecs="vp9"' },
    ],
    poster: "/video/ingresso-mobile-inizio.webp",
    last: "/video/ingresso-mobile-fine.webp",
  },
};
