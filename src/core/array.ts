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

export function countMathingValue<Value>(values: readonly Value[], valueToMatch: Value): number {
  return values.filter((value) => value === valueToMatch).length;
}

type FindMaxResult<Element> = [element: Element | null, index: number | null, value: number];

export function findMax<Element>(elements: readonly Element[], selector: (element: Element) => number): FindMaxResult<Element> {
  let maxElement = null;
  let maxElementIndex = null;
  let maxValue = -Infinity;

  elements.forEach((element, index) => {
    const currentValue = selector(element);
    if (currentValue > maxValue) {
      maxElement = element;
      maxElementIndex = index;
      maxValue = currentValue;
    }
  });

  return [maxElement, maxElementIndex, maxValue];
}
