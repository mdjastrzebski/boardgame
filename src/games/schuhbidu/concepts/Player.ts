import { DiceRoll } from './Dice';
import { GameState } from "./Game";
import { Tile } from './Tile';

export interface Player {
  getDiceToKeep(state: GameState, roll: DiceRoll, rerollsLeft: number): DiceRoll;
  getBoardTileToPick(state: GameState, finalRoll: DiceRoll): Tile | null;
}
