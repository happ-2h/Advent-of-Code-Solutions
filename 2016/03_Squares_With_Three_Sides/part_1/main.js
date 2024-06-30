/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 3.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let possibleTris = 0;

  for (const line of input) {
    const sides = line.match(/(\d+)/g);

    // Check for valid triangle
    // - Sum of two sides > remaining side
    if (
      (+sides[0] + +sides[1]) > +sides[2] &&
      (+sides[0] + +sides[2]) > +sides[1] &&
      (+sides[1] + +sides[2]) > +sides[0]
    ) ++possibleTris;
  }

  console.log(possibleTris);
}
else console.error("Failed to read input.txt");