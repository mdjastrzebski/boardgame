/** Sum array of numbers */
export function sum(values: number[]): number {
  let total = 0;

  values.forEach((value) => {
    total += value;
  });

  return total;
}
