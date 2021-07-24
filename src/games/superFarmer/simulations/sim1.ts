import { ALL_ANIMALS, AnimalCount, valuePerAnimal, DiceRoll, EMPTY_ANIMAL_COUNT, buildDiceRoll, DIE_ONE, DIE_TWO, fillAnimalCount } from '../rules';

export function getTotalValue(animals: AnimalCount): number {
  return ALL_ANIMALS.reduce((total, animal) => {
    return total + valuePerAnimal[animal] * (animals[animal] ?? 0);
  }, 0);
}

export function applyDiceRoll(animals: AnimalCount, roll: DiceRoll): AnimalCount {
  const result = { ...animals };

  if (roll.horse) {
    result.horse += getPairsCount(roll.horse, result.horse);
  }

  if (roll.wolf && !result.dogLarge) {
    result.cow = 0;
    result.pig = 0;
    result.sheep = 0;
  } else {
    if (roll.wolf) result.dogLarge -= 1;
    if (roll.cow) result.cow += getPairsCount(roll.cow, animals.cow);
    if (roll.pig) result.pig += getPairsCount(roll.pig, animals.pig);
    if (roll.sheep) result.sheep += getPairsCount(roll.sheep, animals.sheep);
  }

  if (roll.fox && !result.dogSmall) {
      result.rabbit = 0;
  } else {
      if (roll.fox) result.dogSmall -= 1;
      if (roll.rabbit) result.rabbit += getPairsCount(roll.rabbit, animals.rabbit);
  }

  return result;
}

export function getPairsCount(rollCount: number, holdingCount: number | undefined): number {
  const totalCount = rollCount + (holdingCount ?? 0);
  return Math.floor(totalCount / 2);
}

export function getExpectedValueAfterDiceRoll(animals: AnimalCount): number {
  let result = 0;

  for (const symbolOne of DIE_ONE) {
    for (const symbolTwo of DIE_TWO) {
      const roll = buildDiceRoll([symbolOne, symbolTwo]);
      const animalsAfterRoll = applyDiceRoll(animals, roll);
      const value = getTotalValue(animalsAfterRoll);
      result += value;
    }
  }

  const caseCount = DIE_ONE.length * DIE_TWO.length;
  return result / caseCount;
}

const baseValue = getTotalValue(fillAnimalCount({ cow: 1 }));
console.log(baseValue, [
  getExpectedValueAfterDiceRoll(fillAnimalCount({ cow: 1 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 3 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 2, sheep: 2 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 2, sheep: 1, rabbit: 6 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 2, rabbit: 12 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 1, sheep: 4 })) - baseValue,
]);

console.log(baseValue, [
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 1, sheep: 3, rabbit: 6 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 1, sheep: 2, rabbit: 12 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 1, sheep: 1, rabbit: 18 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 1, sheep: 0, rabbit: 24 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ sheep: 6 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ sheep: 5, rabbit: 6 })) - baseValue,
]);

console.log(baseValue, [
  getExpectedValueAfterDiceRoll(fillAnimalCount({ sheep: 4, rabbit: 12 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ sheep: 3, rabbit: 18 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ sheep: 2, rabbit: 24 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ sheep: 1, rabbit: 30 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ rabbit: 36 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ rabbit: 30, dogSmall: 1 })) - baseValue,
]);

console.log(baseValue, [
  getExpectedValueAfterDiceRoll(fillAnimalCount({ cow: 1 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ pig: 1, sheep: 1, rabbit: 18 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ sheep: 1, rabbit: 30 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ rabbit: 36 })) - baseValue,
  getExpectedValueAfterDiceRoll(fillAnimalCount({ rabbit: 30, dogSmall: 1 })) - baseValue,
]);

// small dog insurance: ( 27r / 21r + ds / 21r + s): [ 35.083333333333336, 35.166666666666664, 34.875 ]
// large dog insurance: ( 18s / 12s + dl / 12s + c): 108 [ 11.166666666666671, 11.166666666666671, 7.666666666666671 ]
// 1 horse: 1h / 36r + 6s / 36r + sd + 5s: 72 [ 6.666666666666671, 13.916666666666671, 17.41666666666667 ]
// h / 2c / c + ds => 72 [ 6.666666666666671, -2.3333333333333286, 0.6666666666666714 ]
// h / c + p + s + 18r / c + p + s + 12r + ds => 72 [ 6.666666666666671, 8.458333333333329, 7.583333333333329 ]
// c / 2p / 