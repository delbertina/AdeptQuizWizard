export const average = (array: number[]): number =>
  array.reduce((a, b) => a + b, 0) / array.length;

export const formatScore = (score: number): string => score.toFixed(2);
