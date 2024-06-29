/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 14.2
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

  // Get distance at particular time
  const distAtTime = (time, speed, flyTime, rest) => {
    return ((time / ((flyTime + rest))|0) * (speed * flyTime)) +
      (speed * Math.min(time%(flyTime + rest), flyTime));
  }

  const ttlTime = 2503;
  const points = new Array(parsedInput.length).fill(0); // Holds points of each reindeer
  const times  = new Array(parsedInput.length).fill(0); // Holds times at x second(s) of each reindeer

  for (let i = 1; i <= ttlTime; ++i) {
    let bestTime = 0;

    // Find best time
    for (let j = 0; j < parsedInput.length; ++j) {
      const dist = distAtTime(i, +parsedInput[j][0], +parsedInput[j][1], +parsedInput[j][2]);
      times[j] = dist;
      if (bestTime < dist) bestTime = dist;
    }

    // Apply points
    for (let j = 0; j < parsedInput.length; ++j)
      if (times[j] == bestTime) ++points[j];
  }

  console.log(points.sort((a,b)=> b-a)[0]);
}
else console.error("Failed to read input.txt");