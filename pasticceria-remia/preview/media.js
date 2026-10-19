// The entrance clip for the single-file preview: inlined, then turned into a Blob URL by the hero.
import mp4 from "../public/video/ingresso.mp4?url";
import poster from "../public/video/ingresso-inizio.webp?url";
import last from "../public/video/ingresso-fine.webp?url";

export const ingresso = { sources: [{ src: mp4, type: 'video/mp4; codecs="avc1.640020"' }], poster, last, duration: 3.75, width: 1280, height: 720 };
