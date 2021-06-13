/**
 * Collection to utils for simualating game state and player & game actions.
 * 
 * Based on standard reducer model: (state, action) => next state
 * 
 */

export type ReducerFunction<State, Action> = (state: State, action: Action) => State;

