import * as R from 'ramda';
import { Tile } from './Tile';
import { TileSet } from './TileSet';

/**
 * Type representing current game state.
 *
 * In this game all state is observable by players.
 */
export type GameState = {
  board: TileSet;
  players: TileSet[];
  currentPlayer: number;
};

export function getInitialGameState(playerCount: number): GameState {
  return {
    board: TileSet.complete,
    players: R.times(() => TileSet.empty, playerCount),
    currentPlayer: 0,
  };
}

export function isGameFinished(state: GameState): boolean {
  return state.board.isEmpty();
}

export function getPlayersScores(state: GameState): number[] {
  return state.players.map(player => player.getTotalValue())
}

export function gameStateReducer(state: GameState, playerIndex: number, tileToPick: Tile | null): GameState {
  if (!tileToPick) return state;

  const newBoard = state.board.removeTile(tileToPick.color, tileToPick.value);
  
  const newPlayers = [...state.players];
  newPlayers[playerIndex] = state.players[playerIndex].addTile(tileToPick.color, tileToPick.value);
  
  return {
    board: newBoard,
    players: newPlayers,
    currentPlayer: (playerIndex + 1) % state.players.length,
  };
}