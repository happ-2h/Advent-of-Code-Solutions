/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 2.1
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

if(input !== null && convertedInput.length > 0) {
  let totalSqft = 0;

  for (let i = 0; i < convertedInput.length; ++i) {
    // Find surface area 2*l*w + 2*w*h + 2*h*l
    totalSqft += (
      convertedInput[i][0] * convertedInput[i][1] +
      convertedInput[i][1] * convertedInput[i][2] +
      convertedInput[i][2] * convertedInput[i][0]
    ) << 1;

    // Find slack (area of smallest side)
    totalSqft += convertedInput[i][0] * convertedInput[i][1];
  }

  console.log(totalSqft);
}
else console.error("Failed to read input.txt");