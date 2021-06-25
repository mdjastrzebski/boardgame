import { findMax } from '../../../core/array';
import { Color, colors } from '../concepts/Color';
import { DiceSet } from '../concepts/Dice';
import { GameState } from '../concepts/Game';
import { Player } from '../concepts/Player';
import { Tile, TILE_VALUES } from '../concepts/Tile';
import { TileSet } from '../concepts/TileSet';
export class ProbPlayer implements Player {
  expectedValueTable: number[][];

  constructor(expectedValueTable: number[][]) {
    this.expectedValueTable = expectedValueTable;
  }

  getDiceToKeep(state: GameState, roll: DiceSet, rerollsLeft: number): DiceSet {
    if (rerollsLeft === 1) {
      const [bestColor] = findMax(colors, (color) => {
        const encodedValues = state.board.getEncodedValuesForColor(color);
        const matchingDice = roll.getCountInColorOrJoker(color);
        return this.expectedValueTable[encodedValues][matchingDice];
      });

      return roll.pickColorAndJokers(bestColor);
    }

    const highValueColors = pickHighValueBoardColors(state.board);
    const color = pickRollColor(roll, highValueColors);

    return roll.pickColorAndJokers(color);
  }

  getBoardTileToPick(state: GameState, finalRoll: DiceSet): Tile | null {
    for (const value of TILE_VALUES) {
      const colors = state.board.getColorsForValue(value);
      const matchingRolls = colors.filter((color) => finalRoll.getCountInColorOrJoker(color) >= value);
      if (matchingRolls.length > 0) return { color: matchingRolls[0], value };
    }

    return null;
  }
}

function pickHighValueBoardColors(board: TileSet): Color[] {
  for (let value of TILE_VALUES) {
    const colors = board.getColorsForValue(value);
    if (colors.length > 0) return colors;
  }

  return [];
}

function pickRollColor(roll: DiceSet, highValueColors: Color[]): Color | null {
  for (let count of [4, 3, 2, 1]) {
    const diceColors = highValueColors.filter((color) => roll.getCountInColorOrJoker(color) === count);
    if (diceColors.length > 0) return diceColors[0];
  }

  return null;
}


export function trainProbPlayer() {
  const expectedValueTable = getExpectedValueTable();
  console.log('EXPECTED VALUE TABLE', expectedValueTable);
  return new ProbPlayer(expectedValueTable);
}

function getExpectedValueTable() {
  const valuesList = [[4, 3, 2], [4, 3], [4, 2], [4], [3, 2], [3], [2], []];
  const matchingDiceCounts = [4, 3, 2, 1, 0];

  const result: number[][] = [];

  valuesList.forEach((values) => {
    const valuesSet = new Set(values);
    const encodedValues = TileSet.encodeValues(values);
    result[encodedValues] = [];
    matchingDiceCounts.forEach((matchingDice) => {
      result[encodedValues][matchingDice] = getExpectedValue(10000, valuesSet, matchingDice);
    });
  });

  return result;
}

function getExpectedValue(rollCount: number, lengthSet: Set<number>, matchingDice: number) {
  const diceToRoll = 4 - matchingDice;

  let total = 0;
  for (let i = 0; i < rollCount; i += 1) {
    const roll = DiceSet.roll(diceToRoll);
    const additionalMatchingDice = roll.getCountInColorOrJoker('red');
    total += getScore(lengthSet, matchingDice + additionalMatchingDice);
  }

  return total / rollCount;
}

function getScore(lengthSet: Set<number>, matchingDice: number) {
  if (matchingDice >= 4 && lengthSet.has(4)) return 4;
  if (matchingDice >= 3 && lengthSet.has(3)) return 3;
  if (matchingDice >= 2 && lengthSet.has(2)) return 2;
  return 0;
}
