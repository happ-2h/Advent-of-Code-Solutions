/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 20.1 and 20.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const ranges = [];

  // Parse input
  for (const str of input)
    ranges.push(str.split("-"));

  ranges.sort((a, b) => +a[0] - +b[0]);

  // Part 1
  let lowest = 0;

  for (let i = 0; i < ranges.length; ++i) {
    // Found an IP not within any range
    if (lowest < +ranges[i][0]) break;
    // Otherwise new lowest IP is end-of-range + 1
    lowest = +ranges[i][1]+1;
  }

  // Part 2
  let currIP = 0;
  let ctr = 0;

  for (let i = 0; i < ranges.length; ++i) {
    // Current IP is not in any range
    if (+ranges[i][0] > currIP)
      // Add up total IPs from current IP to start of next range
      ctr += (+ranges[i][0] - currIP) - 1;
    // Get next largest IP to test
    currIP = currIP > +ranges[i][1] ? currIP : +ranges[i][1];
  }

  console.log(lowest); // Part 1
  console.log(ctr);    // Part 2
}
else console.error("Failed to read input.txt");