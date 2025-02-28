import seedrandom from "seedrandom";

const code = Date.now();
console.log(code);

export const random = seedrandom(code);
