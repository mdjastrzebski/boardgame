import { colors } from "./Color";

/**
 * Constant representing die sides.
 */
export const DIE = [...colors, 'joker'] as const;

/**
 * Union type representing all die symbols.
 */
export type DieSymbol = typeof DIE[number];
