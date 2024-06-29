/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 6.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("\n");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  /*
    1 light = 1 bit
    Each index has 8 lights
  */
  const lights = new Uint8Array((1000*1000)>>3);

  /**
   * Executes the given instruction
   *
   * @param {String}         cmd: command to execute [on | off | toggle]
   * @param {Array: Integer} p1:  starting point/coordinates (x, y)
   * @param {Array: Integer} p2:  ending point/coordinates (x, y)
   */
  const execute = (cmd, p1, p2) => {
    for (let x = +p1[0]; x <= +p2[0]; ++x) {
      for (let y = +p1[1]; y <= +p2[1]; ++y) {
        const bit = x+y*1000; // 2D index as 1D

        // Turn on a light; do nothing if it's already on
        if (cmd === "on")
          lights[bit>>3] |= (1<<(7-bit&0x7));

        // Turn off a light; do nothing if it's already off
        else if (cmd === "off") {
          const mask = 0xFF ^ (1<<(7-bit&0x7)); // Manual unsigned flipping (NOT)
          lights[bit>>3] &= mask;
        }

        // Turn on a light if it's off; turn off a light if it's on
        else if (cmd === "toggle")
          lights[bit>>3] ^= (1<<(7-bit&0x7));

        else console.error(`Unknown command ${cmd}`);
      }
    }
  };

  // Parse input
  for (const str of input) {
    const instr = str.split(" ");

    // Get command
    switch(instr[0].toLowerCase()) {
      case "turn":
        execute(instr[1].toLowerCase(), instr[2].split(","), instr[4].split(","));
        break;
      case "toggle":
        execute(instr[0].toLowerCase(), instr[1].split(","), instr[3].split(","));
        break;
      default: console.error(`Unrecognized command ${instr[0]}`); break;
    }
  }

  // Count bits
  let nBits = 0;
  for (let i = 0; i < lights.length; ++i) {
    for (; lights[i]; lights[i] >>= 1) {
      nBits += lights[i] & 1;
    }
  }

  // Print result
  console.log(nBits);
}
else console.error("Failed to read input.txt");