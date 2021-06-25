import { DiceSet } from './Dice';
import { GameState } from "./Game";
import { Tile } from './Tile';

export interface Player {
  getDiceToKeep(state: GameState, roll: DiceSet, rerollsLeft: number): DiceSet;
  getBoardTileToPick(state: GameState, finalRoll: DiceSet): Tile | null;
}
