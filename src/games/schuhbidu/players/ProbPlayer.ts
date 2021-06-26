import * as math from 'mathjs';
import { findMax } from '../../../core/array';
import { Color, colors } from '../concepts/Color';
import { DiceResult } from '../concepts/DiceResult';
import { GameState } from '../concepts/Game';
import { Player } from '../concepts/Player';
import { Tile, TILE_VALUES } from '../concepts/Tile';
import { TileSet } from '../concepts/TileSet';
export class ProbPlayer implements Player {
  secondRerollExpectedValues: math.Matrix;
  firstRerollExpectValues: math.Matrix;

  constructor(secondRerollExpectedValues: math.Matrix, firstRerollExpectValues: math.Matrix) {
    this.secondRerollExpectedValues = secondRerollExpectedValues;
    this.firstRerollExpectValues = firstRerollExpectValues;
  }

  getDiceToKeep(state: GameState, roll: DiceResult, rerollsLeft: number): DiceResult {
    if (rerollsLeft === 1) {
      const [bestColor] = findMax(colors, (color) => {
        const encodedValues = state.board.getEncodedValuesForColor(color);
        const matchingDice = roll.getCountInColorOrJoker(color);
        return this.secondRerollExpectedValues.get([encodedValues, matchingDice]);
      });

      return roll.pickColorAndJokers(bestColor);
    }

    const [bestColor] = findMax(colors, (color) => {
      const encodedValues = state.board.getEncodedValuesForColor(color);
      const matchingDice = roll.getCountInColorOrJoker(color);
      return this.firstRerollExpectValues.get([encodedValues, matchingDice]);
    });

    return roll.pickColorAndJokers(bestColor);
  }

  getBoardTileToPick(state: GameState, finalRoll: DiceResult): Tile | null {
    for (const value of TILE_VALUES) {
      const colors = state.board.getColorsForValue(value);
      const matchingRolls = colors.filter((color) => finalRoll.getCountInColorOrJoker(color) >= value);
      if (matchingRolls.length > 0) return { color: matchingRolls[0], value };
    }

    return null;
  }
}

export function trainProbPlayer() {
  const finalValues = getFinalValues();
  console.log('FINAL VALUES', finalValues);
  const secondRerollExpectedValues = getRerollExpectedValues(finalValues);
  console.log('2nd REROLL EXPECTED VALUES', secondRerollExpectedValues);
  const firstRerollExpectedValues = getRerollExpectedValues(secondRerollExpectedValues);
  console.log('1st REROLL EXPECTED VALUES', firstRerollExpectedValues);
  
  return new ProbPlayer(secondRerollExpectedValues, firstRerollExpectedValues);
}

const VALUE_LISTS = [[4, 3, 2], [4, 3], [4, 2], [4], [3, 2], [3], [2], []];
const MATCHING_DICE_COUNTS = [4, 3, 2, 1, 0];

// Final (i.e. not-expected) values for given values x matching dice
function getFinalValues() {
  const result = math.matrix();
  for (const values of VALUE_LISTS) {
    const encodedValues = TileSet.encodeValues(values);
    for (const matchingDice of MATCHING_DICE_COUNTS) {
      result.set([encodedValues, matchingDice], getFinalValue(values, matchingDice));
    }
  }

  return result;
}

function getFinalValue(values: number[], matchingDice: number) {
  if (matchingDice >= 4 && values.includes(4)) return 4;
  if (matchingDice >= 3 && values.includes(3)) return 3;
  if (matchingDice >= 2 && values.includes(2)) return 2;
  return 0;
}

function getRerollExpectedValues(baseExpectedValues: math.Matrix) {
  const result = math.matrix();
  for (const values of VALUE_LISTS) {
    const encodedValues = TileSet.encodeValues(values);
    for (const matchingDice of MATCHING_DICE_COUNTS) {
      const expectedValue = getRerollExpectedValue(10000, baseExpectedValues, encodedValues, matchingDice);
      result.set([encodedValues, matchingDice], +expectedValue.toFixed(4));
    }
  }
  return result;
}

function getRerollExpectedValue(rollCount: number, baseExpectedValues: math.Matrix, encodedValues: number, matchingDice: number) {
  const diceToRoll = 4 - matchingDice;

  let total = 0;
  for (let i = 0; i < rollCount; i += 1) {
    const roll = DiceResult.roll(diceToRoll);
    const totalMatchingDice = matchingDice + roll.getCountInColorOrJoker('red');
    total += baseExpectedValues.get([encodedValues, totalMatchingDice]);
  }

  return total / rollCount;
}
