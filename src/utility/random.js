import seedrandom from "seedrandom";

const code = Date.now();

export const random = seedrandom(code);
