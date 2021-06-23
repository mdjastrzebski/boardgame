import { rollDice, getDiceRollStats, printDiceRoll, printDiceRollStats } from '../concepts/Dice';

function run() {
  for (let i = 0; i < 25; i += 1) {
    const roll = rollDice();
    printDiceRoll(roll, 'roll');
    const stats = getDiceRollStats(roll);
    printDiceRollStats(stats, 'roll stats');
  }
}

// Run the simulation
run();
