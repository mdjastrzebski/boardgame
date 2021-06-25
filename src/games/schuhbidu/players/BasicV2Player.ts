import { findMax } from '../../../core/array';
import { sum } from '../../../core/set';
import { Color } from '../concepts/Color';
import { DiceRoll, emptyDiceRoll, isRollEnoughForColorCount } from '../concepts/Dice';
import { GameState } from '../concepts/Game';
import { Player } from '../concepts/Player';
import { Tile, TileSet, tileLengthsFromHighest, getColorsWithLength } from '../concepts/Tile';

export class BasicV2Player implements Player {
  getDiceToKeep(state: GameState, roll: DiceRoll, rerollsLeft: number): DiceRoll {
    const highValueColors = pickHighValueBoardColors(state.board);
    const color = pickRollColor(state.board, roll, highValueColors);

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
      const matchingRollColors = colors.filter((color) => isRollEnoughForColorCount(finalRoll, color, length));
      if (matchingRollColors.length > 0) {
        const color = findMax(matchingRollColors, (color) => getColorValue(state.board, color))[0] || 'red';
        return { color, length };
      }
        
    }

    return null;
  }
}

function pickHighValueBoardColors(board: TileSet): Color[] {
  for (let length of tileLengthsFromHighest) {
    const colors = getColorsWithLength(board, length);
    if (colors.length > 0) return colors;
  }

  // Should not happen
  return [];
}

function pickRollColor(board: TileSet, roll: DiceRoll, highValueColors: Color[]): Color | null {
  for (let count of [4, 3, 2, 1]) {
    const matchingDiceColors = highValueColors.filter((color) => roll[color] + roll.joker === count);
    if (matchingDiceColors.length > 0) {
        return findMax(matchingDiceColors, (color) => getColorValue(board, color))[0];   
    }
  }

  return null;
}

function getColorValue(tiles: TileSet, color: Color) {
    return sum(tiles[color]);
}
