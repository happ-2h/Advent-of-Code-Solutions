/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 10.1
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const arr = [...Array(256).keys()]; // Array of 0..255
  let currPos  = 0;
  let skipSize = 0;
  const lengths = input.split(",");   // Lengths from input

  const reverse = (len) => {
    let lptr = currPos;         // Left pointer of array for swapping
    let rptr = currPos + len-1; // Right pointer of array for swapping

    // Only need length/2 iterations and pointers aren't equal (no effect if so)
    for (let i = 0; i < len>>1 && lptr != rptr; ++i) {
      // Swap
      [arr[rptr%arr.length], arr[lptr%arr.length]] = [arr[lptr%arr.length], arr[rptr%arr.length]];
      --rptr; // Right pointer goes backwards
      ++lptr; // Left pointer goes forwards
    }
  };

  for (const l of lengths) {
    reverse(+l);
    currPos += +l + skipSize++;
  }

  console.log(arr[0] * arr[1]);
}
else console.error("Failed to read input.txt");