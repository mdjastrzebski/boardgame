export const ALL_ANIMALS = ['rabbit', 'sheep', 'pig', 'cow', 'horse', 'dogSmall', 'dogLarge'] as const;

export type Animal = typeof ALL_ANIMALS[number];

export type AnimalCount = Record<Animal, number>;

export const EMPTY_ANIMAL_COUNT: AnimalCount = {
  rabbit: 0,
  sheep: 0,
  pig: 0,
  cow: 0,
  horse: 0,
  dogSmall: 0,
  dogLarge: 0,
} as const;

export function fillAnimalCount(animals: Partial<AnimalCount>): AnimalCount {
  return { ...EMPTY_ANIMAL_COUNT, ...animals };
}

export const valuePerAnimal: Record<Animal, number> = {
  rabbit: 1,
  sheep: 6, // = 6 rabbits
  pig: 12, // = 2 sheep
  cow: 36, // = 3 pigs
  horse: 72, // = 2 cows
  dogSmall: 6, //  = 1 sheep
  dogLarge: 36, // = 1 cow
};

export function addAnimalCounts(first: AnimalCount, second: AnimalCount): AnimalCount {
  const result = { ...first };
  ALL_ANIMALS.forEach((animal) => {
    result[animal] += second[animal];
  });

  return result;
}

export function subtractAnimalCount(first: AnimalCount, second: AnimalCount): AnimalCount {
  const result = { ...first };
  ALL_ANIMALS.forEach((animal) => {
    result[animal] -= second[animal];
  });

  return result;
}


export function capAnimalCount(value: AnimalCount, limit: AnimalCount): AnimalCount {
  const result = { ...value };
  ALL_ANIMALS.forEach((animal) => {
    result[animal] = Math.min(value[animal], limit[animal]);
  });

  return result;
}
