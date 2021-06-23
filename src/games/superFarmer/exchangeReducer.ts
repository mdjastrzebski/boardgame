import { Animal, emptyHoldings, Exchange, GameState, Holdings } from './rules';

export function exchangeReducer(state: GameState, exchange: Exchange): GameState {
  const common: Holdings = { ...emptyHoldings };
  const player: Holdings = { ...emptyHoldings };

  Object.values(Animal).forEach((animal) => {
    common[animal] = state.common[animal] + exchange.sell[animal] - exchange.buy[animal];
    player[animal] = state.player[animal] - exchange.sell[animal] + exchange.buy[animal];
  });

  return { common, player };
}
