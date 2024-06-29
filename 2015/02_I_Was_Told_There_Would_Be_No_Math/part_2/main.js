/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 2.2
 */

let input = null;
const convertedInput = [];

try {
  input = require('fs').readFileSync("../input.txt", 'utf-8')
    .trim().replace(/\r\n|\n|\r/gm, " ").split(" "); // Separate values

  // Remove 'x' and sort the values for calculating slack
  for (let i = 0; i < input.length; ++i)
    convertedInput.push(input[i].split('x').sort((a, b) => a - b));
} catch (err) {
  console.error(err);
}

if (input !== null && convertedInput.length > 0) {
  let totalFt = 0;

  for (let i = 0; i < convertedInput.length; ++i) {
    // Calculate perimeter of smallest side
    totalFt += (convertedInput[i][0]<<1) + (convertedInput[i][1]<<1);

    // Calculate feet for bow
    totalFt += convertedInput[i][0] * convertedInput[i][1] * convertedInput[i][2];
  }

  console.log(totalFt);
}
else console.error("Failed to read input.txt");