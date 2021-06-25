import { Color } from './Color';

export const TILE_VALUES = [4, 3, 2] as const;

/**
 * Type representing a single tile.
 */
export type Tile = {
  color: Color;
  value: number;
};
