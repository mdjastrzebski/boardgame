import * as R from 'ramda';
import { countMathingValue } from '../../../core/array';
import { randomElement } from '../../../core/random';
import { Color, colors } from './Color';

/**
 * Constant representing die sides.
 */
export const die = [...colors, 'joker'] as const;

/**
 * Union type representing all die symbols.
 */
export type DieSymbol = typeof die[number];

/**
 * Record type representing number of rolled dice of each symbol.
 */
export type DiceRoll = Record<DieSymbol, number>;

/**
 * Constant representing result of rolling no dice. Useful for simplified DiceRoll construction. 
 */
export const emptyDiceRoll = { red: 0, yellow: 0, green: 0, blue: 0, black: 0, joker: 0 } as const;

/**
 * Preform a random dice roll.
 * 
 * @param count - number of dice to roll
 * @returns DiceRoll
 */
export function rollDice(count: number = 4): DiceRoll {
  const rawRoll = R.times(() => randomElement(die), count);

  return {
    red: countMathingValue<DieSymbol>(rawRoll, 'red'),
    yellow: countMathingValue<DieSymbol>(rawRoll, 'yellow'),
    green: countMathingValue<DieSymbol>(rawRoll, 'green'),
    blue: countMathingValue<DieSymbol>(rawRoll, 'blue'),
    black: countMathingValue<DieSymbol>(rawRoll, 'black'),
    joker: countMathingValue<DieSymbol>(rawRoll, 'joker'),
  };
}
export function printDiceRoll(stats: DiceRoll, label: string) {
  console.log(
    `  ${label}:`,
    R.pickBy((value) => value > 0, stats),
  );
}

/**
 * Returns number of dice present in given dice roll.
 * 
 * @param roll 
 * @returns 
 */
export function getDiceCount(roll: DiceRoll) {
  return roll.red + roll.yellow + roll.green + roll.blue + roll.black + roll.joker;
}

export function addDiceRolls(first: DiceRoll, second: DiceRoll): DiceRoll {
  return R.mapObjIndexed((_, key) => first[key] + second[key], first);
}

export function subtractDiceRolls(first: DiceRoll, second: DiceRoll): DiceRoll {
  return R.mapObjIndexed((_, key) => first[key] - second[key], first);
}

export function pickDiceColorOrJoker(roll: DiceRoll, color: Color): DiceRoll {
  return {
    ...emptyDiceRoll,
    [color]: roll[color],
    joker: roll.joker,
  };
} 

export function isRollEnoughForColorCount(roll: DiceRoll, color: Color, count: number) {
  return roll[color] + roll.joker >= count;
}

export function getDiceInColorOrJoker(roll: DiceRoll, color: Color) {
  return roll[color] + roll.joker;
}