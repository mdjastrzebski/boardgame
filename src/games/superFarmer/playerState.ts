import { DiceSymbol, DiceRoll, rollHasSymbol, rollSymbolCount } from './dice';

/**
 * Super Farmer player game state: number of rabbits, sheep, pigs, cows, horses, small dogs & large dogs.
 */

export type PlayerState = {
  rabbitCount: number;
  sheepCount: number;
  pigCount: number;
  cowCount: number;
  horseCount: number;
  smallDogCount: number;
  largeDogCount: number;
};

export const initialPlayerState: PlayerState = {
  rabbitCount: 0,
  sheepCount: 0,
  pigCount: 0,
  cowCount: 0,
  horseCount: 0,
  smallDogCount: 0,
  largeDogCount: 0,
};

export function playerDiceRollReducer(state: PlayerState, roll: DiceRoll): PlayerState {
  return {
    rabbitCount: rabbitsDiceRollReducer(state.rabbitCount, roll),
    sheepCount: largeAnimalDiceRollReducer(DiceSymbol.Sheep, state.sheepCount, roll),
    pigCount: largeAnimalDiceRollReducer(DiceSymbol.Pig, state.pigCount, roll),
    cowCount: largeAnimalDiceRollReducer(DiceSymbol.Cow, state.cowCount, roll),
    horseCount: horseDiceRollReducer(state.horseCount, roll),
    smallDogCount: smallDogDiceRollReducer(state.smallDogCount, roll),
    largeDogCount: largeDogDiceRollReducer(state.largeDogCount, roll),
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
      `rabbits: ${state.rabbitCount}, ` +
      `sheep: ${state.sheepCount}, ` +
      `cows: ${state.cowCount}, ` +
      `horses: ${state.horseCount}, ` +
      `small dog: ${state.smallDogCount}, ` +
      `large dog: ${state.largeDogCount}.`,
  );
}