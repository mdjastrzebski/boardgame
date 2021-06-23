/** Sum array of numbers */
export function sum(values: number[]): number {
  let total = 0;

  values.forEach((value) => {
    total += value;
  });

  return total;
}

export function countMathingPredicate<Value>(values: Value[], predicate: (value: Value) => boolean): number {
  return values.filter(predicate).length;
}

export function countMathingValue<Value>(values: Value[], valueToMatch: Value): number {
  return values.filter((value) => value === valueToMatch).length;
}
