const average = (array: number[]) =>
  !!array.length ? array.reduce((a, b) => a + b, 0) / array.length : 0;

export default average;
