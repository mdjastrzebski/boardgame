import * as R from 'ramda';
import * as math from 'mathjs'
import { TileSet, fullTileSet } from '../concepts/Tile';
import { Player } from '../concepts/Player';
import { BasicPlayer } from '../players/BasicPlayer';
import { BasicV2Player } from '../players/BasicV2Player';
import { getGameScores } from './singleGame';
import { trainProbPlayer } from '../players/ProbPlayer';

const turnsLimit = 100;

export function run() {
  console.log('Traing prop player...');
  const basicPlayer = new BasicPlayer();
  const probPlayer = trainProbPlayer();

  console.log('Playing games...');
  const players = [basicPlayer, probPlayer, basicPlayer];
  const initialBoard: TileSet = { ...fullTileSet };

  simulateGames(100000, players, initialBoard);
}

function simulateGames(times: number, players: Player[], initiialBoard: TileSet) {
  const wins = R.times(() => 0, players.length);
  const scores: number[][] = [];

  for (let i = 0; i < times; i += 1) {
      const gameScores = getGameScores(players, initiialBoard);
      const winners = getWinners(gameScores);
      winners.forEach(playerIndex => {
        wins[playerIndex] += 1 / winners.length;
      });
      scores.push(gameScores);
  }

  const [mean, std] = getStats(scores);

  console.log('RESULTS', wins.map(count => count / times));
  console.log('MEAN SCORE', mean);
  console.log('STD SCORE', std);
}

function getWinners(gameScores: number[]): number[] {
  let bestScore = 0;
  let bestPlayers: number[] = [];

  gameScores.forEach((score, index) => {
    if (score > bestScore) {
      bestScore = score;
      bestPlayers = [index];
    } else if (score == bestScore) {
      bestPlayers.push(index);
    }
  });

  return bestPlayers;
}

function getStats(scores: number[][]) {
  const mean = math.mean(scores, 0);
  // @ts-expect-error incorrect parameter type declaration
  const std = math.std(scores, 0);
  return [mean, std];
} 

run()
