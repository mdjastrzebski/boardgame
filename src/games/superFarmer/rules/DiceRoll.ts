import { randomElement } from '../../../core/random';

export const ALL_DIE_SYMBOLS = ['rabbit', 'sheep', 'pig', 'cow', 'horse', 'fox', 'wolf'] as const;

export type DieSymbol = typeof ALL_DIE_SYMBOLS[number];

/**
 * Die one (12 sides): 6 rabbits, 2 sheep, 2 pig, 1 horse, 1 fox
 */
export const DIE_ONE: DieSymbol[] = [
  'rabbit',
  'rabbit',
  'rabbit',
  'rabbit',
  'rabbit',
  'rabbit',
  'sheep',
  'sheep',
  'pig',
  'pig',
  'horse',
  'fox',
];


/**
 * Die two (12 sides): 6 rabbits, 3 sheep, 1 pig, 1 cow, 1 wolf
 */
export const DIE_TWO: DieSymbol[] = [
  'rabbit',
  'rabbit',
  'rabbit',
  'rabbit',
  'rabbit',
  'rabbit',
  'sheep',
  'sheep',
  'sheep',
  'pig',
  'cow',
  'wolf',
];

export type DiceRoll = Record<DieSymbol, number>;

export const ZERO_DICE_ROLL = {
  rabbit: 0,
  sheep: 0,
  pig: 0,
  cow: 0,
  horse: 0,
  fox: 0,
  wolf: 0,
} as const;

export function buildDiceRoll(dice: DieSymbol[]): DiceRoll {
  const result = { ...ZERO_DICE_ROLL };

  dice.forEach((symbol) => {
    result[symbol] += 1;
  });

  return result;
}

export function rollDice(): DiceRoll {
  const dice = [randomElement(DIE_ONE), randomElement(DIE_TWO)];
  return buildDiceRoll(dice);
}

export function fillDiceRoll(roll: Partial<DiceRoll>): DiceRoll {
  return { ...ZERO_DICE_ROLL, ...roll };
}
