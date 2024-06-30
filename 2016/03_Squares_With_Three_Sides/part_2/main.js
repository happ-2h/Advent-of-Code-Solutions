/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 3.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let possibleTris= 0;
  const sides = []

  // Convert to 2D array
  for (const line of input) {
    const nums = line.match(/(\d+)/g);
    sides.push(nums);
  }

  for (let i = 0, y = 0; i < sides.length / 3; ++i, y+=3) {
    for (let x = 0; x < 3; ++x) {
      // Check for valid triangle vertically
      // - Sum of two sides > remaining side
      if (
        +sides[y][x] + +sides[y+1][x] > +sides[y+2][x] &&
        +sides[y][x] + +sides[y+2][x] > +sides[y+1][x] &&
        +sides[y+1][x] + +sides[y+2][x] > +sides[y][x]
      ) ++possibleTris;
    }
  }

  console.log(possibleTris);
}
else console.error("Failed to read input.txt");