import { sum } from '../../../core/array';
import { Animal, AnimalCount, valuePerAnimal } from './Animal';
import { Holdings } from './Holdings';
import { GameState } from './GameState';
import { getTotalValue } from '../simulations/sim1';

/** Checks if given exchange is valid */
export function isValidExchange(exchange: AnimalCount) {
  return getTotalValue(exchange) && (getAnimalsToBuyCount(exchange) === 1 || getAnimalsToSellCount(exchange) === 1);
}

function getAnimalsToBuyCount(exchange: AnimalCount) {
  return Object.values(exchange)
    .filter((animal) => animal > 0)
    .reduce((total, count) => total + count);
}

function getAnimalsToSellCount(exchange: AnimalCount) {
  return -Object.values(exchange)
    .filter((animal) => animal < 0)
    .reduce((total, count) => total + count);
}
