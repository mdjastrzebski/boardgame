import { Exchange } from './Exchange';
import { ObservedGameState } from './GameState';

export interface PlayerStrategy {
  getExchangeDecision: (state: ObservedGameState) => Exchange | null;
}
