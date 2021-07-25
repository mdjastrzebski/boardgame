import { buildArray } from '../../../core/array';
import {
  addAnimalCounts,
  AnimalCount,
  DiceRoll,
  rollDice,
  subtractAnimalCount,
  TOTAL_ANIMAL_COUNT,
  ZERO_ANIMAL_COUNT,
  GameState,
  ObservedGameState,
  Player,
  getGameStateLogData,
  getObservedGameStateLogData,
  getAnimalCountLogData,
  getDiceRollLogData,
} from '../rules';

class BasicPlayer implements Player {
  getExchangeDecision({ ownHoldings, board }: ObservedGameState): AnimalCount {
    if (ownHoldings.rabbit >= 27 && ownHoldings.dogSmall === 0) {
      return {
        ...ZERO_ANIMAL_COUNT,
        dogSmall: 1,
        rabbit: -6,
      };
    }

    if (ownHoldings.cow >= 3 && board.horse >= 1) {
      return {
        ...ZERO_ANIMAL_COUNT,
        horse: 1,
        cow: -2,
      };
    }

    if (ownHoldings.pig >= 4 && board.cow >= 1) {
      return {
        ...ZERO_ANIMAL_COUNT,
        cow: 1,
        pig: -3,
      };
    }

    if (ownHoldings.sheep >= 3 && board.pig >= 1) {
      return {
        ...ZERO_ANIMAL_COUNT,
        pig: 1,
        sheep: -2,
      };
    }

    if (ownHoldings.rabbit >= 6 && ownHoldings.rabbit / 2 > board.rabbit && board.sheep >= 1) {
      return {
        ...ZERO_ANIMAL_COUNT,
        sheep: 1,
        rabbit: -6,
      };
    }

    return ZERO_ANIMAL_COUNT;
  }
}

function getInitialState(playersCount: number): GameState {
  const playersHoldings = buildArray(playersCount, () => ({ ...ZERO_ANIMAL_COUNT }));
  const board = { ...TOTAL_ANIMAL_COUNT };

  return {
    playersHoldings,
    board,
  };
}

function getObservedGameState(state: GameState, playerIndex: number): ObservedGameState {
  const { playersHoldings, board } = state;
  const beforeCurrenPlayer = playersHoldings.slice(0, playerIndex);
  const afterCurrentPlayer = playersHoldings.slice(playerIndex + 1);

  return {
    ownHoldings: playersHoldings[playerIndex],
    othersHoldings: [...afterCurrentPlayer, ...beforeCurrenPlayer],
    board,
  };
}

function isWinner(playerHoldings: AnimalCount) {
  return playerHoldings.rabbit > 0 && playerHoldings.sheep > 0 && playerHoldings.pig > 0 && playerHoldings.cow > 0 && playerHoldings.horse > 0;
}

function applyTransfer(state: GameState, playerIndex: number, transfer: AnimalCount): GameState {
  const newPlayerHolding = addAnimalCounts(state.playersHoldings[playerIndex], transfer);
  const newBoard = subtractAnimalCount(state.board, transfer);

  const newPlayerHoldings = [...state.playersHoldings];
  newPlayerHoldings[playerIndex] = newPlayerHolding;

  return {
    playersHoldings: newPlayerHoldings,
    board: newBoard,
  };
}

function getDiceRollTransfer(roll: DiceRoll, holdings: AnimalCount, board: AnimalCount) {
  const result = { ...ZERO_ANIMAL_COUNT };

  if (roll.horse) {
    result.horse = getPairCountWithLimit(roll.horse + holdings.horse, board.horse);
  }

  if (roll.wolf && !holdings.dogLarge) {
    result.cow = -holdings.cow;
    result.pig = -holdings.pig;
    result.sheep = -holdings.sheep;
  } else {
    if (roll.wolf) result.dogLarge = -1;
    if (roll.cow) result.cow = getPairCountWithLimit(roll.cow + holdings.cow, board.cow);
    if (roll.pig) result.pig = getPairCountWithLimit(roll.pig + holdings.pig, board.pig);
    if (roll.sheep) result.sheep = getPairCountWithLimit(roll.sheep + holdings.sheep, board.sheep);
  }

  if (roll.fox && !holdings.dogSmall) {
    result.rabbit = -holdings.rabbit;
  } else {
    if (roll.fox) result.dogSmall = -1;
    if (roll.rabbit) result.rabbit = getPairCountWithLimit(roll.rabbit + holdings.rabbit, board.rabbit);
  }

  return result;
}

function getPairCountWithLimit(count: number, limit: number): number {
  const pairsCount = Math.floor(count / 2);
  return Math.min(pairsCount, limit);
}

function playGame(players: Player[], enableLogging: boolean): number | null {
  const log = enableLogging ? (...args: any[]) => console.log(...args) : () => {};

  const turnLimit = 200;

  let state = getInitialState(players.length);
  log('Game initialized', getGameStateLogData(state));

  for (let turn = 0; turn < turnLimit; turn += 1) {
    for (let playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      log(`Turn ${turn + 1}, Player ${playerIndex + 1}`);

      const player = players[playerIndex];
      const observedState = getObservedGameState(state, playerIndex);
      log('  Observed state', getObservedGameStateLogData(observedState));

      const exchangeTransfer = player.getExchangeDecision(observedState);
      log('  Exchange transfer', getAnimalCountLogData(exchangeTransfer));

      state = applyTransfer(state, playerIndex, exchangeTransfer);
      if (isWinner(state.playersHoldings[playerIndex])) {
        log(`WINNER player ${playerIndex + 1}`);
        return playerIndex;
      }

      const roll = rollDice();
      const rollTransfer = getDiceRollTransfer(roll, state.playersHoldings[playerIndex], state.board);
      log('  Roll', getDiceRollLogData(roll), getAnimalCountLogData(rollTransfer));

      state = applyTransfer(state, playerIndex, rollTransfer);
      if (isWinner(state.playersHoldings[playerIndex])) {
        log(`WINNER player ${playerIndex + 1}`);
        return playerIndex;
      }

      log ("  Game state", getGameStateLogData(state));
    }
  }

  log(`DRAW`);
  return null;
}

const basicPlayer = new BasicPlayer();
playGame([basicPlayer, basicPlayer], true);
