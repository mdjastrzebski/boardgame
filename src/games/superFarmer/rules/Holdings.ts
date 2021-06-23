import { Animal } from './Animal';

export type Holdings = Record<Animal, number>;

export const emptyHoldings: Holdings = {
  rabbit: 0,
  sheep: 0,
  pig: 0,
  cow: 0,
  horse: 0,
  smallDog: 0,
  largeDog: 0,
};

export function printHoldings(state: Holdings, label: string) {
  const entries = [
    state.rabbit ? `${state.rabbit} rabbit(s)` : null,
    state.sheep ? `${state.sheep} sheep` : null,
    state.pig ? `${state.pig} pig(s)` : null,
    state.cow ? `${state.cow} cow(s)` : null,
    state.horse ? `${state.horse} horse(s)` : null,
    state.smallDog ? `${state.smallDog} small dog(s)` : null,
    state.largeDog ? `${state.largeDog} large dog(s)` : null,
  ].filter(item => item != null);

  console.log(`${label}:`, entries);
}
