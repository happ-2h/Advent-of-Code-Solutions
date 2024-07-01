/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 10.2
 */

let input = null;

try {
  input = require("fs").readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const sparseHash = [...Array(256).keys()];
  const denseHash = [];
  let currPos  = 0;
  let skipSize = 0;
  const lengths = []; // Lengths from input

  // Convert characters to ASCII code
  for (const c of input) lengths.push(""+c.charCodeAt());
  lengths.push("17", "31", "73", "47", "23");

  const reverse = (len) => {
    let lptr = currPos;         // Left pointer of array for swapping
    let rptr = currPos + len-1; // Right pointer of array for swapping

    // Only need length/2 iterations and pointers aren't equal (no effect if so)
    for (let i = 0; i < len>>1 && lptr != rptr; ++i) {
      // Swap
      [sparseHash[rptr%sparseHash.length], sparseHash[lptr%sparseHash.length]] =
        [sparseHash[lptr%sparseHash.length], sparseHash[rptr%sparseHash.length]];
      --rptr; // Right pointer goes backwards
      ++lptr; // Left pointer goes forwards
    }
  };

  // Run for 64 rounds to find sparse hash
  for (let i = 0; i < 64; ++i) {
    for (const l of lengths) {
      reverse(+l);
      currPos += +l + skipSize++;
    }
  }

  // Calculate dense hash
  while(sparseHash.length > 0) {
    let xor = 0;

    for (let i = 0; i < 16; ++i)
      xor ^= sparseHash.shift();

    denseHash.push(xor.toString(16).padStart(2, "0"));
  }

  console.log(denseHash.join(''));
}
else console.error("Failed to read input.txt");