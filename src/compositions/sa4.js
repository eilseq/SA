import { maybe } from "../utility/random";

import { addCompression1 } from "../shaders/compression";
import { addHue1 } from "../shaders/hue";
import { addCrt1 } from "../shaders/crt";
import { addWave1, addWave2, addWave3 } from "../shaders/wave";

export const sa4 = (fxChain) => {
  // addHue1(fxChain);
  maybe(() => addWave1(fxChain));
  // addCrt1(fxChain);
  maybe(() => addWave1(fxChain));
  addWave2(fxChain);
  maybe(() => addWave2(fxChain));
  maybe(() => addWave1(fxChain));
  maybe(() => addWave1(fxChain));
  maybe(() => addWave2(fxChain));
  maybe(() => addWave3(fxChain));
  maybe(() => addCompression1(fxChain));
};
