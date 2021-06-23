import * as R from 'ramda';
import { setWithAddedElement, setWithoutElement } from '../../../core/set';
import { Tile, TileSet, emptyTileSet, fullTileSet, isTileSetEmpty, getTilesScore } from './Tile';

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
    board: { ...fullTileSet },
    players: R.times(() => ({ ...emptyTileSet }), playerCount),
    currentPlayer: 0,
  };
}

export function isGameFinished(state: GameState): boolean {
  return isTileSetEmpty(state.board);
}

export function getPlayersScores(state: GameState): number[] {
  return state.players.map(player => getTilesScore(player))
}

export function gameStateReducer(state: GameState, playerIndex: number, tileToPick: Tile | null): GameState {
  if (!tileToPick) return state;

  const { board, players, currentPlayer } = state;
  const { color, length } = tileToPick;
  const newBoard = { ...board, [color]: setWithoutElement(board[color], length) };
  
  let newPlayers = [...players];
  const player = players[currentPlayer];
  newPlayers[currentPlayer] = { ...players[currentPlayer], [color]: setWithAddedElement(player[color], length) };

  return {
    board: newBoard,
    players: newPlayers,
    currentPlayer: (currentPlayer + 1) % players.length,
  }
}