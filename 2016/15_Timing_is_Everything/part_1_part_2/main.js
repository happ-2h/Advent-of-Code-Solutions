/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 15.1 and 15.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const discs = [];
  class Disc {
    #id;       // Number of disc and position
    #ttlPos;   // Total number of positions
    #startPos; // Position at time = 0
    #currPos;  // Current position at time = x

    constructor(id, ttlPos, startPos) {
      this.#id       = id;
      this.#ttlPos   = ttlPos;
      this.#startPos = startPos;
      this.#currPos  = startPos;
    }

    // Calculate current position at time n
    tick(n) {
      this.#currPos = (this.#startPos + this.#id + n)%this.#ttlPos;
      return this.#currPos;
    }

    get currPos() { return this.#currPos; }
  };

  // Create discs based on input
  for (const str of input) {
    const parsedInput = str.match(/\d+/g);
    discs[+parsedInput[0]] = new Disc(
      +parsedInput[0],
      +parsedInput[1],
      +parsedInput[3]
    );
  }

  // Part 2. Remove for part 1
  discs.push(new Disc(
    discs.length,
    11,
    0
  ));
  // End part 2

  let time  = -1;    // Current time
  let found = false; // Did we find the right time
  let sum   = 1;     // Sum of all disc's current position

  while(!found) {
    sum = 0;
    found = true;
    ++time;

    for (const disc of discs) {
      if (disc === undefined) continue;

      sum += disc?.tick(time);

      // If all discs are at 0
      if (sum !== 0) {
        // We found the right time
        found = false;
        break;
      }
    }
  }

  console.log(time);
}
else console.error("Failed to read input.txt");