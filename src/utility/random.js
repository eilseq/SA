import { Random } from "random";

export const code = Date.now();
// export const code = "EILSEQ";

let randomInstance = new Random(code);
export const resetRandom = () => {
  randomInstance = new Random(code);
};

export const random = () => randomInstance.float(0, 1);
