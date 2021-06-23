
/**
 * Returns a random integer from zero to bound - 1.
 */
export function randomInteger(bound: number) {
    return Math.floor(Math.random() * bound)
}

export function randomElement<T>(elements: T[]): T {
  const index = randomInteger(elements.length);
  return elements[index];
}