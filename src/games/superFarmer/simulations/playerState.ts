import * as SuperFarmer from '..';
import { rollBothDice } from '../dice';

function run() {
  let playerState = SuperFarmer.initialPlayerState;
  console.log('STATE', playerState);

  for (let round = 0; round < 1000; round += 1) {
    const roll = rollBothDice();
    SuperFarmer.printDiceRoll(roll);
    playerState = SuperFarmer.playerDiceRollReducer(playerState, roll);
    SuperFarmer.printPlayerState(playerState);
  }
}

// Run the simulation
run();
