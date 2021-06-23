export function setWithAddedElement<Element>(input: Set<Element>, elementToAdd: Element): Set<Element> {
  const output = new Set(input);
  output.add(elementToAdd);
  return output;
}

export function setWithoutElement<Element>(input: Set<Element>, elementToRemove: Element): Set<Element> {
  const output = new Set(input);
  output.delete(elementToRemove);
  return output;
}

export function sum(input: Set<number>): number {
  let result = 0;
  input.forEach((element) => {
    result += element;
  });

  return result;
}
