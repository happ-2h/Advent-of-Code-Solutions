/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 12.1 and 12.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  // Part 1
  console.log(
    input.match(/-?\d+/g)          // Get all digits and '-' for negatives
      .reduce((a, b) => a + +b, 0) // Sum everything in the array
  );

  // Part 2
  const parsedInput = JSON.parse(input, (key, val) => {
    if (Array.isArray(val)) return val; // Ignore arrays

    // Otherwise, check for "red" in object's value and
    // return an empty object if present, or the initial object if not
    return Object.keys(val).map(key => val[key]).indexOf("red") !== -1 ? {} : val;
  });

  console.log(
    JSON.stringify(parsedInput)    // Convert back to string
      .match(/-?\d+/g)             // Get all digits and '-' for negatives
      .reduce((a, b) => a + +b, 0) // Sum everything in the array
  );
}
else console.error("Failed to read input.txt");