import "@fontsource-variable/unbounded";
import "@fontsource-variable/geist";
import { Composition } from "remotion";
import { FadeReel, REEL } from "./FadeReel.jsx";

export const Root = () => (
  <Composition
    id="FadeReel"
    component={FadeReel}
    durationInFrames={REEL.durationInFrames}
    fps={REEL.fps}
    width={REEL.width}
    height={REEL.height}
    defaultProps={{ hasLogo: false }}
  />
);
