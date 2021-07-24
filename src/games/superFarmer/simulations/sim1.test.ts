import { EMPTY_ANIMAL_COUNT, fillAnimalCount, EMPTY_DICE_ROLL, fillDiceRoll, AnimalCount, DiceRoll } from '../rules';
import { applyDiceRoll, getTotalValue } from './sim1';

test('getTotalValue', () => {
  expect(getTotalValue(fillAnimalCount({ rabbit: 1 }))).toEqual(1);
  expect(getTotalValue(fillAnimalCount({ sheep: 1 }))).toEqual(6);
  expect(getTotalValue(fillAnimalCount({ pig: 1 }))).toEqual(12);
  expect(getTotalValue(fillAnimalCount({ cow: 1 }))).toEqual(36);
  expect(getTotalValue(fillAnimalCount({ horse: 1 }))).toEqual(72);
  expect(getTotalValue(fillAnimalCount({ dogSmall: 1 }))).toEqual(6);
  expect(getTotalValue(fillAnimalCount({ dogLarge: 1 }))).toEqual(36);
  expect(getTotalValue(fillAnimalCount({ rabbit: 3, sheep: 2, horse: 1 }))).toEqual(87);
});

test('applyDiceRoll rabbits', () => {
  const subject = (animals: Partial<AnimalCount>, roll: Partial<DiceRoll>) => applyDiceRoll(fillAnimalCount(animals), fillDiceRoll(roll));

  expect(subject({}, { rabbit: 2 })).toEqual(fillAnimalCount({ rabbit: 1 }));
  expect(subject({ rabbit: 5 }, { rabbit: 1, fox: 1 })).toEqual(fillAnimalCount({ rabbit: 0 }));
  expect(subject({ rabbit: 1, dogSmall: 1 }, { rabbit: 1, fox: 1 })).toEqual(fillAnimalCount({ rabbit: 2 }));
  expect(subject({ rabbit: 2 }, { wolf: 1 })).toEqual(fillAnimalCount({ rabbit: 2 }));

  expect(subject({}, { sheep: 2 })).toEqual(fillAnimalCount({ sheep: 1 }));
  expect(subject({}, { pig: 2 })).toEqual(fillAnimalCount({ pig: 1 }));
  expect(subject({ sheep: 3 }, { sheep: 1, fox: 1 })).toEqual(fillAnimalCount({ sheep: 5 }));
  expect(subject({ sheep: 1, pig: 1, cow: 1 }, { cow: 1, wolf: 1 })).toEqual(fillAnimalCount({}));
  expect(subject({ sheep: 1, pig: 1, cow: 1 }, { cow: 1, fox: 1 })).toEqual(fillAnimalCount({ sheep: 1, pig: 1, cow: 2 }));

  expect(subject({ horse: 1 }, { fox: 1, wolf: 1 })).toEqual(fillAnimalCount({ horse: 1 }));
});
