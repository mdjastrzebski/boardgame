import { randomInteger } from '../../core/random';

export enum DiceSymbol {
    Rabbit = "rabit",
    Sheep = "sheep",
    Pig = "pig",
    Cow = "cow",
    Horse = "horse",
    Fox = "fox",
    Wolf ="wolf",
}

/**
 * Dice one (12 sides): 6 rabbits, 2 sheep, 2 pig, 1 horse, 1 fox
 */
export const diceOneSides = [
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
 * Dice two (12 sides): 6 rabbits, 3 sheep, 1 pig, 1 cow, 1 wolf
 */
export const diceTwoSides = [
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

export function rollDiceOne(): DiceSymbol {
  const side = randomInteger(diceOneSides.length);
  return diceOneSides[side];
}

export function rollDiceTwo(): DiceSymbol {
  const side = randomInteger(diceTwoSides.length);
  return diceTwoSides[side];
}

/**
 * Roll both dice - standard player roll.
 * @returns Tuple of DiceSymbol.
 */
export function rollBothDice(): [DiceSymbol, DiceSymbol] {
  return [rollDiceOne(), rollDiceTwo()];
}
