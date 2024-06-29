/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 6.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("\n");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  // Array of lights
  const lights = new Uint8Array(1000*1000);

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
        const i = x+y*1000; // 2D index as 1D

        // Increase brightness
        if (cmd === "on")
          ++lights[i];

        // Decrease the brightness with minimum of 0
        else if (cmd === "off")
          lights[i] = lights[i] == 0 ? 0 : lights[i] - 1;

        // Increase brightness by 2
        else if (cmd === "toggle")
          lights[i] += 2;

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

  // Add up every brightness value
  let ctr = 0;
  for (let i = 0; i < lights.length; ++i)
    ctr += lights[i];

  // Print result
  console.log(ctr);
}
else console.error("Failed to read input.txt");