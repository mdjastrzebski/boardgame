import * as R from 'ramda';
import { countMathingValue } from '../../../core/array';
import { randomElement } from '../../../core/random';
import { colors } from './Color';

export const die = [...colors, 'joker'] as const;

export type DieSymbol = typeof die[number];

export type DiceRoll = [DieSymbol, DieSymbol, DieSymbol, DieSymbol];

export function rollDice(): DiceRoll {
  return [randomElement(die), randomElement(die), randomElement(die), randomElement(die)];
}

export function printDiceRoll(roll: DiceRoll, label: string) {
  console.log(`  ${label}:`, ...roll);
}

export type DiceRollStats = Record<DieSymbol, number>;

export function getDiceRollStats(roll: DiceRoll): DiceRollStats {
  return {
    red: countMathingValue(roll, 'red'),
    yellow: countMathingValue(roll, 'yellow'),
    green: countMathingValue(roll, 'grenen'),
    blue: countMathingValue(roll, 'blue'),
    black: countMathingValue(roll, 'black'),
    joker: countMathingValue(roll, 'joker'),
  };
}

export function add(a: DiceRollStats, b: Partial<DiceRollStats>): DiceRollStats {
  return R.mapObjIndexed((_, key) => a[key] + (b[key] ?? 0), a);
}

export function subtract(a: DiceRollStats, b: Partial<DiceRollStats>): DiceRollStats {
  return R.mapObjIndexed((_, key) => a[key] - (b[key] ?? 0), a);
}

export function printDiceRollStats(stats: DiceRollStats, label: string) {
  console.log(`  ${label}:`, R.pickBy((value) => value > 0, stats));
}
