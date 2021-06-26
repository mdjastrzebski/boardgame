import { Color } from '../concepts/Color';
import { DiceResult } from '../concepts/DiceResult';

export function run() {
  simulateRollProbability(1000000, 4, 'red');
  simulateRollProbability(1000000, 3, 'red');
  simulateRollProbability(1000000, 2, 'red');
  simulateRollProbability(1000000, 1, 'red');
  simulateRollProbability(1000000, 0, 'red');
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
  const roll = DiceResult.roll();
  return roll.getCountInColorOrJoker(color) === threshold
}

run();