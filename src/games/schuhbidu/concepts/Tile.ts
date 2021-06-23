import { sum } from "../../../core/set";
import { Color, colors } from "./Color";

export const tileLengthsFromHighest = [4, 3, 2] as const;

/**
 * Centipede tiles have length of 2, 3, and 4.
 */
export type TileLength = typeof tileLengthsFromHighest[number];

/**
 * Tuple representing a single tile.
 */
export type Tile = {
  color: Color,
  length: TileLength,
}

/**
 * Type representing a set of tiles, either on board or held by player.
 */
export type TileSet = Record<Color, Set<TileLength>>;

const emptyTileLengthSet = new Set<TileLength>();
const fullTileLengthSet = new Set<TileLength>([4, 3, 2]);

export const emptyTileSet = {
  red: emptyTileLengthSet,
  yellow: emptyTileLengthSet,
  green: emptyTileLengthSet,
  blue: emptyTileLengthSet,
  black: emptyTileLengthSet,
} as const;

export const fullTileSet = {
  red: fullTileLengthSet,
  yellow: fullTileLengthSet,
  green: fullTileLengthSet,
  blue: fullTileLengthSet,
  black: fullTileLengthSet,
} as const;

export function isTileSetEmpty(tiles: TileSet) {
  return colors.every((color) => tiles[color].size === 0);
}

export function hasTileLength(tiles: TileSet, length: TileLength) {
  return tiles.red.has(length) || tiles.yellow.has(length) || tiles.green.has(length) || tiles.blue.has(length) || tiles.black.has(length);
}

export function getColorsWithLength(tiles: TileSet, length: TileLength): Color[] {
  return colors.filter(color => tiles[color].has(length));
}

export function getTilesScore(tiles: TileSet) {
  let result = 0;

  colors.forEach(color => {
    result += sum(tiles[color])
  })

  return result;
}
