import { rollDice, printDiceRoll } from '../rules';

function run() {
  for (let i = 0; i < 25; i += 1) {
    const roll = rollDice();
    printDiceRoll(roll, "roll");
  }
}

// Run the simulation
run();
