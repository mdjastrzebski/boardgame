import { DiceSymbol, DiceRoll, rollHasSymbol, rollSymbolCount } from './dice';

/**
 * Super Farmer player game state: number of rabbits, sheep, pigs, cows, horses, small dogs & large dogs.
 */

export type PlayerState = {
  rabbits: number;
  sheep: number;
  pigs: number;
  cows: number;
  horses: number;
  smallDogs: number;
  largeDogs: number;
};

export const initialPlayerState: PlayerState = {
  rabbits: 0,
  sheep: 0,
  pigs: 0,
  cows: 0,
  horses: 0,
  smallDogs: 0,
  largeDogs: 0,
};

export function playerDiceRollReducer(state: PlayerState, roll: DiceRoll): PlayerState {
  return {
    rabbits: rabbitsDiceRollReducer(state.rabbits, roll),
    sheep: largeAnimalDiceRollReducer(DiceSymbol.Sheep, state.sheep, roll),
    pigs: largeAnimalDiceRollReducer(DiceSymbol.Pig, state.pigs, roll),
    cows: largeAnimalDiceRollReducer(DiceSymbol.Cow, state.cows, roll),
    horses: horseDiceRollReducer(state.horses, roll),
    smallDogs: smallDogDiceRollReducer(state.smallDogs, roll),
    largeDogs: largeDogDiceRollReducer(state.largeDogs, roll),
  };
}

/** Rabbits bread based on token count & dice roll and are immune to wolf */
function rabbitsDiceRollReducer(count: number, roll: DiceRoll): number {
  if (rollHasSymbol(roll, DiceSymbol.Fox)) {
    return 0;
  }

  const base = count + rollSymbolCount(roll, DiceSymbol.Rabbit);
  return count + Math.floor(base / 2);
}

/** Sheep, Pigs & Cows bread based on token count & dice roll and are immune to fox */
function largeAnimalDiceRollReducer(symbol: DiceSymbol, count: number, roll: DiceRoll) {
  if (rollHasSymbol(roll, DiceSymbol.Wolf)) {
    return 0;
  }

  const base = count + rollSymbolCount(roll, symbol);
  return count + Math.floor(base / 2);
}

/** Horses bread based on token count & dice roll but are immunne to both fox & wolf */
function horseDiceRollReducer(count: number, roll: DiceRoll) {
  const base = count + rollSymbolCount(roll, DiceSymbol.Horse);
  return count + Math.floor(base / 2);
}

/** Small dogs bread based on token count and are immunne to wolf */
function smallDogDiceRollReducer(count: number, roll: DiceRoll) {
  if (rollHasSymbol(roll, DiceSymbol.Fox)) {
    return 0;
  }

  return count;
}

/** Large dogs bread based on token count and are immunne to fox */
function largeDogDiceRollReducer(count: number, roll: DiceRoll) {
  if (rollHasSymbol(roll, DiceSymbol.Wolf)) {
    return Math.max(count - 1, 0);
  }

  return count + Math.floor(count / 2);
}

export function printPlayerState(state: PlayerState) {
  console.log(
    `PLAYER STATE: ` +
      `rabbits: ${state.rabbits}, ` +
      `sheep: ${state.sheep}, ` +
      `cows: ${state.cows}, ` +
      `horses: ${state.horses}, ` +
      `small dog: ${state.smallDogs}, ` +
      `large dog: ${state.largeDogs}.`,
  );
}