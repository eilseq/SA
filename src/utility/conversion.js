import { Color } from "three";

export const HSLtoColor = (h, s, l) => {
  return new Color(`hsl(${h}deg, ${s}%, ${l}%)`);
};
