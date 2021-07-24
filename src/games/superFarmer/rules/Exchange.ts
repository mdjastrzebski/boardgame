import { AnimalCount } from './Animal';
import { getTotalValue } from '../simulations/sim1';

/** Checks if given exchange is valid */
export function isValidExchange(exchange: AnimalCount) {
  if (getTotalValue(exchange) !== 0) return false;

  const toBuyCount = getAnimalsToBuyCount(exchange);
  const toSellCount = getAnimalsToSellCount(exchange);

  return (toBuyCount === 0 && toSellCount === 0) || toBuyCount === 1 || toSellCount === 1;
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
