/**
 * Author: happ_2h https://github.com/happ-2h
 *
 * Solution for Advent of Code 2016 Day 4.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let sum = 0;

  for (const str of input) {
    let [_, name, secID, checksum] = str.match(/([a-z\-]+)\-(\d+)\[(\w+)\]/);

    const freqs = []; // Frequency of each character

    // Count number of same characters
    name = name.split('-').join('').split('').sort();
    for (let i = 0; i < name.length; ++i) {
      let nLetters = 1;

      if (name[i] == name[i+1]) {
        // Continue count while consecutive characters
        for (let j = i; j < name.length + 1; ++j) {
          if (name[j] == name[j+1]) ++nLetters;
          else {
            // Skip counting same character
            i += nLetters-1;
            break;
          }
        }
      }

      freqs.push(""+nLetters+name[i]);
    }

    // Sort by number of chars and only keep top 5
    const sorted = freqs.sort((a, b) => +b[0] - +a[0]).slice(0, 5);

    // Remove numbers and add up sector IDs of valid rooms
    if (sorted.join('').replace(/[0-9]/g, '') == checksum) sum += +secID;
  }

  console.log(sum);
}
else console.error("Failed to read input.txt");