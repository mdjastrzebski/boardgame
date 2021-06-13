import { ObservedGameState } from '../rules/GameState';
import { PlayerStrategy } from '../rules/PlayerStrategy';

/**
 * Safe player alwasy buys small dogs if it does not yet have one.
 */
export class SafePlayer implements PlayerStrategy {
  getExchangeDecision = (state: ObservedGameState) => {
    // Buys small dog with rabbits if can be bought
    if (state.own.smallDog === 0 && (state.own.rabbit ?? 0) >= 10)
      return {
        sell: { rabbit: 6 },
        buy: { smallDog: 1 },
      };

    // Otherwise do nothing
    return null;
  };
}
