/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 13.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  class Layer {
    #depth;
    #range;
    #scannerPos;
    #scannerDir; // 0 = up
                 // 1 = down

    constructor(depth, range) {
      this.#depth = depth;
      this.#range = range;
      this.#scannerPos = 1;
      this.#scannerDir = 1;
    }

    move() {
      // Move down
      if (this.#scannerDir == 1) {
        ++this.#scannerPos;

        // If scanner is out of bounds, move up 2 times and change direction
        if (this.#scannerPos > this.#range) {
          this.#scannerPos -= 2;
          this.#scannerDir = 0;
        }
      }
      else {
        --this.#scannerPos;

        // If scanner is out of bounds, move down 2 times and change direction
        if (this.#scannerPos < 1) {
          this.#scannerPos += 2;
          this.#scannerDir = 1;
        }
      }
    }

    severity() { return this.#depth * this.#range; }

    get depth() { return this.#depth; }
    get range() { return this.#range; }
    get scannerPos() { return this.#scannerPos; }
  };

  // Array of total layers
  const firewall =
    new Array(+input[input.length-1].split(": ")[0]+1)
    .fill(null);

  for (const str of input) {
    const details = str.split(": ");

    firewall[+details[0]] = new Layer(+details[0], +details[1]);
  }

  let packetPos = 0;
  let ttlSeverity = 0;

  for (let i = 0; i < firewall.length; ++i) {
    // Check if caught
    if (firewall[packetPos]?.scannerPos == 1)
      ttlSeverity += firewall[packetPos].severity();

    for (const l of firewall) l?.move();

    ++packetPos;
  }

  console.log(ttlSeverity);
}
else console.error("Failed to read input.txt");