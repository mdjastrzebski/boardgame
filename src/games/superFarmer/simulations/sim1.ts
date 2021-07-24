import { ALL_ANIMALS, AnimalCount, valuePerAnimal, DiceRoll, buildDiceRoll, DIE_ONE, DIE_TWO, fillAnimalCount, subtractAnimalCount, TOTAL_ANIMAL_COUNT } from '../rules';

export function getTotalValue(animals: AnimalCount): number {
  return ALL_ANIMALS.reduce((total, animal) => {
    return total + valuePerAnimal[animal] * (animals[animal] ?? 0);
  }, 0);
}

export function applyDiceRoll(holding: AnimalCount, board: AnimalCount, roll: DiceRoll): AnimalCount {
  const result = { ...holding };

  if (roll.horse) {
    result.horse += getPairsCount(roll.horse, holding.horse, board.horse);
  }

  if (roll.wolf && !result.dogLarge) {
    result.cow = 0;
    result.pig = 0;
    result.sheep = 0;
  } else {
    if (roll.wolf) result.dogLarge -= 1;
    if (roll.cow) result.cow += getPairsCount(roll.cow, holding.cow, board.cow);
    if (roll.pig) result.pig += getPairsCount(roll.pig, holding.pig, board.pig);
    if (roll.sheep) result.sheep += getPairsCount(roll.sheep, holding.sheep, board.sheep);
  }

  if (roll.fox && !result.dogSmall) {
      result.rabbit = 0;
  } else {
      if (roll.fox) result.dogSmall -= 1;
      if (roll.rabbit) result.rabbit += getPairsCount(roll.rabbit, holding.rabbit, board.rabbit);
  }

  return result;
}

export function getPairsCount(rollCount: number, holdingCount: number, limit: number): number {
  const totalCount = rollCount + holdingCount;
  const pairsCount = Math.floor(totalCount / 2);
  return Math.min(pairsCount, limit) ;
}

export function getExpectedValueAfterDiceRoll(holding: AnimalCount, board: AnimalCount): number {
  let result = 0;

  for (const symbolOne of DIE_ONE) {
    for (const symbolTwo of DIE_TWO) {
      const roll = buildDiceRoll([symbolOne, symbolTwo]);
      const animalsAfterRoll = applyDiceRoll(holding, board, roll);
      result += getTotalValue(animalsAfterRoll);
    }
  }

  const caseCount = DIE_ONE.length * DIE_TWO.length;
  return result / caseCount;
}

function getExpectedValue(holding: Partial<AnimalCount>): number {
  const filledHolding = fillAnimalCount(holding);
  const board = subtractAnimalCount(TOTAL_ANIMAL_COUNT, filledHolding);
  return getExpectedValueAfterDiceRoll(filledHolding, board);
}

console.log('TARGET', getTotalValue(fillAnimalCount({ rabbit: 1, sheep: 1, pig: 1, cow: 1, horse: 1 })));
console.log(getExpectedValue({ rabbit: 1 }));
console.log(getExpectedValue({ rabbit: 2.04 }));
console.log(getExpectedValue({ rabbit: 3.24 }));
console.log(getExpectedValue({ rabbit: 4.80 }));
console.log(getExpectedValue({ rabbit: 6.48 }));
console.log(getExpectedValue({ rabbit: 8.73 }));
console.log(getExpectedValue({ rabbit: 11.50 }));
console.log(getExpectedValue({ rabbit: 15.20 }));
console.log(getExpectedValue({ rabbit: 20.01 }));
console.log(getExpectedValue({ rabbit: 26.09 }));
console.log(getExpectedValue({ rabbit: 27.79, dogSmall: 1 }));
console.log(getExpectedValue({ rabbit: 38.20, dogSmall: 1 }));
console.log(getExpectedValue({ rabbit: 40.61, dogSmall: 1, sheep: 2 }));
console.log(getExpectedValue({ rabbit: 38.23, dogSmall: 1, sheep: 5 }));
console.log(getExpectedValue({ rabbit: 38.39, dogSmall: 1, sheep: 8 }));
console.log(getExpectedValue({ rabbit: 41.74, dogSmall: 1, sheep: 9 }));
console.log(getExpectedValue({ rabbit: 37.43, dogSmall: 1, sheep: 13 }));
