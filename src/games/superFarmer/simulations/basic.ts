import * as SuperFarmer from "..";

function run() {
  for (let i = 0; i < 10; i += 1) {
    console.log("DICE ROLL", SuperFarmer.rollBothDice());
  }
}

// Run the simulation
run();
