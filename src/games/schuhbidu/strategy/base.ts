import { findMax } from "../../../core/array";
import { colors } from "../concepts/Color";
import { DiceRollStats } from "../concepts/Dice";

export type DiceRollResponse = Partial<DiceRollStats>;

export function getDiceToKeep(stats: DiceRollStats): DiceRollResponse {
  const [bestColor] = findMax(colors, (color) => stats[color]);

  if (bestColor == null) return stats;

  return {
    [bestColor]: stats[bestColor],
    joker: stats.joker,
  };
} 
