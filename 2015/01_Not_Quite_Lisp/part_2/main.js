/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 1.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let floor = 0; // Start at floor 0

  for (let i = 0; i < input.length; ++i) {
    /*
      '(' = ascend floor
      ')' = descend floor
     */
    floor = input.shift() == '(' ? floor + 1 : floor - 1;

    // If we hit the basement (-1), we found the position
    if (floor < 0) {
      console.log(i+1); // Position starts at 1
      break;
    }
  }
}
else console.error("Failed to read input.txt");