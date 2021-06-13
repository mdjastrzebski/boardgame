import { GameState, DiceSymbol, DiceRoll, rollHasSymbol, rollSymbolCount, Animal, Holdings } from './rules';

/**
 * Super Farmer player game state: number of rabbits, sheep, pigs, cows, horses, small dogs & large dogs.
 */

export function diceRollReducer(state: GameState, roll: DiceRoll): GameState {
  const { player, common } = state;

  const diff = {
    rabbit: getRabbitsDiff(player.rabbit ?? 0, common.rabbit ?? 0, roll, player.smallDog ?? 0),
    sheep: getLargeAnimalDiff(DiceSymbol.Sheep, player.sheep ?? 0, common.sheep ?? 0, roll, player.largeDog ?? 0),
    pig: getLargeAnimalDiff(DiceSymbol.Pig, player.pig ?? 0, common.pig ?? 0, roll, player.largeDog ?? 0),
    cow: getLargeAnimalDiff(DiceSymbol.Cow, player.cow ?? 0, common.cow ?? 0, roll, player.largeDog ?? 0),
    horse: getHorsesDiff(player.horse ?? 0, common.horse ?? 0, roll),
    smallDog: getSmallDogsDiff(player.smallDog ?? 0, common.smallDog ?? 0, roll),
    largeDog: getLargeDogsDiff(player.largeDog ?? 0, common.largeDog ?? 0, roll),
  };

  const resultCommon: Holdings = {};
  const resultPlayer: Holdings = {};

  Object.values(Animal).forEach((animal) => {
    resultCommon[animal] = (common[animal] ?? 0) - diff[animal];
    resultPlayer[animal] = (player[animal] ?? 0) + diff[animal];
  });

  return { common: resultCommon, player: resultPlayer };
}

/** Rabbits are vulnerable to fox */
function getRabbitsDiff(playerCount: number, commonCount: number, roll: DiceRoll, smallDogCount: number): number {
  if (smallDogCount === 0 && rollHasSymbol(roll, DiceSymbol.Fox)) {
    return -playerCount;
  }

  const base = playerCount + rollSymbolCount(roll, DiceSymbol.Rabbit);
  const breed = Math.floor(base / 2);
  return Math.min(commonCount, breed);
}

/** Sheep, Pigs & Cows are vulneralbe to wolf */
function getLargeAnimalDiff(symbol: DiceSymbol, playerCount: number, commonCount: number, roll: DiceRoll, largeDogCount: number): number {
  if (largeDogCount === 0 && rollHasSymbol(roll, DiceSymbol.Wolf)) {
    return -playerCount;
  }

  const base = playerCount + rollSymbolCount(roll, symbol);
  const breed = Math.floor(base / 2);
  return Math.min(commonCount, breed);
}

/** Horser are not vulnerable */
function getHorsesDiff(playerCount: number, commonCount: number, roll: DiceRoll): number {
  const base = playerCount + rollSymbolCount(roll, DiceSymbol.Horse);
  const breed = Math.floor(base / 2);
  return Math.min(commonCount, breed);
}

/** Small dogs are vulneralble to fox */
function getSmallDogsDiff(playerCount: number, commonCount: number, roll: DiceRoll): number {
  if (rollHasSymbol(roll, DiceSymbol.Fox)) {
    return -playerCount;
  }

  const breed = Math.floor(playerCount / 2);
  return Math.min(commonCount, breed);
}

/** Large dogs are vulneralble to fox */
function getLargeDogsDiff(playerCount: number, commonCount: number, roll: DiceRoll): number {
  if (rollHasSymbol(roll, DiceSymbol.Wolf)) {
    return -playerCount;
  }

  const breed = Math.floor(playerCount / 2);
  return Math.min(commonCount, breed);
}