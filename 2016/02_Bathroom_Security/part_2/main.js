/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 2.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const keypad = [
    ['0', '0', '1', '0', '0'],
    ['0', '2', '3', '4', '0'],
    ['5', '6', '7', '8', '9'],
    ['0', 'A', 'B', 'C', '0'],
    ['0', '0', 'D', '0', '0'],
  ];

  const pos = { x: 0, y: 2 }; // Position on keypad. Start at '5'
  let code = "";              // Final code

  // Go through every character of every sequence
  for (const sequence of input) {
    for (const c of sequence) {
      switch(c) {
        case "U":
          if (
            pos.y-1 >= 0 &&
            keypad[pos.y-1][pos.x] != '0' // Not outside "diamond" bounds
          ) --pos.y;
          break;
        case "D":
          if (
            pos.y+1 < keypad.length &&
            keypad[pos.y+1][pos.x] != '0' // Not outside "diamond" bounds
          ) ++pos.y;
          break;
        case "L":
          if (
            pos.x-1 >= 0 &&
            keypad[pos.y][pos.x-1] != '0' // Not outside "diamond" bounds
          ) --pos.x;
          break;
        case "R":
          if (
            pos.x+1 < keypad[0].length &&
            keypad[pos.y][pos.x+1] != '0' // Not outside "diamond" bounds
          ) ++pos.x;
          break;
      }
    }

    // Save current key
    code += keypad[pos.y][pos.x];
  }

  console.log(code);
}
else console.error("Failed to read input.txt");