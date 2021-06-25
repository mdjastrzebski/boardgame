import { Color } from '../concepts/Color';
import { DiceRoll, emptyDiceRoll, isRollEnoughForColorCount } from '../concepts/Dice';
import { GameState } from '../concepts/Game';
import { Player } from '../concepts/Player';
import { Tile, TILE_VALUES } from '../concepts/Tile';
import { TileSet } from '../concepts/TileSet';

export class BasicPlayer implements Player {
  getDiceToKeep(state: GameState, roll: DiceRoll, rerollsLeft: number): DiceRoll {
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
    for (const value of TILE_VALUES) {
      const colors = state.board.getColorsForValue(value);
      const matchingRolls = colors.filter((color) => isRollEnoughForColorCount(finalRoll, color, value));
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

function pickRollColor(roll: DiceRoll, highValueColors: Color[]): Color | null {
  for (let count of [4, 3, 2, 1]) {
    const diceColors = highValueColors.filter((color) => roll[color] + roll.joker === count);
    if (diceColors.length > 0) return diceColors[0];
  }

  return null;
}
