import { stat } from 'fs';
import { findMax } from '../../../core/array';
import { Color } from '../concepts/Color';
import { DiceRoll, emptyDiceRoll, isRollEnoughForColorCount } from '../concepts/Dice';
import { GameState } from '../concepts/Game';
import { Player } from '../concepts/Player';
import { Tile, TILE_VALUES } from '../concepts/Tile';
import { TileSet } from '../concepts/TileSet';

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
    for (const value of TILE_VALUES) {
      const colors = state.board.getColorsForValue(value);
      const matchingRollColors = colors.filter((color) => isRollEnoughForColorCount(finalRoll, color, value));
      if (matchingRollColors.length > 0) {
        const color = findMax(matchingRollColors, (color) => state.board.getTotalValueForColor(color))[0] || 'red';
        return { color, value };
      }
    }

    return null;
  }
}

function pickHighValueBoardColors(board: TileSet): Color[] {
   for (let value of TILE_VALUES) {
     const colors = board.getColorsForValue(value);
     if (colors.length > 0) return colors;
   }

  // Should not happen
  return [];
}

function pickRollColor(board: TileSet, roll: DiceRoll, highValueColors: Color[]): Color | null {
  for (let count of [4, 3, 2, 1]) {
    const matchingDiceColors = highValueColors.filter((color) => roll[color] + roll.joker === count);
    if (matchingDiceColors.length > 0) {
        return findMax(matchingDiceColors, (color) => board.getTotalValueForColor(color))[0];   
    }
  }

  return null;
}