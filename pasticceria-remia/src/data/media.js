// The entrance clip: the first 3.75 s of the Kling video made from the shop's own photos
// (cut before its dissolve, watermark removed; see README). Keyframe every 4 frames so the
// scroll can seek anywhere smoothly. H.264 first, VP9 for browsers without it.
export const ingresso = {
  sources: [
    { src: "/video/ingresso.mp4", type: 'video/mp4; codecs="avc1.640020"' },
    { src: "/video/ingresso.webm", type: 'video/webm; codecs="vp9"' },
  ],
  poster: "/video/ingresso-inizio.webp",
  last: "/video/ingresso-fine.webp",
  duration: 3.75,
  width: 1280,
  height: 720,
};
