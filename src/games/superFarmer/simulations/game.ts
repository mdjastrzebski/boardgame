import { getInitialGameState, getObservedGameState, printDiceRoll, printHoldings, rollDice } from '../rules';
import { exchangeReducer } from '../exchangeReducer';
import { diceRollReducer } from '../diceRollReducer';
import { NoopPlayer } from '../playerStrategies/NoopPlayer';
import { SafePlayer } from '../playerStrategies/SafePlayer';

export function run() {
  let state = getInitialGameState();
  let player = new SafePlayer();

  for (let i = 0; i < 20; i += 1) {
      console.log(`Turn ${i+1}`)
      printHoldings(state.player, `  initial`);

      const playerState = getObservedGameState(state);
      const exchange = player.getExchangeDecision(playerState);

      if (exchange) {
        state = exchangeReducer(state, exchange);
        printHoldings(exchange.sell, `  exchange sell`);
        printHoldings(exchange.buy, `  exchange buy`);
      } else {
        console.log("  no exchange");
      }

      const roll = rollDice();
      printDiceRoll(roll, '  roll');
      state = diceRollReducer(state, roll);  
      printHoldings(state.player, `  final`);
  }
}

run();
