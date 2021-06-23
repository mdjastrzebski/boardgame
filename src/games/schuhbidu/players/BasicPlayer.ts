import { Color } from '../concepts/Color';
import { DiceRoll, emptyDiceRoll, isRollEnoughForColorCount } from '../concepts/Dice';
import { GameState } from '../concepts/Game';
import { Player } from '../concepts/Player';
import { Tile, TileSet, tileLengthsFromHighest, getColorsWithLength } from '../concepts/Tile';

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
