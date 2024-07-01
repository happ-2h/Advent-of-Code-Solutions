/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2017 Day 14.1
 */

const input = "wenycdww";

/**
 * @brief Performs knot hash algorithm on a given string
 *
 * @param {String} str - string to perform knot hash on
 *
 * @returns {String}   - resulting knot hash
 */
const knotHash = str => {
  let sparseHash = [...Array(256).keys()];
  let denseHash = [];
  let currPos  = 0;
  let skipSize = 0;
  const lengths = []; // Lengths from input

  // Convert characters to their ASCII code
  for (const c of str) lengths.push(""+c.charCodeAt());
  lengths.push("17", "31", "73", "47", "23");

  const reverse = (len) => {
    let lptr = currPos;         // Left pointer of array for swapping
    let rptr = currPos + len-1; // Right pointer of array for swapping

    for (let i = 0; i < len>>1; ++i) {
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

  return denseHash.join('');
};

/**
 * @brief Gives the number of set bits of a 4-bit hex number
 *        given as a single character
 *
 * @param {Character} char - character to convert to its binary equivalent
 *
 * @returns {Integer}      - number of set bits after conversion
 */
const bitCount = char => {
  // Check if desired type or if not a single character
  if (
    typeof char != "string" || char.length > 1
  ) return 0;

  // If '0' - '9', convert to binary
  if (char >= '0' && char <= '9')
    return [...(+char).toString(2)]
      .filter(c => c == '1').length; // Return all '1's in array
  // If 'a' - 'f', convert to hex, then binary
  else if (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'f')
    return [...(parseInt(char, 16)).toString(2)]
      .filter(c => c == '1').length; // Return all '1's in array

  return 0; // Conversion failed
};

const disk = [];
let ttl = 0;

// Populate the disk with hashes
for (let i = 0; i < 128; ++i)
  disk.push(knotHash(`${input}-${i}`));

// Count the bits of each hash
disk.forEach(str => {
  for (const c of str) ttl += bitCount(c);
});

console.log(ttl);