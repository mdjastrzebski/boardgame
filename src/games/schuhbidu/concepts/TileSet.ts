import { assert } from 'console';
import { Color, COLORS } from './Color';
import { TILE_VALUES } from './Tile';

type TileSetInput = Partial<Record<Color, number[]>>;

type TileSetData = Record<Color, number>;

const valueBitEncoding: Record<number, number> = {
  2: 1 << 0,
  3: 1 << 1,
  4: 1 << 2,
};

/**
 * Type representing a set of tiles, either on board or held by player.
 */
export class TileSet {
  data: TileSetData;

  constructor(input?: TileSetInput) {
    this.data = {
      red: TileSet.encodeValues(input?.red),
      yellow: TileSet.encodeValues(input?.yellow),
      green: TileSet.encodeValues(input?.green),
      blue: TileSet.encodeValues(input?.blue),
      black: TileSet.encodeValues(input?.black),
    };
  }

  isEmpty() {
    for (const color of COLORS) {
      if (this.data[color] !== 0) {
        return false;
      }
    }

    return true;
  }

  hasTile(color: Color, value: number) {
    const encodedValue = valueBitEncoding[value];
    return !!(this.data[color] & encodedValue);
  }

  getValuesForColor(color: Color): number[] {
    return TileSet.decodeValues(this.data[color]);
  }

  getEncodedValuesForColor(color: Color): number {
    return this.data[color];
  }

  getColorsForValue(value: number): Color[] {
    const encodedValue = valueBitEncoding[value];

    const result: Color[] = [];
    for (const color of COLORS) {
      if (this.data[color] & encodedValue) result.push(color);
    }

    return result;
  }

  getTotalValueForColor(color: Color): number {
    const colorData = this.data[color];

    let result = 0;
    for (const value of TILE_VALUES) {
      if (colorData & valueBitEncoding[value]) {
        result += value;
      }
    }
    return result;
  }

  getTotalValue(): number {
    let result = 0;
    for (const color of COLORS) {
      result += this.getTotalValueForColor(color);
    }

    return result;
  }

  toString() {
    return Object.entries(this.data)
      .map(([color, value]) => `${color}: ${TileSet.decodeValues(value).join(', ')}`)
      .join('; ');
  }

  clone() {
    const result = new TileSet();
    result.data = { ...this.data };
    return result;
  }

  addTile(color: Color, value: number) {
    assert(!this.hasTile(color, value), 'addTile');
    const result = this.clone();
    result.data[color] |= valueBitEncoding[value];

    return result;
  }

  removeTile(color: Color, value: number) {
    assert(this.hasTile(color, value), 'removeTile');
    const result = this.clone();
    result.data[color] &= ~valueBitEncoding[value];

    return result;
  }

  static encodeValues(values: number[] | undefined) {
    if (!values) return 0;

    let result = 0;
    for (const value of values) {
      result |= valueBitEncoding[value];
    }

    return result;
  }

  static decodeValues(encodedValues: number): number[] {
    const result = [];
    for (const value of TILE_VALUES) {
      if (encodedValues & valueBitEncoding[value]) {
        result.push(value);
      }
    }

    return result;
  }

  static empty = new TileSet();
  static complete = new TileSet({
    red: [4, 3, 2],
    yellow: [4, 3, 2],
    green: [4, 3, 2],
    blue: [4, 3, 2],
    black: [4, 3, 2],
  });
}
