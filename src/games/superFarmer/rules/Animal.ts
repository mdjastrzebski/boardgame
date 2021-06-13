export enum Animal {
  Rabbit = 'rabbit',
  Sheep = 'sheep',
  Pig = 'pig',
  Cow = 'cow',
  Horse = 'horse',
  SmallDog = 'smallDog',
  LargeDog = 'largeDog',
}

export const valuePerAnimal: Record<Animal, number> = {
  rabbit: 1,
  sheep: 6,
  pig: 12, // 2 sheep
  cow: 36, // 3 pigs
  horse: 72, // 2 cows
  smallDog: 6, // 1 sheep
  largeDog: 36, // 1 cow
};
