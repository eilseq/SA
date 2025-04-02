import { maybe } from "../utility/random";

import { addCrt1 } from "../shaders/crt";
import { addWave1, addWave2 } from "../shaders/wave";

export const saOriginal = (fxChain) => {
  addWave1(fxChain);
  maybe(() => addWave2(fxChain));
  addCrt1(fxChain);
  maybe(() => addCrt1(fxChain), 0.1);
  maybe(() => addWave1(fxChain), 0.1);
  maybe(() => addWave2(fxChain), 0.35);
};
