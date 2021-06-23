import * as R from 'ramda';
import { TileSet, fullTileSet } from '../concepts/Tile';
import { Player } from '../concepts/Player';
import { BasicPlayer } from '../players/BasicPlayer';
import { getGameScores } from './singleGame';

const turnsLimit = 100;

export function run() {
  const players = [new BasicPlayer(), new BasicPlayer(), new BasicPlayer()];
  const initialBoard: TileSet = { ...fullTileSet };

  simulateGames(100000, players, initialBoard);
}

function simulateGames(times: number, players: Player[], initiialBoard: TileSet) {
  const wins = R.times(() => 0, players.length);

  for (let i = 0; i < times; i += 1) {
      const scores = getGameScores(players, initiialBoard);
      const winners = getWinners(scores);
      winners.forEach(playerIndex => {
        wins[playerIndex] += 1 / winners.length;
      });
  }

  console.log('RESULTS', wins.map(count => count / times));
}

function getWinners(scores: number[]): number[] {
  let bestScore = 0;
  let bestPlayers: number[] = [];

  scores.forEach((score, index) => {
    if (score > bestScore) {
        bestScore = score;
        bestPlayers = [index]; 
    } else if (score == bestScore) {
        bestPlayers.push(index);
    }
  });

  return bestPlayers;
}

run()
