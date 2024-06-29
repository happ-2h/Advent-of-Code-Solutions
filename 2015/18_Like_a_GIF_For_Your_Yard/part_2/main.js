/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2015 Day 18.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").match(/./g);
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const width = 100; // Width of given grid

  // Turn on four corners
  input[0] = '#';
  input[99] = '#';
  input[99*width] = '#';
  input[99+99*width] = '#';

  let prev = [...input]; // Previous animated frame
  let next = [...prev];  // Next animation buffer

  const step = () => {
    prev = [...next];

    for (let y = 0; y < width; ++y) {
      for (let x = 0; x < width; ++x) {
        // Check neighbors
        let neighbors = 0;

        // If it's a corner, we don't change its state
        if (
          (x == 0  && y == 0)  || // Top left
          (x == 99 && y == 0)  || // Top right
          (x == 0  && y == 99) || // Bottom left
          (x == 99 && y == 99)    // Bottom right
        )  continue;

        /*
         * If direction is in bounds and
         * that neighbor is on,
         * increment "neighbors"
         */
        // - NW
        if (
          y-1 >= 0 && x-1 >= 0 &&
          prev[(x-1)+((y-1)*width)] == '#'
        ) ++neighbors;
        // - N
        if (
          y-1 >= 0 &&
          prev[x+((y-1)*width)] == '#'
        ) ++neighbors;
        // - NE
        if (
          y-1 >= 0 && x+1 < width &&
          prev[(x+1)+((y-1)*width)] == '#'
        ) ++neighbors;
        // - W
        if (
          x-1 >= 0 &&
          prev[(x-1)+y*width] == '#'
        ) ++neighbors;
        // - E
        if (
          x+1 < width &&
          prev[(x+1)+y*width] == '#'
        ) ++neighbors;
        // - SW
        if (
          y+1 < width && x-1 >= 0 &&
          prev[(x-1)+((y+1)*width)] == '#'
        ) ++neighbors;
        // - S
        if (
          y+1 < width &&
          prev[x+(y+1)*width] == '#'
        ) ++neighbors;
        // - SE
        if (
          y+1 < width && x+1 < width &&
          prev[(x+1)+((y+1)*width)] == '#'
        ) ++neighbors;

        // Check rules
        // - If light is on and neighbors do not total 2 or 3, turn it off
        if (prev[x+y*width] == '#' && neighbors != 2 && neighbors != 3)
          next[x+y*width] = '.';
        // - If light is off and has exactly 3 neighbors, turn it on
        else if (prev[x+y*width] == '.' && neighbors == 3)
          next[x+y*width] = '#';
      } // End for x loop
    } // End for y loop
  };

  // Helper function to print the array
  const print = arr => {
    for (let y = 0; y < width; ++y) {
      let line = "";
      for (let x = 0; x < width; ++x) {
        line += arr[x+y*width];
      }
      console.log(line);
    }
    console.log();
  };

  for (let i = 0; i < 100; ++i) step();

  const result = next.filter(char => char == '#');

  console.log(result.length);
}
else console.error("Failed to read input.txt");