// The entrance video for the single-file preview: inlined; the hero turns it into a Blob URL.
import wideMp4 from "./video/ingresso-desktop.mp4?url"; // lighter copy (1600px) for the single file
import widePoster from "../public/video/ingresso-desktop-inizio.webp?url";
import wideLast from "../public/video/ingresso-desktop-fine.webp?url";
import tallMp4 from "../public/video/ingresso-mobile.mp4?url";
import tallPoster from "../public/video/ingresso-mobile-inizio.webp?url";
import tallLast from "../public/video/ingresso-mobile-fine.webp?url";

export const ingresso = {
  wide: { sources: [{ src: wideMp4, type: 'video/mp4; codecs="avc1.640028"' }], poster: widePoster, last: wideLast },
  tall: { sources: [{ src: tallMp4, type: 'video/mp4; codecs="avc1.64001f"' }], poster: tallPoster, last: tallLast },
};
