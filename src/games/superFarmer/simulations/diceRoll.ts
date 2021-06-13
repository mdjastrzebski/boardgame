import * as SuperFarmer from '..';

function run() {
  for (let i = 0; i < 25; i += 1) {
    const roll = SuperFarmer.rollBothDice();
    SuperFarmer.printDiceRoll(roll);
  }
}

// Run the simulation
run();
