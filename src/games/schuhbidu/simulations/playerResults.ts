import { DiceResult } from '../concepts/DiceResult';
import { Player } from '../concepts/Player';
import { BasicPlayer } from '../players/BasicPlayer';
import { GameState, getInitialGameState } from '../concepts/Game';
import { trainProbPlayer } from '../players/ProbPlayer';
import { TileSet } from '../concepts/TileSet';

export function run() {
  console.log('Traing prop player...');
  const basicPlayer = new BasicPlayer();
  const probPlayer = trainProbPlayer();

  console.log('Results...');
  const board = new TileSet({ red: [4, 3, 2], yellow: [3, 2], blue: [4] });
  const state = {
    ...getInitialGameState(1),
    board,
  };

  simulateRollProbability(1000000, state, probPlayer);
  simulateRollProbability(1000000, state, probPlayer);
  simulateRollProbability(1000000, state, probPlayer);
}

function simulateRollProbability(times: number, state: GameState, player: Player) {
  const results = [0, 0, 0, 0, 0];

  for (let i = 0; i < times; i += 1) {
    const value = getRollsValue(state, player);
    results[value] += 1;
  }

  console.log(`Results: 4s: ${results[4] / times}, 3s: ${results[3] / times}, 2s: ${results[2] / times}, 0s: ${results[0] / times}`);
}

function getRollsValue(state: GameState, player: Player) {
  // Initial roll
  const roll0 = DiceResult.roll(4);
  const keepers0 = player.getDiceToKeep(state, roll0, 2);

  // First re-roll
  const countToRoll1 = 4 - keepers0.count;
  const roll1 = DiceResult.roll(countToRoll1);
  const result1 = keepers0.addDice(roll1);
  const keepers1 = player.getDiceToKeep(state, result1, 1);

  // Second re-roll
  const countToRoll2 = 4 - keepers1.count;
  const roll2 = DiceResult.roll(countToRoll2);
  const result2 = keepers1.addDice(roll2);

  const results = player.getBoardTileToPick(state, result2);

  return (results && results.value) || 0;
}

run();