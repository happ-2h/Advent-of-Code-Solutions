/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 5.2
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
    // Contains pair of any two letters that appears at least twice in the string without overlapping
    const pair = /([a-z]{2})[a-z]*\1/g.test(str); // Get 2 a-z characters, allow anything after, match the first group after to prevent overlap

    // Contains at least one letter which repeats with exactly one letter between them
    const repeat = /([a-z])[a-z]\1/g.test(str); // Match a character, allow any character after, and must contain the first character after

    // Combine all results
    if (pair && repeat) ++niceCtr;
  }

  console.log(niceCtr);
}
else console.error("Failed to read input.txt");