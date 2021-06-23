import { stat } from 'fs';
import { rollDice, getDiceRollStats, printDiceRoll, printDiceRollStats } from '../concepts/Dice';

export function run() {
  simulateRollProbability(1000000, 4);
  simulateRollProbability(1000000, 3);
  simulateRollProbability(1000000, 2);
}

function simulateRollProbability(times: number, threshold: number) {
    let success = 0;
    for (let i = 0; i < times; i += 1) {
      const roll = rollDice();
      const stats = getDiceRollStats(roll);
      if (stats.red + stats.joker >= threshold) {
        success += 1;
      }
    }

    console.log('PROBABILITY', threshold, success / times);
}

