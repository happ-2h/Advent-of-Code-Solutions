/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 4.2
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

    // Sort characters in str and save
    let sortedStr = [];
    for (const i of str)
      sortedStr.push(i.split('').sort().join(''));

    const set = new Set(sortedStr); // Get unique entries

    // If sortedStr contained an anagram, then the passphrase was invalid
    ctr += sortedStr.length == set.size;
  }

  console.log(ctr);
}
else console.error("Failed to read input.txt");