import { Animal } from './Animal';

export type Holdings = Partial<Record<Animal, number>>;

export function printHoldings(state: Holdings, label: string) {
  const entries = [
    state.rabbit ? `${state.rabbit} rabbit(s), ` : null,
    state.sheep ? `${state.sheep} sheep, ` : null,
    state.cow ? `${state.cow} cow(s), ` : null,
    state.horse ? `${state.horse} horse(s), ` : null,
    state.smallDog ? `${state.smallDog} small dog(s), ` : null,
    state.largeDog ? `${state.largeDog} large dog(s),` : null,
  ].filter(Boolean);

  console.log(`${label}: ${entries.join(', ')}`);
}
