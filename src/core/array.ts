export function buildArray<Element>(length: number, generator: (index: number) => Element) {
  return Array(length).map((_, index) => generator(index));
}

/** Sum array of numbers */
export function sum(values: number[]): number {
  let total = 0;

  values.forEach((value) => {
    total += value;
  });

  return total;
}
