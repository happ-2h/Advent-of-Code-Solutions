/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 1.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let floor = 0; // Start at floor 0

  while (input.length > 0) {
    /*
      '(' = ascend floor
      ')' = descend floor
     */
    floor = input.shift() == '(' ? floor + 1 : floor - 1;
  }

  console.log(floor);
}
else console.error("Failed to read input.txt");