import { Animal, Exchange, GameState, Holdings } from './rules';

export function exchangeReducer(state: GameState, exchange: Exchange): GameState {
  const common: Holdings = {};
  const player: Holdings = {};

  Object.values(Animal).forEach((animal) => {
    common[animal] = (state.common[animal] ?? 0) + (exchange.sell[animal] ?? 0) - (exchange.buy[animal] ?? 0);
    player[animal] = (state.player[animal] ?? 0) - (exchange.sell[animal] ?? 0) + (exchange.buy[animal] ?? 0);
  });

  return { common, player };
}
