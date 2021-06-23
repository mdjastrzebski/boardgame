import { Color } from '../concepts/Color';
import { rollDice } from '../concepts/Dice';

export function run() {
  simulateRollProbability(1000000, 4, 'red');
  simulateRollProbability(1000000, 3, 'red');
  simulateRollProbability(1000000, 2, 'red');
}

function simulateRollProbability(times: number, threshold: number, color: Color) {
    let success = 0;
    for (let i = 0; i < times; i += 1) {
      const isSuccess = isRollSuccessul(threshold, color);
      if (isSuccess) {
        success += 1;
      }
    }

    console.log('PROBABILITY', threshold, success / times);
}

function isRollSuccessul(threshold: number, color: Color) {
  const roll = rollDice();
  return roll.red + roll.joker >= threshold
}
