import { emptyHoldings, Exchange, ObservedGameState, PlayerStrategy } from '../rules';

/**
 * Safe player alwasy buys small dogs if it does not yet have one.
 */
export class SafePlayer implements PlayerStrategy {
  getExchangeDecision = (state: ObservedGameState): Exchange | null => {
    // Buys small dog with rabbits if can be bought
    if (state.own.smallDog === 0 && state.own.rabbit >= 10)
      return {
        sell: { ...emptyHoldings, rabbit: 6 },
        buy: { ...emptyHoldings, smallDog: 1 },
      };

    // Otherwise do nothing
    return null;
  };
}
