import { Animal, AnimalCount } from "./Animal";

export interface GameState {
  playerHoldings: AnimalCount;
  board: AnimalCount;
  currentPlayer: number;
}

export interface ObservedGameState {
  ownHoldings: AnimalCount,
  othersHoldings: AnimalCount[],
}

export interface Player {
  getExchangeDecision: (state: ObservedGameState) => AnimalCount;
}
