export const colors = ['red', 'yellow', 'green', 'blue', 'black'] as const;
export const COLORS = ['red', 'yellow', 'green', 'blue', 'black'] as const;
export type Color = typeof colors[number];
