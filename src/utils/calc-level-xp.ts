const addToLevelNum = 2;

export function calculateLevelExp(level: number) {
  return Math.floor(Math.log10(level + addToLevelNum) * Math.pow(level + addToLevelNum, 2));
}