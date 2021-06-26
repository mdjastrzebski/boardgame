import * as R from 'ramda';
import { countMathingValue } from '../../../core/array';
import { randomElement } from '../../../core/random';
import { Color } from './Color';
import { DieSymbol, DIE } from './Die';

type DiceResultInput = Partial<DiceResultData>;

type DiceResultData = Record<DieSymbol, number>;

const emptyDiceRollData = { red: 0, yellow: 0, green: 0, blue: 0, black: 0, joker: 0 } as const;
export class DiceResult {
  data: DiceResultData;

  constructor(input?: DiceResultInput) {
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
    const result = new DiceResult();
    result.data = { ...this.data };
    return result;
  }

  addDice(other: DiceResult) {
    const result = this.clone();
    result.data = R.mapObjIndexed((value, key) => value + other.data[key], this.data);
    return result;
  }

  subtractDice(other: DiceResult) {
    const result = this.clone();
    result.data = R.mapObjIndexed((value, key) => value - other.data[key], this.data);
    return result;
  }

  pickColorAndJokers(color: Color | null): DiceResult {
    const result = new DiceResult();
    result.data.joker = this.data.joker;

    if (color != null) {
      result.data[color] = this.data[color];
    }

    return result;
  }

  static empty = new DiceResult(emptyDiceRollData);

  static roll(count: number = 4): DiceResult {
    const rawRoll = R.times(() => randomElement(DIE), count);

    const input: DiceResultInput = {};
    for (let symbol of DIE) {
      input[symbol] = countMathingValue<DieSymbol>(rawRoll, symbol);
    }

    return new DiceResult(input);
  }
}
