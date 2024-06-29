/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 14.1
 */

let input = null;

try {
  input = require('fs').readFileSync('../input.txt', 'utf-8').split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  // Parse input
  let parsedInput = [];
  for (const str of input)
    parsedInput.push(str.match(/\d+/g)); // Get reindeer stats [speed, time, rest]

  let maxDist = -1;
  const ttlTime = 2503;

  for (let i = 0; i < parsedInput.length; ++i) {
    // Total seconds flown * speed for x seconds
    let dist = (
      (((ttlTime / (+parsedInput[i][1] + +parsedInput[i][2]))|0)) // How many rest + fly cycles in total time
      * (+parsedInput[i][0] * +parsedInput[i][1]))                // Times by total fly-time coverage
      + (+parsedInput[i][0] *                                     // Plus flight coverage of the remaining time
        Math.min(ttlTime%(+parsedInput[i][1] + +parsedInput[i][2]), +parsedInput[i][1])
    );

    if (dist > maxDist) maxDist = dist;
  }

  console.log(maxDist);
}
else console.error("Failed to read input.txt");