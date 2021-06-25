import * as R from 'ramda';
import { countMathingValue } from '../../../core/array';
import { randomElement } from '../../../core/random';
import { Color, colors } from './Color';

/**
 * Constant representing die sides.
 */
export const DIE = [...colors, 'joker'] as const;

/**
 * Union type representing all die symbols.
 */
export type DieSymbol = typeof DIE[number];

type DiceSetInput = Partial<DiceSetData>;

type DiceSetData = Record<DieSymbol, number>;

const emptyDiceRollData = { red: 0, yellow: 0, green: 0, blue: 0, black: 0, joker: 0 } as const;
export class DiceSet {
  data: DiceSetData;

  constructor(input?: DiceSetInput) {
    this.data = { ...emptyDiceRollData, ...input };
  }

  get count() {
    let result = 0;
    for (let symbol of DIE) {
      result += this.data[symbol];
    }

    return result;
  }

  getCountInColorOrJoker(color: Color) {
    return this.data[color] + this.data.joker;
  }

  toString() {
    return R.pickBy((value) => value > 0, this.data);
  }

  clone() {
    const result = new DiceSet();
    result.data = { ...this.data };
    return result;
  }

  addDice(other: DiceSet) {
    const result = this.clone();
    result.data = R.mapObjIndexed((value, key) => value + other.data[key], this.data);
    return result;
  }

  subtractDice(other: DiceSet) {
    const result = this.clone();
    result.data = R.mapObjIndexed((value, key) => value - other.data[key], this.data);
    return result;
  }

  pickColorAndJokers(color: Color | null): DiceSet {
    const result = this.clone();
    result.data.joker = this.data.joker;

    if (color != null) {
      result.data[color] = this.data[color];
    }

    return result;
  }

  static roll(count: number = 4): DiceSet {
    const rawRoll = R.times(() => randomElement(DIE), count);

    return new DiceSet({
      red: countMathingValue<DieSymbol>(rawRoll, 'red'),
      yellow: countMathingValue<DieSymbol>(rawRoll, 'yellow'),
      green: countMathingValue<DieSymbol>(rawRoll, 'green'),
      blue: countMathingValue<DieSymbol>(rawRoll, 'blue'),
      black: countMathingValue<DieSymbol>(rawRoll, 'black'),
      joker: countMathingValue<DieSymbol>(rawRoll, 'joker'),
    });
  }
}
