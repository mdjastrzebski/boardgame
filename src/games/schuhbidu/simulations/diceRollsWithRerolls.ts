import { Color } from '../concepts/Color';
import { DiceResult } from '../concepts/DiceResult';

export function run() {
  simulateRollProbability(1000000, 4, 'red');
  simulateRollProbability(1000000, 3, 'red');
  simulateRollProbability(1000000, 2, 'red');
  simulateRollProbability(1000000, 1, 'red');
  simulateRollProbability(1000000, 0, 'red');
}

function simulateRollProbability(times: number, value: number, color: Color) {
  let success = 0;

  for (let i = 0; i < times; i += 1) {
    const isSuccess = isRollWithRerollsSuccessul(value, color);
    if (isSuccess) {
      success += 1;
    }
  }

  console.log('PROBABILITY', value, success / times);
}

function isRollWithRerollsSuccessul(value: number, color: Color) {
  // Initial roll
  const roll0 = DiceResult.roll(4);
  const keepers0 = roll0.pickColorAndJokers(color);

  // First re-roll
  const countToRoll1 = 4 - keepers0.count;
  const roll1 = DiceResult.roll(countToRoll1);
  const result1 = keepers0.addDice(roll1);
  const keepers1 = result1.pickColorAndJokers(color);

  // Second re-roll
  const countToRoll2 = 4 - keepers1.count;
  const roll2 = DiceResult.roll(countToRoll2);
  const result2 = keepers1.addDice(roll2);

  return result2.getCountInColorOrJoker(color) === value;
}

