/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 19.1 and 19.2
 */

const input = 3012210;

/**
 * Placing the MSB to the start
 * of the binary representation
 * gives us the solution.
 *
 * Credit: @numberfile https://www.youtube.com/watch?v=uCsD3ZGzMgE
 */
// Part 1
console.log(parseInt(
  input.toString(2).slice(1) +   // Remove MSB
  input.toString(2).slice(0, 1), // Append MSB
  2
));

// Part 2
let currElf = 1;

// Skipping halves and checking for balances
for (let i = 1; i < input; ++i) {
  currElf = currElf%i+1;
  if (currElf > (i+1)>>1) ++currElf;
}

console.log(currElf);