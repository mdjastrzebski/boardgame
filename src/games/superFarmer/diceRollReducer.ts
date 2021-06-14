import { GameState, DiceSymbol, DiceRoll, rollHasSymbol, rollSymbolCount, Animal, Holdings, emptyHoldings } from './rules';

/**
 * Super Farmer player game state: number of rabbits, sheep, pigs, cows, horses, small dogs & large dogs.
 */

export function diceRollReducer(state: GameState, roll: DiceRoll): GameState {
  const { player, common } = state;

  const diff = {
    rabbit: getRabbitsDiff(player.rabbit, common.rabbit, roll, player.smallDog),
    sheep: getLargeAnimalDiff(DiceSymbol.Sheep, player.sheep, common.sheep, roll, player.largeDog),
    pig: getLargeAnimalDiff(DiceSymbol.Pig, player.pig, common.pig, roll, player.largeDog),
    cow: getLargeAnimalDiff(DiceSymbol.Cow, player.cow, common.cow, roll, player.largeDog),
    horse: getHorsesDiff(player.horse, common.horse, roll),
    smallDog: getSmallDogsDiff(player.smallDog, common.smallDog, roll),
    largeDog: getLargeDogsDiff(player.largeDog, common.largeDog, roll),
  };

  const resultCommon: Holdings = { ...emptyHoldings };
  const resultPlayer: Holdings = { ...emptyHoldings };

  Object.values(Animal).forEach((animal) => {
    resultCommon[animal] = common[animal] - diff[animal];
    resultPlayer[animal] = player[animal] + diff[animal];
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
