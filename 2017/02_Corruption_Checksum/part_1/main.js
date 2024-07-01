/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 2.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let ttl = 0;

  // Find difference of largest and smallest values and total their values up
  for (const str of input) {
    const vals = str.split('\t');
    ttl += Math.max(...vals) - Math.min(...vals);
  }

  console.log(ttl);
}
else console.error("Failed to read input.txt");