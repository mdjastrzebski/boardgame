import * as SuperFarmer from '..';
import { rollDice } from '../rules/DiceRoll';

function run() {
  let playerState = SuperFarmer.initialPlayerState;
  console.log('STATE', playerState);

  for (let round = 0; round < 1000; round += 1) {
    const roll = rollDice();
    SuperFarmer.printDiceRoll(roll);
    playerState = SuperFarmer.playerDiceRollReducer(playerState, roll);
    SuperFarmer.printHoldings(playerState);
  }
}

// Run the simulation
run();
