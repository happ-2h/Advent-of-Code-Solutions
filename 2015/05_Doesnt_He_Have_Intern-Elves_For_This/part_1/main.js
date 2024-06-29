/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 5.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8")
    .trim().replace(/\r\n|\n|\r/gm, " ").split(" "); // Separate values
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let niceCtr = 0;
  for (const str of input) {
    // At least 3 Vowels
    const vowels = str.match(/[aeiou]/g)?.length >= 3; // Get all vowels then check length

    // 1 letter that appears twice in a row
    const repeated = /([a-z])\1/g.test(str); // Match any character and that same character after

    // Does not contain the strings ab, cd, pq, or xy
    const noContain = !(/(ab|cd|pq|xy)/g.test(str)); // Get the sequence, then logically not the result

    // Combine all results
    if (vowels && repeated && noContain) ++niceCtr;
  }

  console.log(niceCtr);
}
else console.error("Failed to read input.txt");