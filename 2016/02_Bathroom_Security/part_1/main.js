/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 2.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const keypad = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ];

  const pos = { x: 1, y: 1 }; // Position on keypad
  let code = "";              // Final code

  // Go through every character of every sequence
  for (const sequence of input) {
    for (const c of sequence) {
      switch(c) {
        case "U":
          if (pos.y-1 >= 0) --pos.y;
          break;
        case "D":
          if (pos.y+1 < keypad.length) ++pos.y;
          break;
        case "L":
          if (pos.x-1 >= 0) --pos.x;
          break;
        case "R":
          if (pos.x+1 < keypad[0].length) ++pos.x;
          break;
      }
    }

    // Save current key
    code += keypad[pos.y][pos.x];
  }

  console.log(code);
}
else console.error("Failed to read input.txt");