import { getInitialGameState, getObservedGameState, printDiceRoll, printHoldings, rollDice } from '../rules';
import { exchangeReducer } from '../exchangeReducer';
import { diceRollReducer } from '../diceRollReducer';
import { NoopPlayer } from '../playerStrategies/NoopPlayer';
import { SafePlayer } from '../playerStrategies/SafePlayer';

export function run() {
  let state = getInitialGameState();
  let player = new SafePlayer();

  printHoldings(state.player, "Player")

  for (let i = 0; i < 20; i += 1) {
      const playerState = getObservedGameState(state);
      const exchange = player.getExchangeDecision(playerState);

      if (exchange) {
        state = exchangeReducer(state, exchange);
      }

      const roll = rollDice();
      printDiceRoll(roll);
      state = diceRollReducer(state, roll);

      printHoldings(state.player, 'Player');
  }
}

run();
