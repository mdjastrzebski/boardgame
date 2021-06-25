import { DiceSet } from '../concepts/Dice';
import { Tile } from '../concepts/Tile';
import { Player } from '../concepts/Player'
import { GameState, getInitialGameState } from '../concepts/Game';
import { BasicPlayer } from '../players/BasicPlayer';
import { BasicV2Player } from '../players/BasicV2Player';
import { TileSet } from '../concepts/TileSet';

const turnsLimit = 100;

export function run() {
  const player = new BasicPlayer();
  const board = new TileSet({ red: [4, 3, 2] });
  const state = {
    ...getInitialGameState(1),
    board,
  };

  simulateRollsDistribution(1000000, state, player);
  simulateRollsDistribution(1000000, state, player);
  simulateRollsDistribution(1000000, state, player);
}

function simulateRollsDistribution(times: number, state: GameState, player: Player) {
  const results = [0, 0, 0, 0, 0];

  for (let i = 0; i < times; i += 1) {
    const tile = getPlayerTileToPick(state, player);
    results[(tile && tile.value) || 0] += 1;
  }

  console.log(`Results: 4s: ${results[4] / times}, 3s: ${results[3] / times}, 2s: ${results[2] / times}, 0s: ${results[0] / times}`);
}

export function getPlayerTileToPick(state: GameState, player: Player): Tile | null {
  // Initial roll
  const roll0 = DiceSet.roll(4);
  const keepers0 = player.getDiceToKeep(state, roll0, 2);

  // First re-roll
  const countToRoll1 = 4 - keepers0.count;
  const roll1 = DiceSet.roll(countToRoll1);
  const result1 = keepers0.addDice(roll1);
  const keepers1 = player.getDiceToKeep(state, result1, 1);

  // Second re-roll
  const countToRoll2 = 4 - keepers1.count;
  const roll2 = DiceSet.roll(countToRoll2);
  const result2 = keepers1.addDice(roll2);

  return player.getBoardTileToPick(state, result2);
}

//run();
