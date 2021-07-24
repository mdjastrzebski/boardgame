import { AnimalCount, ZERO_ANIMAL_COUNT } from "../rules";
import { GameState, ObservedGameState, Player } from "../rules/Game";

class NoopPlayer implements Player {
    getExchangeDecision(state: ObservedGameState): AnimalCount {
        return ZERO_ANIMAL_COUNT;
    }
}

function getInitialState(playersCount: number): GameState {

}
