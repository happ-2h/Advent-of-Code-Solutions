/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 16.1 and 16.2
 */

const input = "10010000000110000";

/**
 * Generates random data based on a modified
 * dragon curve algorithm
 *
 * @param {String} initial - initial state of the data
 * @param {Integer} n      - disk length
 *
 * @returns {String}       - new data once it's length is >= disk length
 */
const generateData = (initial, n) => {
  let a = [...initial];           // Current data
  let b = [...initial].reverse(); // Copy of a, reversed

  // Replace all instances of '0' with '1' and '1' with '0'
  for (let i = 0; i < b.length; ++i)
    b[i] = ""+(b[i]^1);

  // Result is "a", then a single '0', then "b"
  const result = a.join('') + '0' + b.join('');

  // If the result can fill the disk, return result
  // Otherwise, redo the process with the currently generated data
  return result.length >= n ? result : generateData(result, n);
};

/**
 * Creates checksum for data given
 *
 * @param {String} data - data to create a checksum for
 * @param {Integer} n   - disk length
 *
 * @returns {String}    - first checksum with an odd length
 */
const createChecksum = (data, n) => {
  let cutData = [...data].slice(0,n); // Only work with data of size n
  let checksum = "";

  // If the two characters match ("00" or "11"), next checksum is '1'
  // Otherwise ("01" or "10"), next checksum is '0'
  for (let i = 0; i < cutData.length; i += 2)
    checksum += cutData[i] == cutData[i+1] ? '1' : '0';

  // If checksum is odd, return it, else repeat the process
  return checksum.length&1 ? checksum : createChecksum(checksum, n);
};

// Part 1
console.log(createChecksum(generateData(input,272), 272));
// Part 2
console.log(createChecksum(generateData(input,35651584), 35651584));