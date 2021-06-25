import { TileSet, fullTileSet } from '../concepts/Tile';
import { Player } from '../concepts/Player';
import { BasicPlayer } from '../players/BasicPlayer';
import { BasicV2Player } from '../players/BasicV2Player';
import { trainProbPlayer } from '../players/ProbPlayer';
import { gameStateReducer, getInitialGameState, getPlayersScores, isGameFinished } from '../concepts/Game';
import { getPlayerTileToPick } from './playerTileToPick';


const turnsLimit = 100;

export function run() {
  console.log("Traing prop player...");
  const probPlayer = trainProbPlayer();

  console.log("Playing game...")
  const players = [probPlayer, new BasicPlayer()];
  const initialBoard: TileSet = { ...fullTileSet };

  const scores = getGameScores(players, initialBoard);
  console.log('GAME SCORES', scores);  
}

export function getGameScores(players: Player[], initialBoard: TileSet): number[] {
  let state = {
    ...getInitialGameState(players.length),
    board: initialBoard,
  };

  for (let turn = 0; turn < turnsLimit; turn += 1) {
    if (isGameFinished(state)) return getPlayersScores(state);

    for (let playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      const currentPlayer = players[playerIndex];
      const tileToPick = getPlayerTileToPick(state, currentPlayer);
      state = gameStateReducer(state, playerIndex, tileToPick);
    }
  }

  return getPlayersScores(state);
}

