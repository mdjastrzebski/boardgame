import { Color } from '../concepts/Color';
import { rollDice, getDiceCount, addDiceRolls, pickDiceColorOrJoker } from '../concepts/Dice';

export function run() {
  simulateRollProbability(1000000, 4, 'red');
  simulateRollProbability(1000000, 3, 'red');
  simulateRollProbability(1000000, 2, 'red');
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
  const roll0 = rollDice(4);
  const keepers0 = pickDiceColorOrJoker(roll0, color);

  // First re-roll
  const countToRoll1 = 4 - getDiceCount(keepers0);
  const roll1 = rollDice(countToRoll1);
  const result1 = addDiceRolls(keepers0, roll1);
  const keepers1 = pickDiceColorOrJoker(result1, color);

  // Second re-roll
  const countToRoll2 = 4 - getDiceCount(keepers1);
  const roll2 = rollDice(countToRoll2);
  const result2 = addDiceRolls(keepers1, roll2);

  return result2[color] + result2.joker === value;
}

