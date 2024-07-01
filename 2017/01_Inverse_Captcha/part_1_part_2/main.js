/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 1.1 and 1.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let ttl = 0;
  let offset = input.length>>1; // Part 1: change to = 1

  // Check if consecutive integers are the same and add to total
  // Circular checking: out-of-bounds checks wrap around
  for(let i = 0; i < input.length; ++i)
    if (input[i] == input[(i+offset)%input.length]) ttl += +input[i];

  console.log(ttl);
}
else console.error("Failed to read input.txt");