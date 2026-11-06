import "@fontsource-variable/unbounded";
import "@fontsource-variable/geist";
import { Composition } from "remotion";
import { FadeReel, REEL } from "./FadeReel.jsx";
import { SITO_REEL, SitoReel } from "./SitoReel.jsx";

export const Root = () => (
  <>
  <Composition
    id="FadeReel"
    component={FadeReel}
    durationInFrames={REEL.durationInFrames}
    fps={REEL.fps}
    width={REEL.width}
    height={REEL.height}
    defaultProps={{ hasLogo: false }}
  />
  <Composition
    id="SitoReel"
    component={SitoReel}
    durationInFrames={SITO_REEL.durationInFrames}
    fps={SITO_REEL.fps}
    width={SITO_REEL.width}
    height={SITO_REEL.height}
  />
  </>
);
