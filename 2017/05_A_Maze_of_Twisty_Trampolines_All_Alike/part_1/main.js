/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 5.1
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

  while(pc < input.length) {
    pc += +input[pc]++; // After jump, increase the offset
    ++steps;
  }

  console.log(steps);
}
else console.error("Failed to read input.txt");