/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 8.1 and 8.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const screen = new Array(6).fill('.').map(() => new Array(50).fill('.'));

  const instructions = {
    /**
     * Turns on all pixels in a rectangle
     * at the top-left of the screen.
     *
     * @param {Integer} a - width of rectangle
     * @param {Integer} b - height of rectangle
     */
    rect: (a, b) => {
      for (let i = 0; i < a; ++i) {
        for (let j = 0; j < b; ++j) {
          screen[j][i] = '#';
        }
      }
    },
    /**
     * If rc="row":    Shifts all pixels in row A right by B pixels
     * If rc="column": Shifts all pixels in column A down by B pixels
     *
     * @param {String}  rc - "row" or "column"
     * @param {Integer} a  - row or column number
     * @param {Integer} b  - number of pixels to shift right or left
     */
    rotate: (rc, a, b) => {
      if (rc) { // Row
        for (let i = 0; i < b; ++i) {
          // Save what fell off the right end
          let carry = screen[a][screen[0].length-1];

          // Shift right
          for (let j = screen[0].length-1; j > 0; --j)
            screen[a][j] = screen[a][j-1];

          // Save to left-end of row
          screen[a][0] = carry;
        }
      }
      else { // Column
        for (let i = 0; i < b; ++i) {
          // Save what fell off the bottom end
          let carry = screen[screen.length-1][a];

          // Shift down
          for (let j = screen.length-1; j > 0; --j)
            screen[j][a] = screen[j-1][a];

          // Save to top of column
          screen[0][a] = carry;
        }
      }
    }
  };

  // Parse input
  for (const str of input) {
    const parsedInput = str.split(" ");

    if (parsedInput[0] === "rect") {
      const splitNums = parsedInput[1].split('x');
      instructions[parsedInput[0]](+splitNums[0], +splitNums[1]);
    }
    else {
      instructions[parsedInput[0]](parsedInput[1] === "row", +(parsedInput[2].substring(2)), +parsedInput[4]);
    }
  }

  // Part 1
  let ttlLit = 0;
  screen.forEach(arr => {
    // Add up length of filtered '#' characters
    ttlLit += arr.filter(i => i == '#').length;
  });

  console.log(ttlLit);

  // Part 2
  for (const row of screen)
    console.log(row.join(''));
}
else console.error("Failed to read input.txt");