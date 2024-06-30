/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 10.1 and 10.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const bots = [];
  const outputs = [-1, -1, -1]; // Need 0, 1, 2 for part 2
  let found = false; // If we found [61, 17], finish execution

  class Bot {
    #id;    // Bot's number
    #arms;  // Arms[2] holding the chips
            // 0 = low chip, 1 = high chip
    #iLow;  // Instruction of low chip
    #iHigh; // Instruction of high chip

    constructor(id) {
      this.#id    = id;
      this.#arms  = [];
      this.#iLow  = {
        to: null, // Give to bot or output bin
        id: null  // ID of bot or output bin to give
      };
      // Same usage as iLow
      this.#iHigh = { to: null, id: null };
    }

    // Takes chip from bot or input bin
    take(chip) {
      this.#arms.push(chip);
      this.#arms.sort((a, b) => a - b);
    }

    run() {
      // Only run if bot has 2 chips
      if (this.#arms.length == 2) {
        // Part 1
        if (this.#arms[0] == 17 && this.#arms[1] == 61) {
          console.log(this.#id); // Part 1
          // found = true; // Part 1 only; stops execution
        }

        // Give chips to bot or output bin
        if (this.#iHigh.to == "bot")
          bots[this.#iHigh.id].take(this.#arms.pop());
        else
          outputs[this.#iHigh.id] = this.#arms.pop();

        // Give chips to bot or output bin
        if (this.#iLow.to == "bot")
          bots[this.#iLow.id].take(this.#arms.pop());
        else
          outputs[this.#iLow.id] = this.#arms.pop();
      }
    }

    get iLow()  { return this.#iLow;  }
    get iHigh() { return this.#iHigh; }
  };

  for (const str of input) {
    const parsedInput = str.split(" ");

    // bot gives to ...
    if (parsedInput[0] == "bot") {
      if (bots[+parsedInput[1]] === undefined)
        bots[+parsedInput[1]] = new Bot(+parsedInput[1]);

      bots[+parsedInput[1]].iLow.to  = parsedInput[5];
      bots[+parsedInput[1]].iLow.id  = +parsedInput[6];
      bots[+parsedInput[1]].iHigh.to = parsedInput[10];
      bots[+parsedInput[1]].iHigh.id = +parsedInput[11];
    }
    // value goes to ...
    else {
      if (bots[+parsedInput[5]] === undefined)
        bots[+parsedInput[5]] = new Bot(+parsedInput[5]);

      bots[+parsedInput[5]].take(+parsedInput[1]);
    }
  }

  while(!found) {
    for (const bot of bots) bot.run();

    // Requirement for part 2
    if (outputs[0] != -1 && outputs[1] != -1 && outputs[2] != -1) found = true;
  }

  // Part 2
  console.log(outputs[0] * outputs[1] * outputs[2]);
}
else console.error("Failed to read input.txt");