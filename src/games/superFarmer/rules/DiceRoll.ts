import { randomElement } from '../../../core/random';

export enum DiceSymbol {
    Rabbit = "rabbit",
    Sheep = "sheep",
    Pig = "pig",
    Cow = "cow",
    Horse = "horse",
    Fox = "fox",
    Wolf ="wolf",
}

/**
 * Die one (12 sides): 6 rabbits, 2 sheep, 2 pig, 1 horse, 1 fox
 */
export const dieOne = [
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Sheep,
  DiceSymbol.Sheep,
  DiceSymbol.Pig,
  DiceSymbol.Pig,
  DiceSymbol.Horse,
  DiceSymbol.Fox,
];



/**
 * Die two (12 sides): 6 rabbits, 3 sheep, 1 pig, 1 cow, 1 wolf
 */
export const dieTwo = [
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Rabbit,
  DiceSymbol.Sheep,
  DiceSymbol.Sheep,
  DiceSymbol.Sheep,
  DiceSymbol.Pig,
  DiceSymbol.Cow,
  DiceSymbol.Wolf,
];

export type DiceRoll = [DiceSymbol, DiceSymbol];

/**
 * Roll both dice - standard player roll.
 * @returns Tuple of DiceSymbol.
 */
export function rollDice(): DiceRoll {
  return [randomElement(dieOne), randomElement(dieTwo)];
}

export function hasDiceRollSymbol(roll: DiceRoll, symbol: DiceSymbol) {
  return roll[0] === symbol || roll[1] === symbol;
}

export function getDiceRollSymbolCount(roll: DiceRoll, symbol: DiceSymbol) {
  return (roll[0] === symbol ? 1 : 0) + (roll[1] === symbol ? 1 : 0);
}

export function printDiceRoll(roll: DiceRoll, label: string) {
  console.log(`${label}:`, [roll[0], roll[1]]);
}