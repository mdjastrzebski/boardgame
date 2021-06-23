import { countMathingValue } from "../../../core/array";
import { randomElement } from "../../../core/random";

export enum DieSymbol {
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Black = 'black',
  Joker = 'joker',
}

export const die = [DieSymbol.Red, DieSymbol.Yellow, DieSymbol.Green, DieSymbol.Blue, DieSymbol.Black, DieSymbol.Joker];

export type DiceRoll = [DieSymbol, DieSymbol, DieSymbol, DieSymbol];

export function rollDice(): DiceRoll {
    return [randomElement(die), randomElement(die), randomElement(die), randomElement(die)];
};

export function printDiceRoll(roll: DiceRoll, label: string) {
    console.log(`  ${label}:`, ...roll);
}

export type DiceRollStats = {
  red: number;
  yellow: number;
  green: number;
  blue: number;
  black: number;
  joker: number;
};

export function getDiceRollStats(roll: DiceRoll): DiceRollStats {
  return {
    red: countMathingValue(roll, DieSymbol.Red),
    yellow: countMathingValue(roll, DieSymbol.Yellow),
    green: countMathingValue(roll, DieSymbol.Green),
    blue: countMathingValue(roll, DieSymbol.Blue),
    black: countMathingValue(roll, DieSymbol.Black),
    joker: countMathingValue(roll, DieSymbol.Joker),
  };
}

export function printDiceRollStats(stats: DiceRollStats, label: string) {
  console.log(`  ${label}:`, stats);
}
