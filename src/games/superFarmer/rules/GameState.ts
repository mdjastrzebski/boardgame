import { Holdings } from './Holdings';

export type GameState = {
  common: Holdings;
  player: Holdings;
};

export type ObservedGameState = {
  own: Holdings;
  common: Holdings;
};

export const initialCommonState: Holdings = {
  rabbit: 60,
  sheep: 24,
  pig: 20,
  cow: 12,
  horse: 6,
  smallDog: 4,
  largeDog: 2,
};

export const initialPlayerState: Holdings = {
  rabbit: 0,
  sheep: 0,
  pig: 0,
  cow: 0,
  horse: 0,
  smallDog: 0,
  largeDog: 0,
};

export function getInitialGameState() {
  return {
    common: initialCommonState,
    player: initialPlayerState,
  };
}

export function getObservedGameState(state: GameState) {
  return {
    own: state.player,
    common: state.common,
  };
}
