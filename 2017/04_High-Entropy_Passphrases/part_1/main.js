/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 4.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let ctr = 0;
  for (let str of input) {
    str = str.split(' ');
    const set = new Set(str); // Get unique entries

    // If entries removed, then passphrase contained duplicate words
    ctr += str.length == set.size;
  }

  console.log(ctr);
}
else console.error("Failed to read input.txt");