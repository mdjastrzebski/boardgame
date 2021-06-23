import { rollDice, getDiceCount, addDiceRolls } from '../concepts/Dice';
import { emptyTileSet, TileSet } from '../concepts/Tile';
import { Player } from '../concepts/Player';
import { BasicPlayer } from '../players/BasicPlayer';
import { GameState, getInitialGameState } from '../concepts/Game';

export function run() {
  const player = new BasicPlayer();
  const board: TileSet = { ...emptyTileSet, red: new Set([4, 3, 2]) };
  const state = {
    ...getInitialGameState(1),
    board
  };

  simulateRollProbability(1000000, state, player);
  simulateRollProbability(1000000, state, player);
  simulateRollProbability(1000000, state, player);
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
  const roll0 = rollDice(4);
  const keepers0 = player.getDiceToKeep(state, roll0, 2);

  // First re-roll
  const countToRoll1 = 4 - getDiceCount(keepers0);
  const roll1 = rollDice(countToRoll1);
  const result1 = addDiceRolls(keepers0, roll1);
  const keepers1 = player.getDiceToKeep(state, result1, 1);

  // Second re-roll
  const countToRoll2 = 4 - getDiceCount(keepers1);
  const roll2 = rollDice(countToRoll2);
  const result2 = addDiceRolls(keepers1, roll2);

  const results = player.getBoardTileToPick(state, result2);

  return results?.length || 0;
}
