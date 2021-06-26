import { DiceResult } from './DiceResult';
import { GameState } from "./Game";
import { Tile } from './Tile';

export interface Player {
  getDiceToKeep(state: GameState, roll: DiceResult, rerollsLeft: number): DiceResult;
  getBoardTileToPick(state: GameState, finalRoll: DiceResult): Tile | null;
}
