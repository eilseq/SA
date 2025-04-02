import { Color } from "three";

export const makeColorFromHSL = (h, s, l) => {
  return new Color(`hsl(${h}deg, ${s}%, ${l}%)`);
};
