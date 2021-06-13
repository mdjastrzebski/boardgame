import { sum } from '../../../core/array';
import { Animal, valuePerAnimal } from './Animal';
import { Holdings } from './Holdings';
import { GameState } from './GameState';

export type Exchange = {
  sell: Holdings;
  buy: Holdings;
};

/** Checks if given exchange is valid */
export function isValidExchange(game: GameState, exchange: Exchange) {
  if (getHoldingsValue(exchange.sell) !== getHoldingsValue(exchange.buy)) return false;

  return hasEnoughCommonStock(game.common, exchange.buy);
}

function getHoldingsValue(holdings: Holdings) {
  return sum(Object.values(Animal).map((animal) => (holdings[animal] ?? 0) * valuePerAnimal[animal]));
}

function hasEnoughCommonStock(common: Holdings, buy: Holdings) {
  return Object.values(Animal).every((animal) => (common[animal] ?? 0) >= (buy[animal] ?? 0));
}
