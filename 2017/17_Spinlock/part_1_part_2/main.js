/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 17.1 and 17.2
 */

const input = 344;

const buffer = [0];
let currPos = 0;

// Part 1
for (let i = 1; i <= 2017; ++i) {
  // Get new position with current position offset
  currPos = ((currPos+input) % i) + 1;
  // Save to new position but preserve other values
  buffer.splice(currPos, 0, i);
}

console.log(buffer[currPos+1]);

// Part 2
let val = 0;
for (let i = 2018; i <= 50_000_000; ++i) {
  // Get new position with current position offset
  currPos = ((currPos+input) % i) + 1;
  if (currPos == 1) val = i; // Only need value during state
}

console.log(val);