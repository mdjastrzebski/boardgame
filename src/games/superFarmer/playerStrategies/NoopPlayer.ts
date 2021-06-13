import { ObservedGameState } from '../rules';
import { PlayerStrategy } from '../rules/PlayerStrategy';

/** Noop player never exchange anything */
export class NoopPlayer implements PlayerStrategy {
  getExchangeDecision = (state: ObservedGameState) => null;
}
