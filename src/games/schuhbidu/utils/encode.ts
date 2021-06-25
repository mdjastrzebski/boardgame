export function encodeTileLengthSet(lengths: Set<number>) {
  let result = 0;
  if (lengths.has(4)) result |= 1 << 2;
  if (lengths.has(3)) result |= 1 << 1;
  if (lengths.has(2)) result |= 1 << 0;

  return result;
}