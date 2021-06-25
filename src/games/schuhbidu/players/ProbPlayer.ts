import { findMax } from '../../../core/array';
import { Color, colors } from '../concepts/Color';
import { DiceRoll, emptyDiceRoll, getDiceInColorOrJoker, isRollEnoughForColorCount, rollDice } from '../concepts/Dice';
import { GameState } from '../concepts/Game';
import { Player } from '../concepts/Player';
import { Tile, TileSet, tileLengthsFromHighest, getColorsWithLength } from '../concepts/Tile';
import { encodeTileLengthSet } from '../utils/encode';

export class ProbPlayer implements Player {
  expectedValueTable: number[][];

  constructor(expectedValueTable: number[][]) {
      this.expectedValueTable = expectedValueTable;
  }

  getDiceToKeep(state: GameState, roll: DiceRoll, rerollsLeft: number): DiceRoll {
    if (rerollsLeft === 1) {
        const [bestColor] = findMax(colors, (color) => {
            const encodedLengths = encodeTileLengthSet(state.board[color]);
            const matchingDice = getDiceInColorOrJoker(roll, color);
            return this.expectedValueTable[encodedLengths][matchingDice];
        });

        // Should not happen
        if (bestColor == null) return emptyDiceRoll;
        
        return {
          ...emptyDiceRoll,
          [bestColor]: roll[bestColor],
          joker: roll.joker,
        };
    }

    const highValueColors = pickHighValueBoardColors(state.board);
    const color = pickRollColor(roll, highValueColors);

    if (color == null) return emptyDiceRoll;

    return {
      ...emptyDiceRoll,
      [color]: roll[color],
      joker: roll.joker,
    };
  }

  getBoardTileToPick(state: GameState, finalRoll: DiceRoll): Tile | null {
    for (let length of tileLengthsFromHighest) {
      const colors = getColorsWithLength(state.board, length);
      const matchingRolls = colors.filter((color) => isRollEnoughForColorCount(finalRoll, color, length));
      if (matchingRolls.length > 0) return { color: matchingRolls[0], length };
    }

    return null;
  }
}

function pickHighValueBoardColors(board: TileSet): Color[] {
  for (let length of tileLengthsFromHighest) {
    const colors = getColorsWithLength(board, length);
    if (colors.length > 0) return colors;
  }

  return [];
}

function pickRollColor(roll: DiceRoll, highValueColors: Color[]): Color | null {
  for (let count of [4, 3, 2, 1]) {
    const diceColors = highValueColors.filter((color) => roll[color] + roll.joker === count);
    if (diceColors.length > 0) return diceColors[0];
  }

  return null;
}

export function trainProbPlayer() {
    const expectedValueTable = getExpectedValueTable();
    console.log("EXPECTED VALUE TABLE", expectedValueTable);
    return new ProbPlayer(expectedValueTable);
}

function getExpectedValueTable() {
    const lengthSets = ([[4,3,2], [4,3], [4,2], [4], [3, 2], [3], [2], []]);
    const matchingDiceCounts = [4, 3, 2, 1, 0];

    const result: number[][] = [];

    lengthSets.forEach((lengthSet) => {
        const set = new Set(lengthSet);
        const encodedLengthSet = encodeTileLengthSet(new Set(lengthSet))
        result[encodedLengthSet] = [];
        matchingDiceCounts.forEach((matchingDice) => {
            result[encodedLengthSet][matchingDice] = getExpectedValue(100000, set, matchingDice);
        });
    });

    return result;
}

function getExpectedValue(rollCount: number, lengthSet: Set<number>, matchingDice: number) {
    const diceToRoll = 4 - matchingDice;

    let total = 0;
    for (let i = 0; i < rollCount; i += 1) {
        const roll = rollDice(diceToRoll);
        const additionalMatchingDice = getDiceInColorOrJoker(roll, 'red');
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