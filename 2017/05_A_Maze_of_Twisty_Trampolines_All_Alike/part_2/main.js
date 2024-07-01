/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 5.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let steps = 0; // Steps to reach the exit
  let pc    = 0; // Program Counter
  let curr  = 0; // Preserve current value

  while(pc < input.length) {
    curr = +input[pc];

    // If offset >= three, decrease it by 1
    if (+input[pc] >= 3) --input[pc];
    // Otherwise, increase it by 1
    else ++input[pc];

    pc += curr;

    ++steps;
  }

  console.log(steps);
}
else console.error("Failed to read input.txt");