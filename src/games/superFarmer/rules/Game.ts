import { Animal, AnimalCount } from "./Animal";
import { DiceRoll } from "./DiceRoll";

export interface GameState {
  playersHoldings: AnimalCount[];
  board: AnimalCount;
}

export interface ObservedGameState {
  ownHoldings: AnimalCount,
  othersHoldings: AnimalCount[],
  board: AnimalCount,
}

export interface Player {
  getExchangeDecision: (state: ObservedGameState) => AnimalCount;
}

export function getAnimalCountLogData(animals: AnimalCount) {
  const items = [];
  if (animals.horse !== 0) items.push(`${animals.horse}h`);
  if (animals.cow !== 0) items.push(`${animals.cow}c`);
  if (animals.pig !== 0) items.push(`${animals.pig}p`);
  if (animals.sheep !== 0) items.push(`${animals.sheep}s`);
  if (animals.rabbit !== 0) items.push(`${animals.rabbit}r`);
  if (animals.dogLarge !== 0) items.push(`${animals.dogLarge}dl`);
  if (animals.dogSmall !== 0) items.push(`${animals.dogSmall}ds`);

  return items;
}

export function getGameStateLogData(state: GameState) {
  const players = state.playersHoldings.map((holdings) => getAnimalCountLogData(holdings));
  const board = getAnimalCountLogData(state.board);
  return { players, board };
}

export function getObservedGameStateLogData(state: ObservedGameState) {
  const own = getAnimalCountLogData(state.ownHoldings);
  const others = state.othersHoldings.map(holdings => getAnimalCountLogData(holdings))
  const board = getAnimalCountLogData(state.board);
  return { own, others, board }
}

export function getDiceRollLogData(roll: DiceRoll) {
    const items = [];
    if (roll.wolf > 0) items.push('WOLF');
    if (roll.fox > 0) items.push('FOX');
    if (roll.horse > 0) items.push('horse');
    if (roll.cow > 0) items.push('cow');
    if (roll.pig > 0) items.push(`${roll.pig} pig(s)`);
    if (roll.sheep > 0) items.push(`${roll.sheep} sheep`);
    if (roll.rabbit > 0) items.push(`${roll.rabbit} rabbit(s)`);

    return items;
}
